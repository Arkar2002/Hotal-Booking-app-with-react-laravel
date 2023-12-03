<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cabin extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'max_capacity',
        'regular_price',
        'discount_price',
        'description',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return asset('storage/images/' . $this->image);
    }
}
