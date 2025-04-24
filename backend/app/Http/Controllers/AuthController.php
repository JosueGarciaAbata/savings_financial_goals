<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
class AuthController extends Controller
{
    /**
     * Register a User.
     */
    public function register()
    {
        $validator = Validator::make(request()->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'gender' => 'nullable|string|in:male,female,other',
            'birth_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = new User();
        $user->first_name = request('first_name');
        $user->last_name = request('last_name');
        $user->email = request('email');
        $user->password = bcrypt(request('password'));
        $user->gender = request('gender');
        $user->birth_date = request('birth_date');

        if (request()->hasFile('profile_picture')) {
            $path = request()->file('profile_picture')->store('profiles', 'public');
            $user->profile_picture = 'storage/' . $path;
        } else {
            $user->profile_picture = 'images/default_profile.jpg';
        }

        $user->save();

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'user' => $user
        ], 201);
    }

    /**
     * Login and set JWT as cookie.
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['message' => 'Login exitoso'])
            ->cookie(
                'jwt_token',
                $token,
                auth()->factory()->getTTL(), // duración en minutos
                null,
                null,
                false,
                false // HttpOnly activado
            );
    }

    /**
     * Return authenticated user.
     */
    public function me()
    {

        return response()->json(auth()->user());
    }

    /**
     * Logout and clear cookie.
     */
    public function logout()
    {
        $token = request()->cookie('jwt_token');

        if (!$token) {
            return response()->json(['error' => 'No hay token para cerrar sesión'], 401);
        }

        try {
            JWTAuth::setToken($token)->invalidate(); // 👈 invalida manualmente el token
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo cerrar sesión', 'detalle' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Logout exitoso'])
            ->withoutCookie('jwt_token'); // ✅ elimina la cookie del navegador
    }

    /**
     * Refresh the JWT.
     */
    public function refresh()
    {
        $newToken = auth()->refresh();

        return response()->json(['message' => 'Token renovado'])
            ->cookie(
                'jwt_token',
                $newToken,
                auth()->factory()->getTTL(),
                null,
                null,
                false,
                true
            );
    }
}