<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;

class SendSavingsReportNotification extends Mailable
{
    use SerializesModels;

    public $user;
    public $pdf;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, $pdf)
    {
        $this->user = $user;
        $this->pdf = $pdf;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Reporte de Ahorro')
            ->view('emails.goalProgressNotificationMessage')
            ->attachData($this->pdf->output(), 'reporte_de_ahorro.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}