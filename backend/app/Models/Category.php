<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Goal;

/**
 * Class Category
 *
 * Represents a financial goal category (e.g., Travel, Savings).
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function goals()
    {
        return $this->hasMany(Goal::class);
    }
}
