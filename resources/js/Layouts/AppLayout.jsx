import { Link, usePage } from '@inertiajs/react';
import { Building2, Users, UserCog, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { name: 'dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { name: 'departments.index', label: 'Departments', icon: Building2 },
  { name: 'managers.index',    label: 'Managers',    icon: UserCog },
  { name: 'employees.index',   label: 'Employees',   icon: Users },
];

export default function AppLayout({ children }) {
  const { url } = usePage();
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">EmpManager</h1>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navLinks.map(({ name, label, icon: Icon }) => (
            <Link
              key={name}
              href={route(name)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${url.startsWith('/' + name.split('.')[0])
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Employee Management</h2>
          <Link href={route('logout')} method="post" as="button" className="text-sm text-red-500 hover:text-red-700">Logout</Link>
        </header>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
