<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Goal;

class RecalculateGoalSuggestions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:recalculate-goal-suggestions';

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
        $goals = Goal::where('status', 'active')->get();
    
        foreach ($goals as $goal) {
            \App\Services\RecalculatePaymentGoalsService::run($goal);
        }
    
        $this->info('Goal suggestions recalculated successfully.');
    }    
}
