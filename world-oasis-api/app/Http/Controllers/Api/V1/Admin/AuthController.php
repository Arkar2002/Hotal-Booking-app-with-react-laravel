<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminLoginRequest;
use App\Http\Requests\Admin\AdminRegisterRequest;
use App\Http\Resources\Admin\AdminResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(AdminLoginRequest $request)
    {
        $credential = $request->only('email', 'password');

        if (Auth::guard('guest')->attempt($credential)) {
            return response()->json(['message' => 'You are unauthorized'], 403);
        }

        if (Auth::guard('admin')->attempt($credential)) {

            /** @var  Auth::guard('admin')->user() $user */
            $user  = Auth::guard('admin')->user();

            // delete all token
            $user->tokens()->delete();

            // create token depends on roles
            if ($user->role === 'CAO') {
                $user->token = $user->createToken('CAO')->plainTextToken;
            } else {
                $user->token = $user->createToken('admin', ['booking:CRUD,cabin:CRU'])->plainTextToken;
            }

            // return data
            return new AdminResource($user);
        } else {
            // return data if fails
            return response()->json([
                "data" => [
                    "status" => "fail",
                    "message" => 'Provided email or password is incorrect',
                ]
            ], 403);
        }
    }

    public function register(AdminRegisterRequest $request)
    {
        $user = User::create($request->all());
        $user->token = $user->createToken('admin', ['booking:CRUD,cabin:CRU'])->plainTextToken;
        return new AdminResource($user);
    }

    public function updateUser(Request $request)
    {
        $request->validate(
            [
                "email" => "required|email|exists:users,email",
                'name' => 'required',
                "image" => "file|mimes:png,jpg,jpeg,webp|max:2048",
            ],
        );
        $data = $request->only("email", "name");
        if ($file = $request->file('image')) {
            $filename = uniqid() . "_user_" . $file->getClientOriginalName();
            $file->storeAs("/public/images/", $filename);
            $data["image"] = $filename;
        }
        $request->user()->update($data);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            "password" => ['required', 'confirmed', 'min:6'],
            "currentPassword" => ['required', 'different:password', 'min:6'],
        ]);
        $user = $request->user();
        $currentPassword  = $request->currentPassword;
        if (Hash::check($currentPassword, $user->password)) {
            $newPassword = $request->password;
            $user->update(['password' => Hash::make($newPassword)]);
        } else {
            return response()->json(['data' => [
                'status' => 'fail',
                "message" => 'Provided password was wrong. Try again!',
            ]], 403);
        }
    }

    public function logout()
    {
        request()->user()->tokens()->delete();
        return response()->json([], 204);
    }
}
