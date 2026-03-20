import EmployeeForm from './EmployeeForm';
export default function Create({ departments, managers }) {
  return <EmployeeForm departments={departments} managers={managers} />;
}
