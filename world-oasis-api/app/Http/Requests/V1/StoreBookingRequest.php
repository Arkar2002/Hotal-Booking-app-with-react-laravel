<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cabin_id' => ['required', 'integer'],
            'start_date' => ['required', 'date_format:Y-m-d'],
            'end_date' => ['required', 'date_format:Y-m-d'],
            'num_nights' => ['required', 'integer'],
            'num_guests' => ['required', 'integer'],
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'cabin_id' => $this->cabinId,
            'start_date' => $this->startDate,
            'end_date' => $this->endDate,
            'num_nights' => $this->numNights,
            'num_guests' => $this->numGuests,
            'has_breakfast' => $this->hasBreakfast == 'true' ? 1 : 0,
            'is_paid' => $this->isPaid == 'true' ? 1 : 0,
        ]);
    }
}
