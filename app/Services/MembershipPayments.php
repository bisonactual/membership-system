<?php

namespace BB\Services;

use BB\Data\MembershipPriceOption;
use Carbon\Carbon;

class MembershipPayments
{
    public static function lastUserPaymentDate($userId)
    {
        /** @var \BB\Repo\SubscriptionChargeRepository */
        $subscriptionChargeRepository = \App::make('BB\Repo\SubscriptionChargeRepository');
        $latestCharge = $subscriptionChargeRepository->getMembersLatestPaidCharge($userId);

        if ($latestCharge) {
            return $latestCharge->charge_date;
        }
        return false;
    }

    public static function lastUserPaymentExpires($userId)
    {
        $date = self::lastUserPaymentDate($userId);
        if ($date) {
            return $date->setTime(0, 0, 0)->addMonth();
        }
        return false;
    }

    public static function getSubGracePeriodDate($paymentMethod, Carbon $refDate = null)
    {
        if (is_null($refDate)) {
            $refDate = Carbon::now();
        }

        $refDate->setTime(0, 0, 0);

        $standingOrderCutoff      = $refDate->copy()->subMonths(6);
        $goCardlessCutoff         = $refDate->copy()->subDays(14);
        $goCardlessVariableCutoff = $refDate->copy()->subDays(10);
        $otherCutoff              = $refDate->copy()->subDays(7);

        if ($paymentMethod == 'gocardless') {
            return $goCardlessCutoff;
        } elseif ($paymentMethod == 'gocardless-variable') {
            return $goCardlessVariableCutoff;
        } elseif ($paymentMethod == 'standing-order') {
            return $standingOrderCutoff;
        } else {
            return $otherCutoff;
        }
    }

    public static function getMinimumPrice()
    {
        return config('membership.prices.minimum');
    }

    public static function getRecommendedPrice()
    {
        return config('membership.prices.recommended');
    }

    public static function getPriceOptions()
    {
        $options = config('membership.prices.options');
        $priceOptions = [];

        foreach ($options as $key => $option) {
            $priceOptions[] = new MembershipPriceOption(
                $option['title'],
                $option['description'],
                $option['value_in_pence']
            );
        }

        return $priceOptions;
    }

    public static function formatPrice(int $pence)
    {
        return "£" . number_format($pence / 100, 2);
    }
}
