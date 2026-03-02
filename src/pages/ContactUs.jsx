export default function ContactUs() {
    return (
        <div className="flex-1 bg-slate-50 py-20 px-4 min-h-[calc(100vh-80px)]">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Contact Us
                    </h1>
                    <p className="text-lg text-slate-600">
                        Have questions or need support? Send us a message and we'll get back to you shortly.
                    </p>
                </div>

                <div className="clean-panel p-8">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-900">First Name</label>
                                <input type="text" className="clean-input" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-900">Last Name</label>
                                <input type="text" className="clean-input" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-900">Email Address</label>
                            <input type="email" className="clean-input" placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-900">Message</label>
                            <textarea
                                className="clean-input min-h-[120px] resize-y"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button type="button" className="clean-button w-full relative group overflow-hidden">
                            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">Send Message</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
