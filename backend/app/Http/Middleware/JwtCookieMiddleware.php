<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class JwtCookieMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->cookie('jwt_token');

        if (!$token) {
            return response()->json(['error' => 'Token ausente'], 401);
        }

        try {
            $user = JWTAuth::setToken($token)->authenticate();

            if (!$user) {
                return response()->json(['error' => 'Usuario no autenticado'], 401);
            }

            auth()->setUser($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }

        return $next($request);
    }
}