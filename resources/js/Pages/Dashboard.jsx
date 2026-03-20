import AppLayout from '@/Layouts/AppLayout';
import { Building2, Users, UserCog } from 'lucide-react';

export default function Dashboard({ departmentCount, managerCount, employeeCount }) {
  const stats = [
    { label: 'Total Departments', value: departmentCount, icon: Building2, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Managers',    value: managerCount,    icon: UserCog,   color: 'bg-green-50 text-green-600' },
    { label: 'Total Employees',   value: employeeCount,   icon: Users,     color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here is your overview.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={22}/>
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="text-xl font-bold text-gray-700 mb-2">Welcome to EmpManager!</h2>
        <p className="text-gray-500 text-sm">Use the sidebar to manage Departments, Managers and Employees.</p>
      </div>
    </AppLayout>
  );
}
