<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Services\SessionManagerService;

class FileController extends Controller
{
    public function show(Request $request)
    {
        $filename = $request->route('filename');
        if (!$filename) {
            $filename = env('INDEX_NAME', 'index');
        }

        $filePath = public_path() . '\\' . $filename;

        if (File::exists($filePath)) {
            $fileContents = File::get($filePath);
            if (File::extension($filePath) === 'html') {
                $csrfToken = $request->session()->get('_token');
                $fileContents = str_replace('{{csrf_token}}', $csrfToken, $fileContents);
            }
            return response($fileContents, 200);
        } else {
            abort(404, "file $filename not found");
        }
    }
}