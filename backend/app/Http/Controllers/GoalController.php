<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use App\Models\Goal;
use Illuminate\Http\JsonResponse;
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
        $goal = Goal::with(['category', 'contributions'])
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$goal) {
            return response()->json([
                'status' => 'error',
                'message' => 'Goal not found.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $goal
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

        return response()->json([
            'status' => 'success',
            'message' => 'Goal updated successfully.',
            'data' => $goal
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}