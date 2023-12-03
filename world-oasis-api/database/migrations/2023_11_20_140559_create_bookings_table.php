<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->integer('cabin_id')->unsigned();
            $table->integer('guest_id')->unsigned();
            $table->date('start_date');
            $table->date('end_date');
            $table->tinyInteger('num_nights')->unsigned();
            $table->tinyInteger('num_guests')->unsigned();
            $table->integer('cabin_price')->unsigned();
            $table->integer('extra_price')->unsigned();
            $table->integer('total_price')->unsigned();
            $table->enum('status', ['unconfirmed', 'checked-in', 'checked-out'])->default('unconfirmed');
            $table->boolean('has_breakfast')->default(0);
            $table->boolean('is_paid')->default(0);
            $table->text('observations')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
