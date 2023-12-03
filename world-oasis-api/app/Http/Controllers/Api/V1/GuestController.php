<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\BulkStoreGuestRequest;
use App\Http\Requests\V1\StoreGuestRequest;
use App\Http\Requests\V1\UpdateGuestRequest;
use App\Http\Resources\Guest\GuestResource;
use App\Models\Guest;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

class GuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return GuestResource::collection(Guest::with("booking")->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuestRequest $request)
    {
        //
    }

    public function bulkStore(BulkStoreGuestRequest $request)
    {
        $data = [];
        foreach ($request->toArray() as $arr) {
            $arr['password'] = Hash::make($arr['password']);
            $data[] = $arr;
        }
        $data = collect($data)->map(function ($arr) {
            return Arr::except($arr, ['nationalId', 'countryFlag', 'password_confirmation']);
        });
        Guest::insert($data->toArray());
    }

    /**
     * Display the specified resource.
     */
    public function show(Guest $guest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGuestRequest $request, Guest $guest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guest $guest)
    {
        //
    }
}
