<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class BulkStoreGuestRequest extends FormRequest
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
            "*.name" => ['required'],
            "*.email" => ['required', 'email', 'unique:guests,email'],
            "*.password" => ['required', 'confirmed', "min:6"],
            "*.national_id" => ['required'],
            "*.nationality" => ['required'],
            "*.country_flag" => ['nullable'],
        ];
    }

    public function prepareForValidation()
    {
        $data = [];

        foreach ($this->toArray() as $obj) {
            $obj['national_id'] = $obj['nationalId'];
            $obj['country_flag'] = $obj['countryFlag'];
            $data[] = $obj;
        }

        return $this->merge($data);
    }
}
