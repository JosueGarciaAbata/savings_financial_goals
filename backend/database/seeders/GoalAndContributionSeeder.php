<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Goal;
use App\Models\Contribution;
use Illuminate\Database\Seeder;
use App\Services\RecalculatePaymentGoalsService;

class GoalAndContributionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear 10 metas
        Goal::factory(10)->create()->each(function ($goal) {
            // Crear entre 1 y 5 aportes por meta
            Contribution::factory(rand(1, 5))->create([
                'goal_id' => $goal->id,
            ])->each(function ($contribution) use ($goal) {
                // Actualizar el total_saved en la meta
                $goal->increment('total_saved', $contribution->amount);
            });
        });
        
        $goals = Goal::all();
        foreach ($goals as $goal) {
            // Recalcular sugerencias
            RecalculatePaymentGoalsService::run($goal);
        }
    }
}
