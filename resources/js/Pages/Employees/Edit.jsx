import EmployeeForm from './EmployeeForm';
export default function Edit({ employee, departments, managers }) {
  return <EmployeeForm employee={employee} departments={departments} managers={managers} isEdit={true} />;
}
