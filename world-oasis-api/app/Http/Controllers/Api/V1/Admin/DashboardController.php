<?php

namespace App\Http\Controllers\Api\V1\Admin;

use Carbon\Carbon;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Cabin;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        $last = $request->last ?? 7;
        $todayCheckInOut = BookingResource::collection(Booking::orWhereDate("start_date", date("Y-m-d"))->orWhereDate("end_date", date("Y-m-d"))->with('guest')->get());
        $getStaysAfterDate = BookingResource::collection(Booking::whereDate("start_date", ">=", date("Y-m-d", strtotime("-$last days")))->whereDate("start_date", "<=", date("Y-m-d"))->latest()->get());
        $getBookingsAfterDate = BookingResource::collection(Booking::whereDate("created_at", ">=", date("Y-m-d", strtotime("-$last days")))->whereDate("created_at", "<=", date("Y-m-d"))->latest()->get());
        $cabins = Cabin::count();
        return response()->json([
            "data" => [
                "todayCheckInOut" => $todayCheckInOut,
                "getStaysAfterDate" => $getStaysAfterDate,
                "getBookingsAfterDate" => $getBookingsAfterDate,
                "cabinCount" => $cabins,
            ],
        ]);
    }
}
