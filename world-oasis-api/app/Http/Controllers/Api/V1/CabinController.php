<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreCabinRequest;
use App\Http\Requests\V1\UpdateCabinRequest;
use App\Http\Resources\CabinResource;
use App\Models\Cabin;
use Illuminate\Support\Facades\Storage;

class CabinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CabinResource::collection(Cabin::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCabinRequest $request)
    {
        $data = $request->all();
        $file = $request->file('image');
        $filename = uniqid() . "_c_" . $file->getClientOriginalName();
        $file->storeAs('public/images', $filename);
        $data['image'] = $filename;
        return new CabinResource(Cabin::create($data));
    }

    /**
     * Display the specified resource.
     */
    public function show(Cabin $cabin)
    {
        if (!$cabin) return response()->json([], 404);
        return new CabinResource($cabin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCabinRequest $request, Cabin $cabin)
    {
        if (!$cabin) return response()->json([], 404);
        $data = $request->all();
        if ($file = $request->file('image')) {
            if ($oldImage = $cabin->image) Storage::delete('public/images/' . $oldImage);
            $filename = uniqid() . "_c_" . $file->getClientOriginalName();
            $file->storeAs('public/images', $filename);
            $data['image'] = $filename;
        }
        $cabin->update($data);
        return response()->json(["data" => [
            'message' => "$cabin->name has been successfully updated",
        ]], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cabin $cabin)
    {
        if (!$cabin) return response()->json([], 404);
        if ($imagename = $cabin->image) {
            Storage::delete('public/images/' . $imagename);
        }
        $cabin->delete();
        return response()->json([], 204);
    }
}
