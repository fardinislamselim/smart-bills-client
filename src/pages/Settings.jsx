import { useState } from "react";
import toast from "react-hot-toast";
import { FaBell, FaShieldAlt } from "react-icons/fa";

const Settings = () => {
    const [emailNotif, setEmailNotif] = useState(true);
    const [mfa, setMfa] = useState(false);

    const handleSave = () => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 800)),
            {
                loading: 'Syncing preferences...',
                success: 'Configurations saved successfully! ⚙️',
                error: 'Failed to sync preferences.'
            }
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in text-base-content">
            <header className="space-y-2">
                <h1 className="text-4xl font-black tracking-tighter">System Preferences</h1>
                <p className="text-base-content/40 font-medium">Configure your personal experience and security parameters</p>
            </header>

            <div className="grid gap-8">
                {/* Security Section */}
                <section className="bg-base-100 p-10 rounded-[3rem] shadow-xl border border-base-content/5 space-y-8">
                    <h2 className="text-xl font-black flex items-center gap-3">
                        <div className="p-2 bg-secondary/10 text-secondary rounded-xl"><FaShieldAlt /></div>
                        Identity & Security
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 bg-base-200/50 rounded-2xl border border-base-content/5">
                            <div className="space-y-1">
                                <p className="font-bold">Multi-Factor Authentication</p>
                                <p className="text-xs text-base-content/40">Add an extra layer of security to your account.</p>
                            </div>
                            <input 
                                type="checkbox" 
                                className="toggle toggle-primary" 
                                checked={mfa}
                                onChange={() => setMfa(!mfa)}
                            />
                        </div>
                        <div className="flex items-center justify-between p-6 bg-base-200/50 rounded-2xl border border-base-content/5">
                            <div className="space-y-1">
                                <p className="font-bold">Login Session Persistence</p>
                                <p className="text-xs text-base-content/40">Keep you logged in for 30 days on this device.</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>
                    </div>
                </section>

                {/* Notifications Section */}
                <section className="bg-base-100 p-10 rounded-[3rem] shadow-xl border border-base-content/5 space-y-8">
                    <h2 className="text-xl font-black flex items-center gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-xl"><FaBell /></div>
                        Engagement Alerts
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold">Settlement Receipts</p>
                                <p className="text-xs text-base-content/40 leading-none mt-1">Receive email copies of all paid utilities.</p>
                            </div>
                            <input 
                                type="checkbox" 
                                className="toggle toggle-primary"
                                checked={emailNotif}
                                onChange={() => setEmailNotif(!emailNotif)}
                            />
                        </div>
                        <div className="divider opacity-5"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold">Provider Outage Alerts</p>
                                <p className="text-xs text-base-content/40 leading-none mt-1">Get notified about maintenance schedules.</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" />
                        </div>
                    </div>
                </section>

                <div className="pt-6">
                    <button 
                        onClick={handleSave}
                        className="btn btn-primary btn-lg w-full rounded-2xl shadow-2xl shadow-primary/20 font-black h-auto py-5 uppercase tracking-widest text-sm"
                    >
                        Commit Configuration Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
