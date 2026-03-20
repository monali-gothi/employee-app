<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{DepartmentController, ManagerController, EmployeeController};
use App\Models\Department;
use App\Models\Manager;
use App\Models\Employee;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'departmentCount' => Department::count(),
        'managerCount'    => Manager::count(),
        'employeeCount'   => Employee::count(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // Departments
    Route::resource('departments', DepartmentController::class)
          ->except(['show', 'create', 'edit']);

    // Managers
    Route::resource('managers', ManagerController::class)
          ->except(['show', 'create', 'edit']);

    // Employees
    Route::resource('employees', EmployeeController::class);
    Route::get('/employees-datatable', [EmployeeController::class, 'datatable'])
          ->name('employees.datatable');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
