<?php

namespace App\Http\Controllers;

use App\Services\CalculateProgressGoal;
use App\Models\Goal;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function generateGeneralReport()
    {
        $user = auth()->user();
        $userId = $user->id;
        $userName = $user->full_name;
        $currentDate = now()->format('d/m/Y');

        $goals = Goal::where('user_id', $userId)
            ->select('id', 'name', 'target_amount', 'total_saved', 'deadline', 'status')
            ->get()
            ->map(function ($goal) {

                $statusMap = [
                    'active' => 'Activo',
                    'completed' => 'Completado',
                    'expired' => 'Vencido',
                ];

                $goal->progress = CalculateProgressGoal::calculateProgressGoal($goal->id);
                $goal->deadline = Carbon::parse($goal->deadline)->format('d/m/Y');
                $goal->status = $statusMap[$goal->status];
                return $goal;
            });
        $pdf = Pdf::loadView('reports.generalReport', [
            'goals' => $goals,
            'userName' => $userName,
            'currentDate' => $currentDate
        ]);

        return $pdf->stream('reporte_general.pdf');
    }

}