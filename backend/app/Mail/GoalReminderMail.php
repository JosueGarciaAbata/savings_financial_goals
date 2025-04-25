<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GoalReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $goal;

    public function __construct($goal)
    {
        $this->goal = $goal;
    }

    public function build()
    {
        return $this->subject('Recordatorio de tu meta financiera 📩')
            ->view('emails.goal_reminder');
    }
}