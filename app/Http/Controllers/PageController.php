<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SessionManagerService;

class PageController extends Controller
{
    private SessionManagerService $sessionManagerService;

    public function __construct()
    {
        //$this->sessionManagerService = app('session-manager');
    }

    public function update(Request $request)
    {
        $page = $request->input('page');
        if (empty($page)) {
            $page = 'home';
        }
        return response()->json($this->getLoginStructure(), 201);
    }

    private function getLoginStructure()
    {
        return [
            "syncType" => "full",
            "id" => 11,
            "class" => "Page",
            "elements" => [
                [
                    "id" => 12,
                    "class" => "AWForm",
                    "elements" => [
                        [
                            "id" => 14,
                            "class" => "AWInput",
                            "type" => "email",
                            "name" => "email",
                            "label" => "Email",
                            "placeholder" => "Your email",
                            "required" => "true",
                            "formId" => 12
                        ],
                        [
                            "id" => 15,
                            "class" => "AWInput",
                            "type" => "password",
                            "name" => "password",
                            "label" => "Password",
                            "placeholder" => "Password",
                            "required" => "true",
                            "formId" => 12
                        ]
                    ],
                    "title" => "Login",
                    "submit" => "Login",
                    "action" => "login",
                    "submitButton" => [
                        "id" => 13,
                        "class" => "AWButton",
                        "text" => "Login",
                        "primary" => "true",
                        "action" => "login",
                        "formId" => 12
                    ]
                ],
                [
                    "id" => 16,
                    "class" => "AWButton",
                    "text" => "Reset password",
                    "primary" => "false",
                    "action" => "resetPassword"
                ]
            ],
            "page" => "LoginPage",
            "title" => "Login Page"
        ];
    }
}