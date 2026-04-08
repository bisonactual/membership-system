<?php

namespace BB\Services;

use Illuminate\Support\Facades\Log;

class GoCardlessHelper
{
    /** @var \GoCardlessPro\Client */
    private $client;

    public function __construct()
    {
        $this->setup();
    }

    public function setup()
    {
        $this->client = new \GoCardlessPro\Client([
            'access_token' => env('GOCARDLESS_ACCESS_TOKEN', ''),
            'environment' => (env('NEW_GOCARDLESS_ENV', 'LIVE') == 'LIVE') ? \GoCardlessPro\Environment::LIVE : \GoCardlessPro\Environment::SANDBOX,
        ]);
    }

    public function getPayment($paymentId)
    {
        return $this->client->payments()->get($paymentId);
    }

    public function cancelPayment($paymentId)
    {
        return $this->client->payments()->cancel($paymentId);
    }

    public function newPreAuthUrl($user, $paymentDetails)
    {
        $redirectFlow = $this->client->redirectFlows()->create([
            "params" => $paymentDetails
        ]);

        $user->gocardless_setup_id = $redirectFlow->id;
        $user->save();

        return $redirectFlow->redirect_url;
    }

    public function confirmResource($user, $confirm_params)
    {
        return $this->client->redirectFlows()->complete(
            $user->gocardless_setup_id,
            ["params" => ["session_token" => 'user-token-' . $user->id]]
        );
    }

    public function createSubscription($mandate, $amount, $dayOfMonth, $subscriptionNumber)
    {
        return $this->client->subscriptions()->create([
            "params" => [
                "amount"        => $amount,
                "currency"      => "GBP",
                "interval_unit" => "monthly",
                "day_of_month"  => $dayOfMonth,
                "links"         => ["mandate" => $mandate],
                "metadata"      => ["subscription_number" => $subscriptionNumber],
            ],
        ]);
    }

    public function cancelSubscription($id)
    {
        return $this->client->subscriptions()->cancel($id);
    }

    public function newBill($mandateId, $amount, $name = null, $description = null)
    {
        try {
            return $this->client->payments()->create([
                "params" => [
                    "amount"   => $amount,
                    "currency" => "GBP",
                    "links"    => ["mandate" => $mandateId],
                    "metadata" => ["description" => $name],
                ],
            ]);
        } catch (\Exception $e) {
            Log::error($e);

            if (app()->bound('sentry')) {
                app('sentry')->captureException($e);
            }

            throw $e;
        }
    }

    public function cancelPreAuth($preauthId)
    {
        if (empty($preauthId)) {
            return true;
        }
        try {
            $mandate = $this->client->mandates()->cancel($preauthId);

            if ($mandate->status == 'cancelled') {
                return true;
            }

            Log::error('Canceling pre auth failed: ' . json_encode($mandate));
        } catch (\Exception $e) {
            Log::error($e);
        }
        return false;
    }

    public function getNameFromReason($reason)
    {
        return match($reason) {
            'subscription'  => 'Monthly subscription',
            'balance'       => 'Balance top up',
            'equipment-fee' => 'Equipment access fee',
            'induction'     => 'Equipment induction',
            'door-key'      => 'Door key',
            default         => $reason,
        };
    }
}
