<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
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
     * Login and return JWT as Bearer Token.
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'message' => 'Login exitoso',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    /**
     * Return authenticated user.
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Logout (invalidate token).
     */
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Logout exitoso']);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'No se pudo cerrar sesión',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Refresh the JWT.
     */
    public function refresh()
    {
        return response()->json([
            'access_token' => auth()->refresh(),
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
