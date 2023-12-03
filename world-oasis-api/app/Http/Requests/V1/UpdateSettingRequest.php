<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();
        return $user && $user->tokenCan('update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $method = $this->method();

        if ($method === "PUT") {
            return [
                'min_booking_length' => ['required'],
                'max_booking_length' => ['required'],
                'max_guests_per_booking' => ['required'],
                'breakfast_price' => ['required'],
            ];
        } else {
            return [
                'min_booking_length' => ['sometimes', 'required'],
                'max_booking_length' => ['sometimes', 'required'],
                'max_guests_per_booking' => ['sometimes', 'required'],
                'breakfast_price' => ['sometimes', 'required'],
            ];
        }
    }

    public function prepareForValidation()
    {
        $data = [];

        if ($this->minBookingLength) {
            $data['min_booking_length'] = $this->minBookingLength;
        }

        if ($this->maxBookingLength) {
            $data['max_booking_length'] = $this->maxBookingLength;
        }

        if ($this->maxGuestsPerBooking) {
            $data['max_guests_per_booking'] = $this->maxGuestsPerBooking;
        }

        if ($this->breakfastPrice) {
            $data['breakfast_price'] = $this->breakfastPrice;
        }
        return $this->merge($data);
    }
}
