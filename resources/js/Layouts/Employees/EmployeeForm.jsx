import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EmployeeForm({ employee = null, departments, managers, isEdit = false }) {
    const { data, setData, post, put, errors, processing } = useForm({
        full_name: employee?.full_name ?? '',
        employee_code: employee?.employee_code ?? '',
        department_id: employee?.department_id ?? '',
        manager_id: employee?.manager_id ?? '',
        joining_date: employee?.joining_date ? new Date(employee.joining_date) : null,
        email: employee?.email ?? '',
        phone: employee?.phone ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('employees.update', employee.id));
        } else {
            post(route('employees.store'));
        }
    };

    const Field = ({ label, error, children }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {children}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );

    return (
        <AppLayout>
            <div className="max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">{isEdit ? 'Edit Employee' : 'Add Employee'}</h1>

                <form onSubmit={submit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-5">
                    <Field label="Full Name" error={errors.full_name}>
                        <input value={data.full_name} onChange={e => setData('full_name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </Field>

                    <Field label="Employee Code" error={errors.employee_code}>
                        <input value={data.employee_code} onChange={e => setData('employee_code', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </Field>

                    <Field label="Department" error={errors.department_id}>
                        <select value={data.department_id} onChange={e => setData('department_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                            <option value="">Select Department</option>
                            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </Field>

                    <Field label="Manager" error={errors.manager_id}>
                        <select value={data.manager_id} onChange={e => setData('manager_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                            <option value="">Select Manager</option>
                            {managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                    </Field>

                    <Field label="Joining Date" error={errors.joining_date}>
                        <DatePicker
                            selected={data.joining_date}
                            onChange={d => setData('joining_date', d)}
                            dateFormat="MM/dd/yyyy"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            placeholderText="Select date"
                        />
                    </Field>

                    <Field label="Email Address" error={errors.email}>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </Field>

                    <Field label="Phone Number" error={errors.phone}>
                        <input value={data.phone} onChange={e => setData('phone', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </Field>

                    <div className="flex gap-3 pt-2">
                        <Link href={route('employees.index')}
                            className="flex-1 text-center border border-gray-300 rounded-lg py-2.5 text-sm font-medium">
                            Cancel
                        </Link>
                        <button type="submit" disabled={processing}
                            className="flex-1 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700">
                            {processing ? 'Saving...' : 'Save Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}