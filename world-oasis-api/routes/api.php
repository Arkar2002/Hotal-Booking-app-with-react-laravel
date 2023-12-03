<?php

use App\Http\Controllers\Api\V1\Admin\AuthController as AdminAuth;
use App\Http\Controllers\Api\V1\Admin\DashboardController;
use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\CabinController;
use App\Http\Controllers\Api\V1\GuestController;
use App\Http\Controllers\Api\V1\SettingController;
use App\Http\Controllers\ImageController;
use App\Http\Resources\Admin\UserResource as AdminUserResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// admins
Route::post('/admin/login', [AdminAuth::class, 'login']);

Route::get('/test', function () {
    $date1 = Carbon::parse("Now +3 days");
    $date2 = Carbon::now();
    // return $date1;
    // return date_sub(date('Y-m-d H:i:s', strtotime("+ 3 days")), date("Y-m-d H:i:s"));
    // return $date1->diffForHumans($date2);
    // return $date2->format('Y-m-d');
    return Carbon::parse("Now +1 days");
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/admin/register', [AdminAuth::class, 'register']);
    Route::post('/admin/logout', [AdminAuth::class, 'logout']);
    Route::post('/admin/update', [AdminAuth::class, 'updateUser']);
    Route::post('/admin/updatepassword', [AdminAuth::class, 'updatePassword']);
    Route::apiResource('settings', SettingController::class);
    Route::apiResource('cabins', CabinController::class);
    Route::apiResource('bookings', BookingController::class);
    Route::post('bookings/{booking}/checkout', [BookingController::class, 'checkout']);
    Route::post('bookings/bulk', [BookingController::class, 'bulkStore']);
    Route::post('guests/bulk', [GuestController::class, 'bulkStore']);
    Route::apiResource('guest', GuestController::class);
});

Route::get('/dashboard', [DashboardController::class, "dashboard"]);


Route::middleware('auth:sanctum')->get('/admin/user', function (Request $request) {
    return new AdminUserResource($request->user());
});


// preShowImage
Route::post('/image/upload', [ImageController::class, 'upload']);
