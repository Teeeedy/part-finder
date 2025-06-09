<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Make;
use App\Models\CarModel;
use App\Models\Type;
use App\Models\Part;
use Illuminate\Http\Request;

class PartsController extends Controller
{
    // GET /api/makes
    // Return all available makes
    public function getMakes()
    {
        return response()->json(Make::all());
    }

    // GET /api/makes/{makeId}/models
    // Returns all available models from {make}
    public function getModels($makeId)
    {
        $models = CarModel::where('make_id', $makeId)->get();
        return response()->json($models);
    }

    // GET /api/makes/{makeId}/models/{modelId}/types
    // Returns all available types from {make} and {model}
    public function getTypes($makeId, $modelId)
    {
        $types = Type::whereHas('parts', function ($query) use ($makeId, $modelId) {
            $query->where('make_id', $makeId)
                ->where('model_id', $modelId);
        })->get();

        return response()->json($types);
    }

    // GET /api/parts?make_id=&model_id=&type_id=
    // Return all available parts from {make} {model} and {type}
    public function getParts(Request $request)
    {
        $makeId = $request->query('make_id');
        $modelId = $request->query('model_id');
        $typeId = $request->query('type_id');

        $parts = Part::byHierarchy($makeId, $modelId, $typeId)->get();

        return response()->json($parts);
    }
}
