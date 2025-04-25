<?php

namespace App\Console\Commands;

use App\Http\Controllers\NotificationController;
use App\Models\Goal;
use App\Models\User;
use Exception;
use Illuminate\Console\Command;

class SendInactivityNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-inactivity-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generar una alerta de inactividad, si ha pasado mas de una semana desde el ultimo aporte en una meta
                             de ahorro del usuario';

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

                    NotificationController::sendInactivityGoalNotification($user->id, $goal->id);


                    $this->info('Alerta de inactividad enviada a: ' . $user->email . ' para la meta: ' . $goal->name);
                }
            }
        } catch (Exception $e) {

            $this->error('Error al enviar el correo para la meta: ' . $goal->name . ' - ' . $e->getMessage());
        }
    }

}