<?php

namespace App\Console\Commands;

use App\Http\Controllers\NotificationController;
use App\Models\Goal;
use App\Models\User;
use Exception;
use Illuminate\Console\Command;

class SendSavingsGoalNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:savings-goal-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enviar recordatorios de ahorro semanal a los usuarios';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        try {
            $users = User::all();

            foreach ($users as $user) {

                $goals = Goal::where('user_id', $user->id)->get();

                foreach ($goals as $goal) {

                    NotificationController::sendSavingsGoalNotification($user->id, $goal->id);
                    $this->info('Correo de recordatorio enviado a: ' . $user->email . ' para la meta: ' . $goal->name);
                }
            }
        } catch (Exception $e) {
            $this->error('Error al enviar el correo a: ' . $user->email . ' - ' . $e->getMessage());
        }
    }
}