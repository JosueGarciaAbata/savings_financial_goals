<?php

namespace App\Mail;

use App\Models\Goal;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SavingsGoalNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $userName;
    public $goal;
    public $currentDate;
    public $recommendedWeeklySavings;

    /**
     * Crear una nueva instancia de mensaje.
     *
     * @return void
     */
    public function __construct($userName, $goal, $currentDate, $recommendedWeeklySavings)
    {
        $this->userName = $userName;
        $this->goal = $goal;
        $this->currentDate = $currentDate;
        $this->recommendedWeeklySavings = $recommendedWeeklySavings;
    }

    /**
     * Construir el mensaje.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Recordatorio de Ahorro')
            ->view('emails.savingsGoalNotification')
            ->with([
                'userName' => $this->userName,
                'goal' => $this->goal,
                'current_date' => $this->currentDate,
                'recommendedWeeklySavings' => $this->recommendedWeeklySavings,
            ]);
    }
}