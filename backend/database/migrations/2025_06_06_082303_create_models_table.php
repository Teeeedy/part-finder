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
        Schema::create('models', function (Blueprint $table) {
            $table->increments('model_id');
            $table->unsignedInteger('make_id');
            $table->string('model_name', 100);
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('make_id')->references('make_id')->on('makes')->onDelete('cascade');
            $table->unique(['make_id', 'model_name'], 'unique_make_model');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('models');
    }
};
