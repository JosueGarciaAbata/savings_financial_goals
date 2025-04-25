<?php

namespace App\Services;

use App\Models\Goal;
use App\Models\Suggestion;
use Illuminate\Support\Carbon;

class RecalculatePaymentGoalsService
{
    public static function run(Goal $goal): void
    {
        $totalSaved = $goal->total_saved;
        $target = $goal->target_amount;
        $remaining = max($target - $totalSaved, 0);

        $today = Carbon::today();
        $deadline = Carbon::parse($goal->deadline);
        $weeksLeft = max($today->diffInWeeks($deadline, false), 1);
        $monthsLeft = max($today->diffInMonths($deadline, false), 1);

        $weekly = round($remaining / $weeksLeft, 2);
        $monthly = round($remaining / $monthsLeft, 2);
        echo "Weekly: $weekly, Monthly: $monthly\n";
        $originalWeeks = max(Carbon::parse($goal->created_at)->diffInWeeks($deadline), 1);
        $originalWeekly = round($target / $originalWeeks, 2);

        $risk = self::calculateRiskLevel($weekly, $originalWeekly);

        Suggestion::create([
            'goal_id' => $goal->id,
            'value' => $weekly,
            'frequency' => 'weekly',
            'risk_level' => $risk,
            'calculated_at' => now()
        ]);
        
        Suggestion::create([
            'goal_id' => $goal->id,
            'value' => $monthly,
            'frequency' => 'monthly',
            'risk_level' => $risk,
            'calculated_at' => now()
        ]);
    }

    private static function calculateRiskLevel(float $weekly, float $original): string
    {
        if ($weekly <= $original * 1.2) return 'low';
        if ($weekly <= $original * 2.0) return 'medium';
        return 'high';
    }
}
