<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\ReportController;
use App\Mail\GoalReminderMail;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Mail;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
    });
});


Route::get('/test_email', function () {
    $goal = [
        'name' => 'Meta de prueba: Comprar laptop',
        'deadline' => now()->addDays(30)->format('Y-m-d'),
        'saved' => 150,
        'target' => 500
    ];

    Mail::to('bjeferssonvinicio2005@gmail.com')->send(new GoalReminderMail($goal));

    return response()->json(['message' => 'Correo enviado a tu cuenta ✅']);
});


Route::middleware('auth:api')->group(function () {
    Route::get('/goals', [GoalController::class, 'index']);
    Route::post('/goals', [GoalController::class, 'store']);
    Route::get('/goals/{goal}', [GoalController::class, 'show']);
    Route::put('/goals/{goal}', [GoalController::class, 'update']);
    Route::delete('/goals/{id}', [GoalController::class, 'destroy']);
    //Route::delete('/goals/{goal}', [GoalController::class, 'destroy']);

});

Route::middleware('auth:api')->prefix('reports')->group(function () {
    Route::get("/generalReport", [ReportController::class, "generateGeneralReport"])->name("generalReport");
    Route::get("/category", [ReportController::class, "generateCategoryReport"]);
    Route::get("/state", [ReportController::class, "generateGoalStatusReport"]);
});


Route::middleware('auth:api')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
});

Route::middleware('auth:api')->group(function () {
    Route::get('/contributions', [ContributionController::class, 'index']); // todos los aportes del usuario
    Route::post('/contributions', [ContributionController::class, 'store']); // crear aporte
    Route::put('/contributions/{id}', [ContributionController::class, 'update']);
    Route::get('/goals/{goal}/contributions', [ContributionController::class, 'byGoal']);
    Route::delete('/contributions/{id}', [ContributionController::class, 'destroy']);
});


Route::get('/fake-login/{userId}', function ($userId) {
    $user = User::findOrFail($userId);
    $token = JWTAuth::fromUser($user);

    return response()->json([
        'access_token' => $token,
        'user' => $user
    ]);
});


Route::middleware('auth:api')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
});

Route::middleware('auth:api')->group(function () {
    Route::get('/contributions', [ContributionController::class, 'index']); // todos los aportes del usuario
    Route::post('/contributions', [ContributionController::class, 'store']); // crear aporte
    Route::get('/goals/{goal}/contributions', [ContributionController::class, 'byGoal']);
});