<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $i = 1;
        $day = $i + 2;
        $day++;
        return [
            'cabin_id' => $i++,
            'guest_id' => $i++,
            'start_date' => Carbon::now(),
            'end_date' => Carbon::parse("Now +$day days"),
            'num_nights' => $day,
            'num_guests' => $i + 3,
            'cabin_price' => $i + 100,
            'extra_price' => $i + 1,
            'total_price' => ($i + 100) + $i + 1,
            'has_breakfast' => 0,
            'is_paid' => 0,
            'observation' => "test",
        ];
    }
}
