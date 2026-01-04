import { FaRocket } from 'react-icons/fa';
import { Link } from 'react-router';

const AppCTA = () => {
    return (
        <section className="py-24">
            <div className="relative overflow-hidden bg-primary rounded-[3rem] px-8 py-20 md:py-32 text-center group shadow-2xl shadow-primary/30">
                {/* Decorative Elements */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>

                <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl text-4xl text-white mb-4 animate-bounce">
                        <FaRocket />
                    </div>
                    
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight">
                        Ready to automate your <span className="italic opacity-80 underline decoration-white/40">utility life?</span>
                    </h2>
                    
                    <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Join thousands of households who have simplified their monthly bill management. Secure, fast, and completely free to start.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <Link 
                            to="/register" 
                            className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none rounded-2xl px-12 font-black shadow-xl "
                        >
                            Get Started Now
                        </Link>
                        <Link 
                            to="/about" 
                            className="btn btn-lg btn-outline border-white/30 text-white hover:bg-white/10 rounded-2xl px-12 font-black"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppCTA;
