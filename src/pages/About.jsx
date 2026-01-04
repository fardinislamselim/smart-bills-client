import { FaEye, FaGlobe, FaHandshake, FaUsers } from "react-icons/fa";

const About = () => {
  const values = [
    {
      icon: <FaUsers />,
      title: "User Centric",
      description: "Everything we build starts with the user needs and comfort in mind."
    },
    {
      icon: <FaEye />,
      title: "Transparency",
      description: "No hidden fees, no complex terms. Just honest utility management."
    },
    {
      icon: <FaHandshake />,
      title: "Reliability",
      description: "Partnering with verified providers to ensure your payments always arrive."
    },
    {
      icon: <FaGlobe />,
      title: "Nationwide",
      description: "Expanding our services to reach every corner of the country."
    }
  ];

  return (
    <div className="space-y-24 py-12 md:py-24 animate-fade-in text-base-content">
      <title>About Us | SmartBill</title>

      <section className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-black uppercase tracking-widest">
            Our Journey
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            Digitalizing the <span className="text-primary italic">Bill Lifecycle</span>
          </h1>
          <p className="text-xl text-base-content/60 leading-relaxed font-medium">
            SmartBill was founded with a single mission: to remove the friction from mundane utility management. 
            We believe that paying for essentials like electricity, water, and internet should be as simple as sending a text.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="bg-base-100 px-8 py-6 rounded-[2rem] border border-base-content/5 shadow-xl">
              <p className="text-3xl font-black text-primary">50k+</p>
              <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Active Users</p>
            </div>
            <div className="bg-base-100 px-8 py-6 rounded-[2rem] border border-base-content/5 shadow-xl">
              <p className="text-3xl font-black text-secondary">৳100M+</p>
              <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Processed</p>
            </div>
          </div>
        </div>
        <div className="relative group">
           <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all"></div>
           <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
            alt="Team" 
            className="relative z-10 w-full rounded-[3.5rem] shadow-2xl border-4 border-base-100"
           />
        </div>
      </section>

      <section className="bg-base-200/50 p-12 md:p-24 rounded-[4rem] border border-base-content/5">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic text-base-content">
            Guided by <span className="text-primary">Values</span>
          </h2>
          <p className="text-base-content/60 font-medium text-lg max-w-2xl mx-auto">
            Our core principles drive every feature we release and every partnership we form.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-base-content">
          {values.map((v, i) => (
            <div key={i} className="bg-base-100 p-10 rounded-[2.5rem] shadow-xl border border-base-content/5 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl text-primary mb-6 group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="text-xl font-black mb-3">{v.title}</h3>
              <p className="text-sm text-base-content/60 font-medium leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
