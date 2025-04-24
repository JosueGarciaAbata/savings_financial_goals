<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Goal;

/**
 * Class Contribution
 *
 * Represents a user's monetary contribution towards a goal.
 *
 * @property int $id
 * @property int $goal_id
 * @property float $amount
 * @property string $contribution_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Contribution extends Model
{
    use HasFactory;

    protected $fillable = ['goal_id', 'contribution_date', 'amount'];

    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }
}
