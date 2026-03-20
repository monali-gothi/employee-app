<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index() {
        $departments = Department::latest()->get();
        return Inertia::render('Departments/Index', compact('departments'));
    }

    public function store(Request $request) {
        $request->validate(['name' => 'required|unique:departments,name|max:100']);
        Department::create($request->only('name'));
        return back()->with('success', 'Department created.');
    }

    public function update(Request $request, Department $department) {
        $request->validate(['name' => 'required|unique:departments,name,'.$department->id.'|max:100']);
        $department->update($request->only('name'));
        return back()->with('success', 'Department updated.');
    }

    public function destroy(Department $department) {
        $department->delete(); // soft delete
        return back()->with('success', 'Department deleted.');
    }
}