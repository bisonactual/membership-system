<?php

namespace BB\Providers;

use BB\Events\Inductions\InductionCompletedEvent;
use BB\Events\Inductions\InductionMarkedAsTrainerEvent;
use BB\Events\Inductions\InductionRequestedEvent;
use BB\Listeners\DiscourseSyncSubscriber;
use BB\Listeners\EmailMemberAboutDeclinedPhoto;
use BB\Listeners\EmailMemberAboutTrustedStatus;
use BB\Listeners\ExtendMembership;
use BB\Listeners\Notifications\Inductions\InductionCompletedListener;
use BB\Listeners\Notifications\Inductions\InductionMarkedAsTrainerListener;
use BB\Listeners\Notifications\Inductions\InductionRequestedListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
	/**
	 * The event handler mappings for the application.
	 *
	 * @var array
	 */
	protected $listen = [
		'payment.create' => [
			'BB\Listeners\PaymentEventHandler@onCreate',
		],
		'payment.delete' => [
			'BB\Listeners\PaymentEventHandler@onDelete',
		],
		'payment.cancelled' => [
			'BB\Listeners\PaymentEventHandler@onCancel',
		],
		'payment.paid' => [
			'BB\Listeners\PaymentEventHandler@onPaid',
		],
		'BB\Events\SubscriptionChargePaid' => [
			ExtendMembership::class
		],
		'sub-charge.processing' => [
			'BB\Listeners\SubChargeEventHandler@onProcessing',
		],
		'sub-charge.payment-failed' => [
			'BB\Listeners\SubChargeEventHandler@onPaymentFailure',
		],
		'BB\Events\MemberPhotoWasDeclined' => [
			EmailMemberAboutDeclinedPhoto::class,
		],
		'BB\Events\MemberGivenTrustedStatus' => [
			EmailMemberAboutTrustedStatus::class
		],
		'BB\Events\NewMemberNotification' => [],
		InductionRequestedEvent::class => [
			InductionRequestedListener::class
		],
		InductionCompletedEvent::class => [
			InductionCompletedListener::class
		],
		InductionMarkedAsTrainerEvent::class => [
			InductionMarkedAsTrainerListener::class
		]
	];

	/**
	 * The subscriber classes to register.
	 *
	 * @var array
	 */
	protected $subscribe = [
		DiscourseSyncSubscriber::class,
	];

	/**
	 * Register any other events for your application.
	 *
	 * @param  \Illuminate\Contracts\Events\Dispatcher  $events
	 * @return void
	 */
	public function boot()
	{
		parent::boot();
	}
}
