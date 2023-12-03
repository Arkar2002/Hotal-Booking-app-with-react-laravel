<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'minBookingLength' => $this->min_booking_length,
            'maxBookingLength' => $this->max_booking_length,
            'maxGuestsPerBooking' => $this->max_guests_per_booking,
            'breakfastPrice' => $this->breakfast_price,
        ];
    }
}
