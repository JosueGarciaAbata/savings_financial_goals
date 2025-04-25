<?php

namespace App\Services;


use App\Models\Goal;

class CalculateProgressGoal
{
    /**
     * Create a new class instance.
     */
    public static function calculateProgressGoal($id)
    {

        $goal = Goal::find($id);

        $progress = $goal->total_saved / $goal->target_amount * 100;
        $progress = round($progress, 0);

        return $progress;

    }


}