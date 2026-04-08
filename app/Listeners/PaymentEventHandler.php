<?php namespace BB\Listeners;

use BB\Models\Payment;
use BB\Models\User;
use BB\Exceptions\PaymentException;
use BB\Repo\PaymentRepository;
use BB\Repo\SubscriptionChargeRepository;
use Illuminate\Support\Facades\Log;

class PaymentEventHandler
{
    /**
     * @var PaymentRepository
     */
    private $paymentRepository;
    
    /**
     * @var SubscriptionChargeRepository
     */
    private $subscriptionChargeRepository;

    public function __construct(PaymentRepository $paymentRepository, SubscriptionChargeRepository $subscriptionChargeRepository)
    {
        $this->paymentRepository = $paymentRepository;
        $this->subscriptionChargeRepository = $subscriptionChargeRepository;
    }

    public function onCreate($userId, $reason, $ref, $paymentId, $status)
    {
        if ($reason == 'balance') {
            $this->updateBalance($userId);
        } elseif ($reason == 'subscription') {
            $this->updateSubPayment($paymentId, $userId, $status);
        }
    }

    public function onDelete($userId, $source, $reason, $paymentId)
    {
        if ($reason == 'balance') {
            $this->updateBalance($userId);
        }
    }

    public function onCancel($paymentId, $userId, $reason, $ref, $status)
    {
        if ($reason == 'subscription') {
            if (empty($ref)) {
                Log::warning('Subscription payment failure, no sub charge id. Payment ID: ' . $paymentId);
                return;
            }
            $this->subscriptionChargeRepository->paymentFailed($ref);
        }
    }

    public function onPaid($userId, $paymentId, $reason, $reference, $paymentDate)
    {
        if (($reason == 'subscription') && $reference) {
            $this->subscriptionChargeRepository->markChargeAsPaid($reference, $paymentDate);
        }
    }

    private function updateBalance($userId)
    {
        $memberCreditService = \App::make('\BB\Services\Credit');
        $memberCreditService->setUserId($userId);
        $memberCreditService->recalculate();
    }

    private function updateSubPayment($paymentId, $userId, $status)
    {
        /** @var Payment */
        $payment   = $this->paymentRepository->getById($paymentId);
        $subCharge = $this->subscriptionChargeRepository->findCharge($userId);

        if ( ! $subCharge) {
            Log::warning('Subscription payment without a sub charge. Payment ID:' . $paymentId);
            return;
        }

        if (empty($payment->reference)) {
            $payment->reference = strval($subCharge->id);
            $payment->save();
        } else if ($payment->reference != $subCharge->id) {
            throw new PaymentException('Attempting to update sub charge (' . $subCharge->id . ') but payment (' . $payment->id . ') doesn\'t match.');
        }

        if ($status == 'paid') {
            $this->subscriptionChargeRepository->markChargeAsPaid($subCharge->id);
        } else if ($status == 'pending') {
            $this->subscriptionChargeRepository->markChargeAsProcessing($subCharge->id);
        }

        if ($payment->amount != $subCharge->amount) {
            $this->subscriptionChargeRepository->updateAmount($subCharge->id, intval($payment->amount));
        }
    }
}
