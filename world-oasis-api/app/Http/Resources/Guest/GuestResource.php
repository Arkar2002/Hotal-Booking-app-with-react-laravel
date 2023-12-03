<?php

namespace App\Http\Resources\Guest;

use App\Http\Resources\BookingResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            "email" => $this->email,
            "nationalId" => $this->national_id,
            "nationality" => $this->nationality,
            "countryFlag" => $this->country_flag,
            "booking" => BookingResource::collection($this->whenLoaded('booking')),
        ];
    }
}
