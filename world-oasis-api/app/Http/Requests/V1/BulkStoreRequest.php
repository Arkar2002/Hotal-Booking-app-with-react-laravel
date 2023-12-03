<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class BulkStoreRequest extends FormRequest
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
            "*.cabin_id" => ['required'],
            "*.guest_id" => ['required'],
            "*.start_date" => ['required', 'date_format:Y-m-d'],
            "*.end_date" => ['required', 'date_format:Y-m-d'],
            "*.num_nights" => ['required'],
            "*.num_guests" => ['required'],
            "*.has_breakfast" => ['required'],
            "*.is_paid" => ['required'],
            "*.observation" => ['nullable'],
            "*.status" => ['nullable'],
        ];
    }

    public function prepareForValidation()
    {
        $data = [];

        foreach ($this->toArray() as $obj) {
            $obj['cabin_id'] = $obj['cabinId'];
            $obj['guest_id'] = $obj['guestId'];
            $obj['start_date'] = $obj['startDate'];
            $obj['end_date'] = $obj['endDate'];
            $obj['num_nights'] = $obj['numNights'];
            $obj['num_guests'] = $obj['numGuests'];
            $obj['has_breakfast'] = $obj['hasBreakfast'] == true ? 1 : 0;
            $obj['is_paid'] = $obj['isPaid'] == true ? 1 : 0;
            $data[] = $obj;
        }
        return $this->merge($data);
    }
}
