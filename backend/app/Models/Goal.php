<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Category;
use App\Models\Contribution;
use App\Models\Suggestion;

/**
 * Class Goal
 *
 * Represents a financial goal associated with a user account.
 *
 * @property int $id
 * @property int $user_id
 * @property int $category_id
 * @property string $name
 * @property float $target_amount
 * @property string $deadline
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'category_id', 'name', 'target_amount',
        'deadline', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function contributions()
    {
        return $this->hasMany(Contribution::class);
    }

    public function suggestions()
    {
        return $this->hasMany(Suggestion::class);
    }
}
