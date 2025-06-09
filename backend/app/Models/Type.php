<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $primaryKey = 'type_id';
    protected $fillable = ['name'];
    public $timestamps = true;
    const UPDATED_AT = null;

    // A type can have many parts
    public function parts()
    {
        return $this->hasMany(Part::class, 'type_id', 'type_id');
    }
}
