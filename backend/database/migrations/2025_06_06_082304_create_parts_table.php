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
        Schema::create('parts', function (Blueprint $table) {
            $table->increments('part_id');
            $table->string('part_no', 50);
            $table->unsignedInteger('make_id');
            $table->unsignedInteger('model_id');
            $table->unsignedInteger('type_id');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('make_id')->references('make_id')->on('makes');
            $table->foreign('model_id')->references('model_id')->on('models');
            $table->foreign('type_id')->references('type_id')->on('types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts');
    }
};
