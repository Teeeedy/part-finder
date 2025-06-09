<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarModel extends Model
{
    protected $table = 'models';
    protected $primaryKey = 'model_id';
    protected $fillable = ['make_id', 'name'];
    public $timestamps = true;
    const UPDATED_AT = null;

    // A car model belongs to a make
    public function make()
    {
        return $this->belongsTo(Make::class, 'make_id', 'make_id');
    }

    // A car model can have many parts
    public function parts()
    {
        return $this->hasMany(Part::class, 'model_id', 'model_id');
    }
}
