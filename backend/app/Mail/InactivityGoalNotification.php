<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InactivityGoalNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $userName;
    public $goalName;
    public $lastContributionDate;
    public $currentDate;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($userName, $goalName, $lastContributionDate, $currentDate)
    {
        $this->userName = $userName;
        $this->goalName = $goalName;
        $this->lastContributionDate = $lastContributionDate;
        $this->currentDate = $currentDate;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Alerta de Inactividad - Aporte Semanal')
            ->view('emails.inactivityGoalNotification')
            ->with([
                'userName' => $this->userName,
                'goalName' => $this->goalName,
                'lastContributionDate' => $this->lastContributionDate,
                'currentDate' => $this->currentDate
            ]);
    }
}