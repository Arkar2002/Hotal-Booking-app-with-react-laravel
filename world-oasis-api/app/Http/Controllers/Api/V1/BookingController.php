<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\BulkStoreRequest;
use App\Http\Requests\V1\StoreBookingRequest;
use App\Http\Requests\V1\UpdateBookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Cabin;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $bookings = Booking::with('guest', "cabin");
        // for filter;
        foreach ($request->filter as $key => $value) {
            if (!$value) continue;
            $bookings = $bookings->where($key, $value);
        }

        // // sortby
        foreach ($request->sortby as $key => $value) {
            $bookings = $bookings->orderBy($key, $value);
        }
        return BookingResource::collection($bookings->paginate(10)->appends($request->query()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request)
    {
        // change camelCase to snake_case
        $data = $this->filterDataFromRequest($request->toArray());
        $data['guest_id'] = $request->user()->id;

        // calculation for prices
        $data = $this->calcPrice($data);

        $booking = Booking::create($data);

        return (new BookingResource(Booking::find($booking->id)))->response()->setStatusCode(201);
    }

    public function bulkStore(BulkStoreRequest $request)
    {
        $bookingData = [];

        foreach ($request->toArray() as $arr) {
            $bookingData[] = $this->calcPrice($arr);
        }

        $bookingDataAfterCalc = collect($bookingData)->map(function ($arr) {
            return $this->filterDataFromRequestForBulk($arr);
        });

        Booking::insert($bookingDataAfterCalc->toArray());
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        return new BookingResource($booking->loadMissing("guest", "cabin"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, Booking $booking)
    {
        $data = $this->filterDataFromRequest($request->toArray());
        if (!$booking->is_paid || $booking->status === "unconfirmed") {
            $data = $this->calcPrice($data);
            if ($booking->status === "unconfirmed") {
                $data['status'] = "checked-in";
            } else {
                $data['status'] = "checked-out";
            }
            $booking->update($data);
            return response()->json(["message" => 'Booking successfully updated'], 200);
        } else {
            return response()->json(["message" => "You can't update booking since you've already paid or checked out"], 403);
        }
    }

    // Checkout only function
    public function checkout(Request $request, Booking $booking)
    {
        $request->validate(["status" => [Rule::in('checked-out')]]);
        $data = $request->only('status');
        if ($booking->is_paid && $booking->status === "checked-in") {
            $booking->update($data);
        } else {
            return response()->json(["data" => [
                "status" => "fail",
                "message" => 'You need to paid this first',
            ]], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json([], 204);
    }

    private function filterDataFromRequest($data)
    {
        return Arr::except($data, [
            'cabinId',
            "guestId",
            'startDate',
            'endDate',
            'numNights',
            'numGuests',
            "cabin_price",
            "extra_price",
            "total_price",
            'hasBreakfast',
            'status',
            "isPaid",
        ]);
    }

    // only for data seeding
    private function filterDataFromRequestForBulk($data)
    {
        return Arr::except($data, [
            'cabinId',
            "guestId",
            'startDate',
            'endDate',
            'numNights',
            'numGuests',
            'hasBreakfast',
            'status',
            "isPaid",
        ]);
    }

    private function calcPrice($data)
    {
        $cabin = Cabin::where('id', $data["cabin_id"])->first();
        $discountPriceFromCabin = $cabin->discount_price;
        $cabinPrice = $discountPriceFromCabin > 0 ? $cabin->regular_price  - $cabin->discount_price : $cabin->regular_price;

        $cabinPrice = $cabinPrice * $data["num_nights"] * $data["num_guests"];

        $extraPrice = Setting::find(1)->breakfast_price;
        if ($data["has_breakfast"]) {
            $extraPrice = $extraPrice * $data["num_nights"] * $data["num_guests"];
        } else {
            $extraPrice  = 0;
        }

        $totalPrice = ($cabinPrice + $extraPrice);

        $data['cabin_price'] = $cabinPrice;
        $data['extra_price'] = $extraPrice;
        $data['total_price'] = $totalPrice;

        return $data;
    }
}
