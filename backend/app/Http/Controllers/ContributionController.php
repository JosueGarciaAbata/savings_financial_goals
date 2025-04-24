<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goal;
use App\Models\GoalCategory;
use App\Models\Contribution;
use Illuminate\Http\JsonResponse;
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

        $contribution = $goal->contributions()->create([
            'contribution_date' => $request->contribution_date,
            'amount' => $request->amount,
        ]);

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

}
