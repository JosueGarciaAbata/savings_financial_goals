<?php

namespace Database\Seeders;

use App\Models\Goal;
use App\Models\User;
use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            GoalAndContributionSeeder::class,
        ]);
        $user = User::first();
        $category = Category::first();

        $goal = Goal::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'name' => 'Meta ejemplo',
            'target_amount' => 500.00,
            'deadline' => now()->addMonths(3)->toDateString(),
            'status' => 'active',
        ]);
        \App\Services\RecalculatePaymentGoalsService::run($goal);
    }

}