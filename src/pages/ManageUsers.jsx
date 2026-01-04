import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaUserShield } from "react-icons/fa";
import instance from "../hook/useAxios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await instance.get("/admin/all-users");
            setUsers(data || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch identities.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleRole = async (user) => {
        const newRole = user.role === "admin" ? "user" : "admin";
        toast.promise(
            instance.patch(`/users/role/${user.email}`, { role: newRole }),
            {
                loading: 'Updating access level...',
                success: `${user.name} is now a ${newRole}!`,
                error: 'Authorization upgrade failed.'
            }
        );
        setUsers(users.map(u => u.email === user.email ? {...u, role: newRole} : u));
    };

    return (
        <div className="space-y-8 animate-fade-in text-base-content">
            <div>
                <h1 className="text-3xl font-black tracking-tighter">Identity Management</h1>
                <p className="text-base-content/40 font-medium">Control platform access and provision administrator privileges</p>
            </div>

            <div className="bg-base-100 rounded-[3rem] shadow-xl border border-base-content/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="border-b border-base-content/5 text-base-content/30 uppercase text-[10px] font-black tracking-widest leading-none">
                                <th className="px-8 py-6">Identity</th>
                                <th className="py-6">Email</th>
                                <th className="py-6">Role Status</th>
                                <th className="py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="hover:bg-primary/5 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-base-200 overflow-hidden shadow-sm ring-2 ring-primary/10">
                                                <img src={u.image} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-black text-base-content">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 font-medium text-base-content/60 italic">{u.email}</td>
                                    <td className="py-6">
                                        <div className={`badge h-auto py-2 px-4 rounded-xl border-none font-black text-[10px] uppercase gap-2 ${u.role === 'admin' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
                                            <FaUserShield /> {u.role}
                                        </div>
                                    </td>
                                    <td className="py-6 text-right px-8">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => toggleRole(u)}
                                                className="btn btn-sm rounded-xl font-black text-[10px] uppercase border-none bg-base-200 hover:bg-primary hover:text-white transition-all"
                                            >
                                                Switch to {u.role === 'admin' ? 'User' : 'Admin'}
                                            </button>
                                            <button className="btn btn-sm btn-square btn-ghost rounded-xl text-error hover:bg-error/10">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
