<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Manager, Department};
use Inertia\Inertia;

class ManagerController extends Controller
{
    public function index() {
        $managers    = Manager::with('department')->latest()->get();
        $departments = Department::latest()->get();
        return Inertia::render('Managers/Index', compact('managers', 'departments'));
    }

    public function store(Request $request) {
        $request->validate([
            'name'          => 'required|max:100',
            'department_id' => 'required|exists:departments,id',
        ]);
        Manager::create($request->only('name', 'department_id'));
        return back()->with('success', 'Manager created.');
    }

    public function update(Request $request, Manager $manager) {
        $request->validate([
            'name'          => 'required|max:100',
            'department_id' => 'required|exists:departments,id',
        ]);
        $manager->update($request->only('name', 'department_id'));
        return back()->with('success', 'Manager updated.');
    }

    public function destroy(Manager $manager) {
        $manager->delete();
        return back()->with('success', 'Manager deleted.');
    }
}