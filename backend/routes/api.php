<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PartsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(PartsController::class)
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/makes', 'getMakes');
        Route::get('/makes/{makeId}/models', 'getModels');
        Route::get('/makes/{makeId}/models/{modelId}/types', 'getTypes');
        Route::get('/parts', 'getParts');
    });
