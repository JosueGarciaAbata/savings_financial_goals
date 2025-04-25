<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goal;
use App\Models\GoalCategory;
use App\Models\Contribution;
use Illuminate\Http\JsonResponse;
use App\Services\RecalculatePaymentGoalsService;
use Illuminate\Support\Carbon;
use App\Http\Requests\UpdateContributionRequest;
use App\Http\Requests\StoreContributionRequest;


class ContributionController extends Controller
{
    public function index()
    {
        $contributions = Contribution::whereHas('goal', function ($q) {
            $q->where('user_id', auth()->id());
        })->with('goal')->latest()->get();

        return response()->json([
            'status' => 'success',
            'contributions' => $contributions
        ]);
    }

    public function store(StoreContributionRequest $request)
    {
        $goal = auth()->user()->goals()->findOrFail($request->goal_id);
    
        if (now()->gt(Carbon::parse($goal->deadline))) {
            return response()->json([
                'status' => 'error',
                'message' => 'You cannot contribute after the deadline.'
            ], 422);
        }
        
        $contribution = $goal->contributions()->create([
            'contribution_date' => $request->contribution_date,
            'amount' => $request->amount,
        ]);
    
        $goal->total_saved += $request->amount;
    
        if ($goal->total_saved >= $goal->target_amount) {
            $goal->status = 'completed';
        }
    
        $goal->save();
        RecalculatePaymentGoalsService::run($goal);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Contribution created successfully.',
            'data' => $contribution
        ], 201);
    }    

    public function byGoal($goalId)
    {
        $goal = auth()->user()->goals()->findOrFail($goalId);

        $contributions = $goal->contributions()->orderByDesc('contribution_date')->get();

        return response()->json([
            'status' => 'success',
            'contributions' => $contributions
        ]);
    }

    public function update(UpdateContributionRequest $request, $id): JsonResponse
    {
        $contribution = Contribution::with('goal')->findOrFail($id);
       
        if ($contribution->goal->user_id !== auth()->id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access.'
            ], 403);
        }

        $goal = $contribution->goal;

        if (now()->gt(Carbon::parse($goal->deadline))) {
            return response()->json([
                'status' => 'error',
                'message' => 'You cannot modify a contribution after the goal\'s deadline.'
            ], 422);
        }
        
        $adjustedTotal = $goal->total_saved - $contribution->amount + $request->amount;
        $remaining = $goal->target_amount - ($goal->total_saved - $contribution->amount);

        if ($request->amount > $remaining) {
            return response()->json([
                'status' => 'error',
                'message' => "You cannot contribute more than the remaining amount (\$$remaining)."
            ], 422);
        }
        
        $contribution->update([
            'contribution_date' => $request->contribution_date,
            'amount' => $request->amount,
        ]);
        
        $goal->total_saved = $adjustedTotal;
        if ($goal->total_saved >= $goal->target_amount) {
            $goal->status = 'completed';
        }
        $goal->save();
        RecalculatePaymentGoalsService::run($goal);

        return response()->json([
            'status' => 'success',
            'message' => 'Contribution updated successfully.',
            'data' => $contribution
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $contribution = Contribution::with('goal')->findOrFail($id);
        
        if ($contribution->goal->user_id !== auth()->id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access.'
            ], 403);
        }
    
        $goal = $contribution->goal;
        $goal->total_saved -= $contribution->amount;
        if ($goal->total_saved < $goal->target_amount) {
            $goal->status = 'active';
        }
    
        $goal->save();
        $contribution->delete();
        RecalculatePaymentGoalsService::run($goal);
    
        return response()->json([
            'status' => 'success',
            'message' => 'Contribution deleted successfully.'
        ]);
    }    

}