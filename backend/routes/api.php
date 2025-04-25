<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContributionController;

use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


Route::prefix('auth')->group(function () {
    // Públicas
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');

    // Protegidas con jwt.cookie + auth:api
    Route::middleware(['jwt.cookie'])->group(function () {
        Route::post('/me', [AuthController::class, 'me'])->name('me');
        Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    });
});


Route::middleware(['jwt.cookie'])->group(function () {

    // Poner aqui las rutas que se van a proteger 

});

Route::middleware('auth:api')->group(function () {
    Route::get('/goals', [GoalController::class, 'index']);
    Route::post('/goals', [GoalController::class, 'store']);
    Route::get('/goals/{goal}', [GoalController::class, 'show']);
    Route::put('/goals/{goal}', [GoalController::class, 'update']);
    Route::delete('/goals/{id}', [GoalController::class, 'destroy']);
    //Route::delete('/goals/{goal}', [GoalController::class, 'destroy']);

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