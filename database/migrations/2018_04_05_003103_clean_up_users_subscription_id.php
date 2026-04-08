<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CleanUpUsersSubscriptionId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \BB\Models\User::where('payment_method', 'gocardless-variable')->get()->each(function (\BB\Models\User $user) {
            if ($user->subscription_id == $user->mandate_id) {
                $user->subscription_id = '';
                $user->save();
            }
        });
        \BB\Models\User::where('secondary_payment_method', 'gocardless-variable')->get()->each(function (\BB\Models\User $user) {
            if ($user->subscription_id == $user->mandate_id) {
                $user->subscription_id = '';
                $user->save();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
