<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookingRequest extends FormRequest
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
            "has_breakfast" => ['required'],
            "is_paid" => ['required'],
            "status" => [Rule::in(["unconfirmed", "checked-in", "checked-out"])]
        ];
    }

    public function prepareForValidation()
    {
        $data = [];

        if ($this->cabinId) {
            $data['cabin_id'] = $this->cabinId;
        }

        if ($this->startDate) {
            $data['start_date'] = $this->startDate;
        }

        if ($this->endDate) {
            $data['end_date'] = $this->endDate;
        }

        if ($this->numNights) {
            $data['num_nights'] = $this->numNights;
        }

        if ($this->numGuests) {
            $data['num_guests'] = $this->numGuests;
        }

        if ($this->hasBreakfast) {
            $data['has_breakfast'] = $this->hasBreakfast === true ? 1 : 0;
        }

        if ($this->isPaid) {
            $data['is_paid'] = $this->isPaid === true ? 1 : 0;
        }

        return $this->merge($data);
    }
}
