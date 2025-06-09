<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Make extends Model
{
    protected $primaryKey = 'make_id';
    protected $fillable = ['name'];
    public $timestamps = true;
    const UPDATED_AT = null;

    // A make can have many car models
    public function models()
    {
        return $this->hasMany(CarModel::class, 'make_id', 'make_id');
    }

    // A make can have many parts
    public function parts()
    {
        return $this->hasMany(Part::class, 'make_id', 'make_id');
    }
}
