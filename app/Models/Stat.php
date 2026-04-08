<?php namespace BB\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Stat extends Model
{

    protected $table = 'stats';

    protected $fillable = [
        'date', 'category', 'label', 'value'
    ];

} 
