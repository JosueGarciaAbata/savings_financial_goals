<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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


Route::middleware(['jwt.cookie', 'auth:api'])->group(function () {

    Route::get('/test', function () {
        return response()->json([
            'message' => 'Ruta protegida funcionando ✅'
        ]);
    });
});