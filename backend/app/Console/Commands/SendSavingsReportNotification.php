<?php

namespace App\Console\Commands;

use App\Http\Controllers\NotificationController;
use App\Models\Goal;
use App\Models\User;
use Illuminate\Console\Command;

class SendSavingsReportNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-savings-report-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {


        try {
            $users = User::all();

            foreach ($users as $user) {
                $goals = Goal::where('user_id', $user->id)
                    ->where('status', 'active')
                    ->get();


                if ($goals->isNotEmpty()) {
                    NotificationController::sendSavingsReport($user, $goals);
                    $this->info('Reporte enviado a: ' . $user->email);
                }
            }
        } catch (\Exception $e) {
            $this->error('Error al generar el reporte: ' . $e->getMessage());
        }
    }
}