import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera, FaEnvelope, FaIdBadge, FaMapMarkerAlt, FaSave, FaShieldAlt } from "react-icons/fa";
import instance from "../hook/useAxios";
import { AuthContext } from "../provider/AuthProvider";
import { uploadImage } from "../utils/imageUpload";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
        phone: user?.phone || "",
        bio: user?.bio || "Digital nomad managing utilities efficiently."
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            let photoURL = formData.photoURL;
            
            // Check if a new file was selected
            const fileInput = e.target.photo;
            if (fileInput && fileInput.files && fileInput.files[0]) {
                const uploadRes = await uploadImage(fileInput.files[0]);
                if (uploadRes.success) {
                    photoURL = uploadRes.data.display_url;
                }
            }

            await updateUserProfile({
                displayName: formData.displayName,
                photoURL: photoURL
            });
            
            // Also update in DB
            await instance.put("/users", {
                email: user?.email,
                name: formData.displayName,
                image: photoURL,
                phone: formData.phone,
                bio: formData.bio
            });

            toast.success("Profile Updated Globally! 🚀");
            setIsEditing(false);
            setFormData(prev => ({ ...prev, photoURL }));
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in text-base-content">
            {/* Profile Header Card */}
            <div className="bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden border border-base-content/5 relative">
                <div className="h-48 bg-linear-to-r from-primary to-secondary"></div>
                
                <div className="px-12 pb-12">
                    <div className="relative -mt-24 mb-6 inline-block">
                        <div className="w-40 h-40 rounded-[3rem] ring-8 ring-base-100 bg-base-100 overflow-hidden shadow-2xl">
                            <img src={user?.photoURL} alt="profile" className="w-full h-full object-cover" />
                        </div>
                        <button className="absolute bottom-2 right-2 w-10 h-10 rounded-2xl bg-base-100 shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                            <FaCamera />
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter">{user?.displayName}</h1>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="badge badge-primary bg-primary/10 text-primary border-none font-black text-[10px] uppercase py-3 px-4 rounded-xl">Verified {user?.role}</span>
                                <span className="text-base-content/40 text-sm font-medium flex items-center gap-2"><FaMapMarkerAlt /> Dhaka, Bangladesh</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className={`btn ${isEditing ? 'btn-ghost' : 'btn-primary'} rounded-2xl px-8 font-black shadow-xl`}
                        >
                            {isEditing ? "Cancel Edit" : "Edit Profile"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Account Details */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-content/5 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center"><FaEnvelope size={14}/></div>
                            <div>
                                <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest">Email Identity</p>
                                <p className="font-bold text-sm truncate">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-secondary/5 text-secondary flex items-center justify-center"><FaIdBadge size={14}/></div>
                            <div>
                                <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest">Account Type</p>
                                <p className="font-bold text-sm uppercase">{user?.role} Level 1</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><FaShieldAlt size={14}/></div>
                            <div>
                                <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest">Security Status</p>
                                <p className="font-bold text-sm">2FA Protected</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form or Info View */}
                <div className="lg:col-span-2">
                    <div className="bg-base-100 p-10 rounded-[3rem] shadow-xl border border-base-content/5 h-full">
                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1">Full Identity Name</label>
                                    <input 
                                        type="text" 
                                        className="input bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
                                        value={formData.displayName}
                                        onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1">Identity Frame (Upload)</label>
                                    <input 
                                        type="file" 
                                        name="photo"
                                        className="file-input file-input-bordered file-input-primary w-full bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div className="md:col-span-2 form-control">
                                    <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1">Profile Bio (Public)</label>
                                    <textarea 
                                        className="textarea bg-base-200 border-none rounded-2xl h-32 focus:ring-2 focus:ring-primary/20"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <button type="submit" className="btn btn-primary w-full rounded-2xl py-4 h-auto font-black shadow-xl shadow-primary/20">
                                        <FaSave className="mr-2" /> Commit Profile Updates
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-8">
                                <h3 className="text-xl font-black tracking-tighter border-b border-base-content/5 pb-6">Personal Dossier</h3>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div>
                                        <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest mb-1">Display Name</p>
                                        <p className="text-lg font-bold">{user?.displayName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest mb-1">Mobile Contact</p>
                                        <p className="text-lg font-bold">{user?.phone || "Not Registered"}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest mb-1">Bio</p>
                                        <p className="text-base-content/60 font-medium leading-relaxed">{formData.bio}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
