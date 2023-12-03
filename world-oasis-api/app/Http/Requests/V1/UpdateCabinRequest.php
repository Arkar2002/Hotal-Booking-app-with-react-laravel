<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCabinRequest extends FormRequest
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
        $method = $this->method();
        if ($method === "PUT") {
            return [
                'name' => ['required'],
                'max_capacity' => ['required'],
                'regular_price' => ['required'],
                'discount_price' => ['required', 'different:regular_price'],
                'description' => ['required'],
                'image' => ['file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            ];
        } else {
            return [
                'name' => ['sometimes'],
                'max_capacity' => ['sometimes'],
                'regular_price' => ['sometimes'],
                'discount_price' => ['sometimes', 'different:regular_price'],
                'description' => ['sometimes'],
                'image' => ['sometimes', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            ];
        }
    }

    public function prepareForValidation()
    {
        $data = [];

        if ($this->maxCapacity) {
            $data['max_capacity'] = $this->maxCapacity;
        }

        if ($this->regularPrice) {
            $data['regular_price'] = $this->regularPrice;
        }

        if ($this->discountPrice) {
            $data['discount_price'] = $this->discountPrice;
        }

        return $this->merge($data);
    }
}
