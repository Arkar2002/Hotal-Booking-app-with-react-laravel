<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreCabinRequest extends FormRequest
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
            'name' => ['required'],
            'max_capacity' => ['required', "max:3"],
            'regular_price' => ['required'],
            'discount_price' => ['required', 'different:regular_price'],
            'description' => ['required'],
            'image' => ['required', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge([
            "max_capacity" => $this->maxCapacity,
            "regular_price" => $this->regularPrice,
            "discount_price" => $this->discountPrice,
        ]);
    }
}
