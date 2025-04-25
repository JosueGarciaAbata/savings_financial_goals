<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;

class PDFController extends Controller
{
    public function generateGeneralReport()
    {
        //$userId = auth()->id();

        $userId = 1;
        $goals = Goal::where("user_id", $userId)
            ->with(["category"])
            ->get();

        return response()->json([
            'goals' => $goals,
        ]);


    }
}