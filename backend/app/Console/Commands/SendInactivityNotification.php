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
            // Obtener el usuario con ID 1
            $user = User::find(1); // Obtener solo el usuario con ID 1

            if ($user) {
                // Obtener todas las metas del usuario con ID 1
                $goals = Goal::where('user_id', $user->id)->get();

                // Iterar sobre cada meta del usuario
                foreach ($goals as $goal) {
                    // Enviar la notificación de inactividad si es necesario
                    NotificationController::sendInactivityGoalNotification($user->id, $goal->id);

                    // Mostrar en la consola que el correo de alerta de inactividad ha sido enviado
                    $this->info('Alerta de inactividad enviada a: ' . $user->email . ' para la meta: ' . $goal->name);
                }
            } else {
                // Si el usuario no existe, mostrar un mensaje de error en la consola
                $this->info('No se encontró el usuario con ID 1.');
            }
        } catch (Exception $e) {
            // Capturar y mostrar cualquier error que ocurra durante la ejecución
            $this->error('Error al enviar la alerta de inactividad: ' . $e->getMessage());
        }
        // try {

        //     $users = User::all();


        //     foreach ($users as $user) {

        //         $goals = Goal::where('user_id', $user->id)->get();


        //         foreach ($goals as $goal) {

        //             NotificationController::sendInactivityGoalNotification($user->id, $goal->id);


        //             $this->info('Alerta de inactividad enviada a: ' . $user->email . ' para la meta: ' . $goal->name);
        //         }
        //     }
        // } catch (Exception $e) {

        //     $this->error('Error al enviar el correo para la meta: ' . $goal->name . ' - ' . $e->getMessage());
        // }
    }

}