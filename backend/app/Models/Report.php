<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

/**
 * Class Report
 *
 * Represents a downloadable summary of the user's savings and goals.
 *
 * @property int $id
 * @property int $user_id
 * @property string $type
 * @property string $file_url
 * @property \Illuminate\Support\Carbon $generated_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Report extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'type', 'file_url', 'generated_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
