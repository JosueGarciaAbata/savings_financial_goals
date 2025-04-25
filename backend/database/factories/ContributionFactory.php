<?php

namespace Database\Factories;

use App\Models\Goal;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contribution>
 */
class ContributionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $goal = Goal::inRandomOrder()->first();

        return [
            'goal_id' => $goal->id,
            'contribution_date' => Carbon::today()->subDays(rand(0, 60)),
            'amount' => $this->faker->randomFloat(2, 20, 300),
        ];
    }
}
