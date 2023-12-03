<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        if ($file = $request->file('image')) {
            if ($allPreshowImages = Storage::allFiles('/public/preshowImages')) Storage::delete($allPreshowImages);
            $filename = uniqid() . "_preshow_" . $file->getClientOriginalName();
            $file->storeAs('/public/preshowImages', $filename);
            return asset('/storage/preshowImages/' . $filename);
        }
    }
}
