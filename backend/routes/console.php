<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::command('goals:recalculate-suggestions')->weekly()->sundays()->at('00:00');

Schedule::command('savings-goal-notification')->dailyAt('00:00');

Schedule::command('app:send-inactivity-notification')->dailyAt('08:00');