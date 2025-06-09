<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    protected $primaryKey = 'part_id';
    protected $fillable = ['make_id', 'model_id', 'type_id', 'name'];
    public $timestamps = true;
    const UPDATED_AT = null;


    // A part can belong to many makes
    public function make()
    {
        return $this->belongsTo(Make::class, 'make_id', 'make_id');
    }

    // A part can belong to many models
    public function model()
    {
        return $this->belongsTo(CarModel::class, 'model_id', 'model_id');
    }

    // A part can belong to many types
    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id', 'type_id');
    }

    // Search By Hierarchy depending on search filters
    public function scopeSearchByHierarchy($query, $makeId = null, $modelId = null, $typeId = null)
    {
        if ($makeId) {
            $query->where('make_id', $makeId);
        }

        if ($modelId) {
            $query->where('model_id', $modelId);
        }

        if ($typeId) {
            $query->where('type_id', $typeId);
        }

        return $query;
    }
}
