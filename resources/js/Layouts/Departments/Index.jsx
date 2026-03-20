import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

export default function DepartmentsIndex({ departments }) {
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { data, setData, post, put, errors, reset, processing } = useForm({ name: '' });

    const openAdd = () => { setEditing(null); reset(); setShowForm(true); };
    const openEdit = (dept) => { setEditing(dept); setData('name', dept.name); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditing(null); reset(); };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('departments.update', editing.id), { onSuccess: closeForm });
        } else {
            post(route('departments.store'), { onSuccess: closeForm });
        }
    };

    const { delete: destroy } = useForm();
    const confirmDelete = () => {
        destroy(route('departments.destroy', deleteId), { onSuccess: () => setDeleteId(null) });
    };

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
                <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                    <Plus size={16} /> Add Department
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {departments.map((dept) => (
                            <tr key={dept.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-800">{dept.name}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => openEdit(dept)} className="text-blue-600 hover:text-blue-800"><Pencil size={15} /></button>
                                    <button onClick={() => setDeleteId(dept.id)} className="text-red-500 hover:text-red-700"><Trash2 size={15} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Drawer */}
            {showForm && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-96 p-6">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-bold">{editing ? 'Edit Department' : 'Add Department'}</h2>
                            <button onClick={closeForm}><X size={18} className="text-gray-500" /></button>
                        </div>
                        <form onSubmit={submit}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                            <input
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Sales"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            <div className="flex gap-3 mt-5">
                                <button type="button" onClick={closeForm} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm">Cancel</button>
                                <button type="submit" disabled={processing} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm hover:bg-blue-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center">
                        <p className="text-gray-700 font-medium mb-4">Are you sure you want to delete this department?</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 border rounded-lg py-2 text-sm">Cancel</button>
                            <button onClick={confirmDelete} className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}