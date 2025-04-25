<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Goal;

/**
 * Class Suggestion
 *
 * Represents a recommendation automatically generated for a goal.
 *
 * @property int $id
 * @property int $goal_id
 * @property string $message
 * @property \Illuminate\Support\Carbon $calculated_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Suggestion extends Model
{
    use HasFactory;

    protected $fillable = ['goal_id', 'value', 'frequency', 'risk_level', 'calculated_at'];

    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }
}
