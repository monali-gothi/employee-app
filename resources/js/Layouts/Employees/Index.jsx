import { useState, useEffect, useCallback } from 'react';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';
import { Plus, Pencil, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export default function EmployeesIndex({ departments, managers }) {
    const [employees, setEmployees] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, last: 1, total: 0 });
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [filters, setFilters] = useState({
        name: '', department_id: '', manager_id: '',
        date_from: null, date_to: null, page: 1
    });

    const fetchData = useCallback(async (f) => {
        setLoading(true);
        try {
            const params = {
                ...f,
                date_from: f.date_from ? format(f.date_from, 'yyyy-MM-dd') : '',
                date_to: f.date_to ? format(f.date_to, 'yyyy-MM-dd') : '',
                start: (f.page - 1) * 10,
                length: 10,
            };
            const res = await axios.get('/employees-datatable', { params });
            setEmployees(res.data.data);
            setPagination({
                current: f.page,
                last: Math.ceil(res.data.recordsFiltered / 10) || 1,
                total: res.data.recordsFiltered,
            });
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchData(filters); }, [filters]);

    const updateFilter = (key, val) =>
        setFilters(prev => ({ ...prev, [key]: val, page: 1 }));

    const doDelete = () => {
        router.delete(route('employees.destroy', deleteId), {
            onSuccess: () => { setDeleteId(null); fetchData(filters); }
        });
    };

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
                <Link href={route('employees.create')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                    <Plus size={16} /> Add Employee
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 grid grid-cols-5 gap-3">
                <input
                    placeholder="Search by Name"
                    value={filters.name}
                    onChange={e => updateFilter('name', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <select value={filters.department_id} onChange={e => updateFilter('department_id', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">All Departments</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                <select value={filters.manager_id} onChange={e => updateFilter('manager_id', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">All Managers</option>
                    {managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
                <DatePicker selected={filters.date_from} onChange={d => updateFilter('date_from', d)}
                    placeholderText="Joining Date From" dateFormat="MM/dd/yyyy"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                <DatePicker selected={filters.date_to} onChange={d => updateFilter('date_to', d)}
                    placeholderText="To Date" dateFormat="MM/dd/yyyy"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                        <tr>
                            {['Employee Name', 'Code', 'Department', 'Manager', 'Joined Date', 'Actions'].map(h =>
                                <th key={h} className=`px-6 py-3 ${h === 'Actions' ? 'text-right' : 'text-left'}` > { h }</th>
              )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                        <tr><td colSpan="6" className="text-center py-8 text-gray-400">Loading...</td></tr>
                    ) : employees.length === 0 ? (
                        <tr><td colSpan="6" className="text-center py-8 text-gray-400">No employees found.</td></tr>
                    ) : employees.map(emp => (
                        <tr key={emp.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <Link href={route('employees.show', emp.id)} className="text-blue-600 hover:underline font-medium">
                                    {emp.full_name}
                                </Link>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{emp.employee_code}</td>
                            <td className="px-6 py-4 text-gray-600">{emp.department_name}</td>
                            <td className="px-6 py-4 text-gray-600">{emp.manager_name}</td>
                            <td className="px-6 py-4 text-gray-500">{emp.joining_date_fmt}</td>
                            <td className="px-6 py-4 text-right space-x-3">
                                <Link href={route('employees.show', emp.id)} className="text-gray-400 hover:text-gray-700"><Eye size={15} /></Link>
                                <Link href={route('employees.edit', emp.id)} className="text-blue-500 hover:text-blue-700"><Pencil size={15} /></Link>
                                <button onClick={() => setDeleteId(emp.id)} className="text-red-500 hover:text-red-700"><Trash2 size={15} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                    Page {pagination.current} of {pagination.last} — {pagination.total} records
                </span>
                <div className="flex gap-2">
                    <button
                        disabled={pagination.current === 1}
                        onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))}
                        className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-40">
                        <ChevronLeft size={14} /> Previous
                    </button>
                    <button
                        disabled={pagination.current === pagination.last}
                        onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-40">
                        Next <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>

      {/* Delete Modal */ }
    {
        deleteId && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-2xl">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trash2 size={20} className="text-red-500" />
                    </div>
                    <p className="text-gray-800 font-semibold mb-1">Delete Employee?</p>
                    <p className="text-gray-500 text-sm mb-4">Are you sure you want to delete this employee? This action cannot be undone.</p>
                    <div className="flex gap-3">
                        <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm">Cancel</button>
                        <button onClick={doDelete} className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm">Yes, Delete</button>
                    </div>
                </div>
            </div>
        )
    }
    </AppLayout >
  );
}