<?php

namespace App\Http\Controllers;

use App\Mail\InactivityGoalNotification;
use App\Mail\SavingsGoalNotification;
use App\Models\Goal;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
class NotificationController extends Controller
{
    public static function sendSavingsGoalNotification($userId, $goalId)
    {
        $user = User::find($userId);
        $goal = Goal::find($goalId);

        if ($user && $goal) {

            $lastContribution = $goal->contributions()->latest('contribution_date')->first();

            if ($lastContribution) {
                $lastContributionDate = Carbon::parse($lastContribution->contribution_date);
                $currentDate = Carbon::now();

                if ($lastContributionDate->diffInWeeks($currentDate) >= 1) {

                    $userName = $user->full_name;
                    $currentDateFormatted = $currentDate->format('d/m/Y');


                    $remainingAmount = $goal->target_amount - $goal->total_saved;
                    $weeksRemaining = round(Carbon::now()->diffInWeeks(Carbon::parse($goal->deadline), false));

                    $recommendedWeeklySavings = $weeksRemaining > 0 ? round($remainingAmount / $weeksRemaining, 2) : 0;

                    Mail::to($user->email)->send(new SavingsGoalNotification($userName, $goal, $currentDateFormatted, $recommendedWeeklySavings));
                }
            }
        }
    }

    public static function sendInactivityGoalNotification($userId, $goalId)
    {

        $user = User::find($userId);
        $goal = Goal::find($goalId);

        if ($user && $goal) {

            $lastContribution = $goal->contributions()->latest('contribution_date')->first();

            if ($lastContribution) {

                $lastContributionDate = Carbon::parse($lastContribution->contribution_date);
                $currentDate = Carbon::now();


                if ($lastContributionDate->diffInWeeks($currentDate) >= 1) {

                    $userName = $user->full_name;
                    $goalName = $goal->name;
                    $lastContributionDateFormatted = $lastContributionDate->format('d/m/Y');
                    $currentDateFormatted = $currentDate->format('d/m/Y');


                    Mail::to($user->email)->send(new InactivityGoalNotification(
                        $userName,
                        $goalName,
                        $lastContributionDateFormatted,
                        $currentDateFormatted
                    ));


                }
            }
        }
    }




}