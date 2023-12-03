<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::create([
            "min_booking_length" => 10,
            "max_booking_length" => 85,
            "max_guests_per_booking" => 10,
            "breakfast_price" => 10,
        ]);
    }
}
