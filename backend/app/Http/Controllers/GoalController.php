<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use App\Models\Goal;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use App\Services\RecalculatePaymentGoalsService;

use PHPOpenSourceSaver\JWTAuth\JWTGuard;

class GoalController extends Controller
{
    /**
     * Display a listing of the authenticated user's goals.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $goals = Goal::where('user_id', auth()->id())
                    ->with('category') // Opcional: si quieres mostrar la categoría
                    ->latest('created_at')
                    ->get();
        $goals->each->checkAndExpire();
        return response()->json([
            'status' => 'success',
            'data' => $goals
        ]);
    }

    /**
     * Store a newly created goal in storage.
     *
     * @param  \App\Http\Requests\StoreGoalRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreGoalRequest $request)
    {
        $goal = Goal::create([
            'user_id' => auth()->id(),
            'category_id' => $request->category_id,
            'name' => $request->name,
            'target_amount' => $request->target_amount,
            'deadline' => $request->deadline,
            'status' => 'active', // se asigna por defecto
        ]);
        
        RecalculatePaymentGoalsService::run($goal);
        return response()->json([
            'status' => 'success',
            'message' => 'Goal created successfully.',
            'data' => $goal
        ], 201);
    }

    /**
     * Display a specific goal with its contributions.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id): JsonResponse
    {
        
        $goal = Goal::with(['category', 'contributions', 'suggestions'])
                    ->where('id', $id)
                    ->where('user_id', auth()->id())
                    ->first();
    
        if (!$goal) {
            return response()->json([
                'status' => 'error',
                'message' => 'Goal not found.'
            ], 404);
        }
    
        $progress = $goal->getProgressData();
    
        $weekly = $goal->suggestions()
            ->where('frequency', 'weekly')
            ->latest('calculated_at')
            ->first();
    
        $monthly = $goal->suggestions()
            ->where('frequency', 'monthly')
            ->latest('calculated_at')
            ->first();

        $goal->checkAndExpire();

        return response()->json([
            'status' => 'success',
            'goal' => $goal,
            'progress' => array_merge($progress, [
                'weekly_suggestion' => optional($weekly)->value,
                'monthly_suggestion' => optional($monthly)->value,
                'risk_levels' => [
                    'weekly' => optional($weekly)->risk_level,
                    'monthly' => optional($monthly)->risk_level
                ]
            ])
        ]);
    }    
    
    
    /**
     * Update the specified goal of the authenticated user.
     *
     * @param  \App\Http\Requests\UpdateGoalRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateGoalRequest $request, $id): JsonResponse
    {
        $goal = Goal::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$goal) {
            return response()->json([
                'status' => 'error',
                'message' => 'Goal not found or unauthorized.'
            ], 404);
        }

        $goal->update($request->only([
            'category_id',
            'name',
            'target_amount',
            'deadline',
            'status'
        ]));
        RecalculatePaymentGoalsService::run($goal);
        return response()->json([
            'status' => 'success',
            'message' => 'Goal updated successfully.',
            'data' => $goal
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $goal = Goal::where('id', $id)->where('user_id', auth()->id())->first();
    
        if (!$goal) {
            return response()->json([
                'status' => 'error',
                'message' => 'Goal not found or unauthorized.'
            ], 404);
        }
        
        if ($goal->contributions()->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot delete a goal with contributions.'
            ], 422);
        }
        
        $goal->delete();
    
        return response()->json([
            'status' => 'success',
            'message' => 'Goal deleted successfully.'
        ]);
    }    
    
}
