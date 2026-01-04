
const FAQ = () => {
    const faqs = [
        {
            q: "How secure is my payment data?",
            a: "We use standard SSL encryption and partner with certified payment gateways to ensure your data is always protected."
        },
        {
            q: "Can I pay bills for multiple properties?",
            a: "Yes! You can add multiple accounts and locations to your dashboard and manage everything from a single login."
        },
        {
            q: "Are there any hidden service charges?",
            a: "Transparency is our priority. Any processing fees are clearly displayed before you confirm your payment."
        },
        {
            q: "What utility providers are supported?",
            a: "We support over 50+ providers across electricity, gas, water, and internet categories nationwide."
        }
    ];

    return (
        <section className="py-24">
            <div className="grid lg:grid-cols-3 gap-16 items-start">
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter leading-none">
                        Got <span className="text-primary">Questions?</span>
                    </h2>
                    <p className="text-base-content/60 font-medium text-lg leading-relaxed">
                        Find quick answers to the most common questions about our platform and services.
                    </p>
                    <div className="pt-6">
                        <button className="btn btn-primary rounded-2xl px-8 shadow-xl shadow-primary/20">Contact Support</button>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="collapse collapse-plus bg-base-200/50 rounded-3xl border border-base-content/5 transition-all">
                            <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                            <div className="collapse-title text-xl font-black text-base-content py-6 px-8">
                                {faq.q}
                            </div>
                            <div className="collapse-content px-8 pb-6">
                                <p className="text-base-content/70 font-medium leading-relaxed bg-base-100/50 p-6 rounded-2xl border border-base-content/5">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
