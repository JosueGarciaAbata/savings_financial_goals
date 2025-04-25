<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Goal>
 */
class GoalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = Carbon::today();
        $endDate = Carbon::today()->addMonths(rand(2, 12)); // metas de 2 a 12 meses

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'category_id' => Category::inRandomOrder()->first()->id,
            'name' => $this->faker->sentence(3),
            'target_amount' => $this->faker->randomFloat(2, 500, 5000),
            'total_saved' => 0, // empieza en 0, luego se actualiza con aportes
            'deadline' => $endDate,
            'status' => 'active',
            'created_at' => $startDate,
            'updated_at' => $startDate,
        ];
    }
}