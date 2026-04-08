<?php namespace BB\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Role extends Model
{
    /**
     * Fillable fields
     *
     * @var array
     */
    protected $fillable = ['name', 'title', 'description', 'email_public', 'email_private', 'slack_channel'];

    public function users()
    {
        return $this->belongsToMany('\BB\Models\User')->withTimestamps();
    }

    public static function findByName($name) {
        $role = self::where('name', $name)->first();
        if ($role) {
            return $role;
        }
        throw new ModelNotFoundException();
    }

}
