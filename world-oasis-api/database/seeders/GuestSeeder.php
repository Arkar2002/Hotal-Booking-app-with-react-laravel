<?php

namespace Database\Seeders;

use App\Models\Guest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class GuestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $guest = Guest::create([
            'name' => 'Jonas Schmedtmann',
            'email' => 'hello@jonas.io',
            'password' => Hash::make('password'),
            'national_id' => 3525436345,
            'nationality' => 'Portugal',
            'country_flag' => 'https://flagcdn.com/pt.svg',
        ]);
    }
}
