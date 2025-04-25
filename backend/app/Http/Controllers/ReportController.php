<?php

namespace App\Http\Controllers;

use App\Models\Category;
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

    public function generateCategoryReport()
    {
        $user = auth()->user();
        $userId = $user->id;
        $userName = $user->full_name;
        $currentDate = now()->format('d/m/Y');

        $categories = Category::whereHas('goals', function ($query) use ($userId) {
            // Asegúrate de que las categorías estén asociadas con el usuario actual
            $query->where('user_id', $userId);
        })->get();

        // Para cada categoría, obtener las metas y su progreso
        $categoryGoals = $categories->map(function ($category) use ($userId) {  // Aquí capturamos $userId
            $goals = Goal::where('category_id', $category->id)
                ->where('user_id', $userId)  // Asegura que las metas son solo del usuario actual
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

            return [
                'category' => $category,
                'goals' => $goals
            ];
        });


        // Generar el PDF con la vista
        $pdf = Pdf::loadView('reports.categoryReport', [
            'categoryGoals' => $categoryGoals,
            'userName' => $userName,
            'currentDate' => $currentDate
        ]);

        return $pdf->stream('reporte_por_categoria.pdf');
    }
    public function generateGoalStatusReport()
    {
        $user = auth()->user();
        $userId = $user->id;
        $userName = $user->full_name;
        $currentDate = now()->format('d/m/Y');

        $completedGoals = Goal::where('user_id', $userId)
            ->where('status', 'completed')
            ->select('id', 'name', 'target_amount', 'deadline', 'status')
            ->get();
        $expiredGoals = Goal::where('user_id', $userId)
            ->where('status', 'expired')
            ->select('id', 'name', 'target_amount', 'deadline', 'status')
            ->get();

        $activeGoals = Goal::where('user_id', $userId)
            ->where('status', 'active')
            ->select('id', 'name', 'target_amount', 'deadline', 'status')
            ->get();

        // Calcular el progreso para cada meta
        foreach ($completedGoals as $goal) {
            $goal->progress = CalculateProgressGoal::calculateProgressGoal($goal->id);
            $goal->deadline = Carbon::parse($goal->deadline)->format('d/m/Y');

            foreach ($expiredGoals as $goal) {
                $goal->progress = CalculateProgressGoal::calculateProgressGoal($goal->id);
                $goal->deadline = Carbon::parse($goal->deadline)->format('d/m/Y');
            }

            foreach ($activeGoals as $goal) {
                $goal->progress = CalculateProgressGoal::calculateProgressGoal($goal->id);
                $goal->deadline = Carbon::parse($goal->deadline)->format('d/m/Y');
            }

            // Generar el PDF con la vista
            $pdf = Pdf::loadView('reports.goalStatusReport', [
                'completedGoals' => $completedGoals,
                'expiredGoals' => $expiredGoals,
                'activeGoals' => $activeGoals,
                'userName' => $userName,
                'currentDate' => $currentDate
            ]);

            return $pdf->stream('reporte_de_metasporestado.pdf');
        }
    }
}