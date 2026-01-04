import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 md:px-8 py-8 lg:py-12">
                <div className="animate-in fade-in duration-700">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;