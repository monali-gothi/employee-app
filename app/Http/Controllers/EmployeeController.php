<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\{Employee, Department, Manager};
use Illuminate\Http\Request;
use Inertia\Inertia;
use Yajra\DataTables\Facades\DataTables;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $departments = Department::latest()->get();
        $managers    = Manager::with('department')->latest()->get();

        return Inertia::render('Employees/Index', [
            'departments' => $departments,
            'managers'    => $managers,
        ]);
    }

    // Yajra DataTables AJAX endpoint
    public function datatable(Request $request)
    {
        $query = Employee::with(['department', 'manager'])->select('employees.*');

        // Filters
        if ($request->filled('name'))
            $query->where('full_name', 'like', '%'.$request->name.'%');

        if ($request->filled('department_id'))
            $query->where('department_id', $request->department_id);

        if ($request->filled('manager_id'))
            $query->where('manager_id', $request->manager_id);

        if ($request->filled('date_from'))
            $query->whereDate('joining_date', '>=', $request->date_from);

        if ($request->filled('date_to'))
            $query->whereDate('joining_date', '<=', $request->date_to);

        return DataTables::of($query)
            ->addColumn('department_name', fn($e) => $e->department?->name)
            ->addColumn('manager_name',    fn($e) => $e->manager?->name)
            ->addColumn('joining_date_fmt', fn($e) => $e->joining_date?->format('m/d/Y'))
            ->make(true);
    }

    public function create() {
        $departments = Department::latest()->get();
        $managers    = Manager::with('department')->latest()->get();
        return Inertia::render('Employees/Create', compact('departments', 'managers'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name'     => 'required|max:150',
            'employee_code' => 'required|unique:employees|max:20',
            'department_id' => 'required|exists:departments,id',
            'manager_id'    => 'nullable|exists:managers,id',
            'joining_date'  => 'required|date',
            'email'         => 'required|email|unique:employees',
            'phone'         => 'nullable|max:20',
        ]);
        Employee::create($validated);
        return back()->with('success', 'Employee created.');
    }
    
    public function show(Employee $employee)
    {
        $employee->load('department', 'manager');
        return Inertia::render('Employees/Show', ['employee' => $employee]);
    }

    public function edit(Employee $employee)
    {
        $employee->load('department', 'manager');
        $departments = Department::latest()->get();
        $managers    = Manager::with('department')->latest()->get();
        return Inertia::render('Employees/Edit', compact('employee', 'departments', 'managers'));
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'full_name'     => 'required|max:150',
            'employee_code' => 'required|max:20|unique:employees,employee_code,'.$employee->id,
            'department_id' => 'required|exists:departments,id',
            'manager_id'    => 'nullable|exists:managers,id',
            'joining_date'  => 'required|date',
            'email'         => 'required|email|unique:employees,email,'.$employee->id,
            'phone'         => 'nullable|max:20',
        ]);
        $employee->update($validated);
        return redirect()->route('employees.index')->with('success', 'Employee updated.');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete(); // soft delete
        return back()->with('success', 'Employee deleted.');
    }
}