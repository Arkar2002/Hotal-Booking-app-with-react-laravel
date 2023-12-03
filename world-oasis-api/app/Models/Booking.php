<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'cabin_id',
        'guest_id',
        'start_date',
        'end_date',
        'num_nights',
        'num_guests',
        'has_breakfast',
        'is_paid',
        'observation',
        'extra_price',
        "status",
    ];

    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }

    public function cabin()
    {
        return $this->belongsTo(Cabin::class);
    }
}
