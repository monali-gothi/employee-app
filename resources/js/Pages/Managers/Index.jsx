import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

export default function ManagersIndex({ managers, departments }) {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { data, setData, post, put, errors, reset, processing } = useForm({ name: '', department_id: '' });
  const { delete: destroy } = useForm();

  const openAdd  = () => { setEditing(null); reset(); setShowForm(true); };
  const openEdit = (m) => { setEditing(m); setData({ name: m.name, department_id: m.department_id }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); reset(); };

  const submit = (e) => {
    e.preventDefault();
    editing
      ? put(route('managers.update', editing.id), { onSuccess: closeForm })
      : post(route('managers.store'), { onSuccess: closeForm });
  };

  const doDelete = () => {
    destroy(route('managers.destroy', deleteId), { onSuccess: () => setDeleteId(null) });
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Managers</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          <Plus size={16}/> Add Manager
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {managers.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{m.name}</td>
                <td className="px-6 py-4 text-gray-500">{m.department?.name}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => openEdit(m)} className="text-blue-600"><Pencil size={15}/></button>
                  <button onClick={() => setDeleteId(m.id)} className="text-red-500"><Trash2 size={15}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-96 p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold">{editing ? 'Edit Manager' : 'Add Manager'}</h2>
              <button onClick={closeForm}><X size={18} className="text-gray-500"/></button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input value={data.name} onChange={e => setData('name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"/>
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select value={data.department_id} onChange={e => setData('department_id', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">Select Department</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                {errors.department_id && <p className="text-red-500 text-xs">{errors.department_id}</p>}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm">Cancel</button>
                <button type="submit" disabled={processing} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 text-center">
            <p className="text-gray-700 font-medium mb-4">Are you sure you want to delete this manager?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border rounded-lg py-2 text-sm">Cancel</button>
              <button onClick={doDelete} className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
