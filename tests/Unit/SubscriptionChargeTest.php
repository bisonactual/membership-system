<?php

namespace Tests\Unit;

use BB\Entities\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

Class SubscriptionChargeTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function it_works()
    {
        \Illuminate\Support\Facades\Event::fake();

        /** @var \BB\Repo\SubscriptionChargeRepository $repo */
        $repo = $this->app->make(\BB\Repo\SubscriptionChargeRepository::class);

        $user = factory('BB\Entities\User')->create();
        $date = Carbon::now();
        $amount = 10;
        $charge = $repo->createCharge($user->id, $date, $amount);

        //Mark a charge as being paid, this should fire an event
        $repo->markChargeAsPaid($charge->id);

        \Illuminate\Support\Facades\Event::assertDispatched(\BB\Events\SubscriptionChargePaid::class);
    }


}