<?php

namespace BB\Services\FlashNotification;

use Illuminate\Session\Store;
use Illuminate\Support\MessageBag;

class FlashNotificationManager
{
    /** @var Store */
    private $session;

    public function __construct(Store $session)
    {
        $this->session = $session;
    }

    public function info($message, MessageBag $details = null)
    {
        return $this->message($message, $details, 'info');
    }

    public function success($message, MessageBag $details = null)
    {
        return $this->message($message, $details, 'success');
    }

    public function error($message, MessageBag $details = null)
    {
        return $this->message($message, $details, 'danger');
    }

    public function warning($message, MessageBag $details = null)
    {
        return $this->message($message, $details, 'warning');
    }

    public function message($message, MessageBag $details = null, $level = 'info')
    {
        $this->session->flash('flash_notification.message', $message);
        $this->session->flash('flash_notification.details', $details);
        $this->session->flash('flash_notification.level', $level);

        return $this;
    }

    public function hasMessage()
    {
        return $this->session->has('flash_notification.message');
    }

    public function hasErrorDetail($detail, $response = null)
    {
        $details = $this->session->get('flash_notification.details');
        if ($details && $details->has($detail)) {
            return $response ?? true;
        }
        return false;
    }

    public function hasDetails()
    {
        return !$this->getDetails()->isEmpty();
    }

    public function getDetails()
    {
        $details = $this->session->get('flash_notification.details');
        if (!($details instanceof MessageBag)) {
            return new MessageBag();
        }
        return $details;
    }

    public function getErrorDetail($detail, $responseFormat = '<span class="help-block">:message</span>')
    {
        $details = $this->session->get('flash_notification.details');
        if ($this->hasErrorDetail($detail)) {
            return $details->first($detail, $responseFormat);
        }
    }

    public function getMessage()
    {
        return $this->session->get('flash_notification.message');
    }

    public function getLevel()
    {
        return $this->session->get('flash_notification.level');
    }
}
