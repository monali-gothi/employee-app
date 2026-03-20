import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function Show({ employee }) {
  const fields = [
    { label: 'Full Name', value: employee.full_name },
    { label: 'Employee Code', value: employee.employee_code },
    { label: 'Department', value: employee.department?.name },
    { label: 'Manager', value: employee.manager?.name ?? 'N/A' },
    { label: 'Joining Date', value: employee.joining_date },
    { label: 'Email', value: employee.email },
    { label: 'Phone', value: employee.phone ?? 'N/A' },
  ];

  return (
    <AppLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Link href={route('employees.index')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
            <ArrowLeft size={16} /> Back to Employees
          </Link>
          <Link href={route('employees.edit', employee.id)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            <Pencil size={15} /> Edit
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
              {employee.full_name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{employee.full_name}</h1>
              <p className="text-gray-500 text-sm">{employee.employee_code}</p>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-6">
            {fields.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </AppLayout>
  );
}
