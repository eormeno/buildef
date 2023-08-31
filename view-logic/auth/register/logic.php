<?php

namespace App\ViewLogic\Auth\Register;

use App\Models\User;

class RegisterLogic
{
    public function register($request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        auth()->login($user);

        return redirect()->route('home');
    }
}
