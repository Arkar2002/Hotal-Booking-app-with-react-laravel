<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CabinResource extends JsonResource
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
            'name' => $this->name,
            'image' => $this->image_url,
            'maxCapacity' => $this->max_capacity,
            'regularPrice' => $this->regular_price,
            'discountPrice' => $this->discount_price,
            'description' => $this->description,
        ];
    }
}
