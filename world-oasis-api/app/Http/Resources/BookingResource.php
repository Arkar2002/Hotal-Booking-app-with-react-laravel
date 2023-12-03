<?php

namespace App\Http\Resources;

use App\Http\Resources\Guest\GuestResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cabinId' => $this->cabin_id,
            'guestId' => $this->guest_id,
            'startDate' => $this->start_date,
            'endDate' => $this->end_date,
            'numNights' => $this->num_nights,
            'numGuests' => $this->num_guests,
            'cabinPrice' => $this->cabin_price,
            'extraPrice' => $this->extra_price,
            'totalPrice' => $this->total_price,
            'status' => $this->status,
            'hasBreakfast' => $this->has_breakfast != 0 ? true : false,
            'isPaid' => $this->is_paid == 0 ? false : true,
            'observation' => $this->observation,
            "createdAt" => $this->created_at,
            "guest" => new GuestResource($this->whenLoaded('guest')),
            "cabin" => new CabinResource($this->whenLoaded('cabin')),
        ];
    }
}
