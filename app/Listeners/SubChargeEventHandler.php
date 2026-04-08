<?php

namespace BB\Listeners;

use BB\Services\MembershipPayments;
use BB\Repo\UserRepository;
use Carbon\Carbon;

class SubChargeEventHandler
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function onPaid($chargeId, $userId, Carbon $paymentDate, $amount)
    {
        $user = $this->userRepository->getById($userId);
        $user->extendMembership(null, $paymentDate->addMonth());
    }

    public function onProcessing($chargeId, $userId, Carbon $paymentDate, $amount)
    {
        $user = $this->userRepository->getById($userId);
        $user->extendMembership(null, $paymentDate->addMonth());
    }

    public function onPaymentFailure($chargeId, $userId, Carbon $paymentDate, $amount)
    {
        $user = $this->userRepository->getById($userId);

        if ($this->hasOtherPaymentsForCharge($chargeId)) {
            return;
        }

        if ($user->status === "active") {
            $user->setPaymentWarning();
        }
    }

    private function hasOtherPaymentsForCharge($chargeId)
    {
        $paymentRepository = app('BB\Repo\PaymentRepository');
        return $paymentRepository->getPaymentsByReference($chargeId)
            ->whereIn('status', ['paid', 'pending', 'pending_submission', 'processing'])
            ->count() > 0;
    }
}
