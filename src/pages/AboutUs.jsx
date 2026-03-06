import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Icons 
const FiTarget = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>);
const FiEye = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const FiGithub = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>);
const FiLinkedin = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);

const ScrollReveal = ({ children, delay = 0, duration = "duration-[1000ms]", className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (domRef.current) observer.unobserve(domRef.current);
                }
            });
        }, { threshold: 0.1 });

        const currentRef = domRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all ${duration} ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default function AboutUs() {
    return (
        <div className="flex-1 bg-slate-50 min-h-screen">
            {/* HERO SECTION */}
            <section className="relative w-full overflow-hidden border-b border-slate-200 bg-white min-h-[50vh] flex items-center justify-center pt-16 hover:bg-slate-50/30 transition-colors duration-700">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 relative z-0"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-50 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="max-w-4xl mx-auto relative z-10 text-center animate-slide-up px-6">
                    <div className="inline-flex items-center px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase text-slate-500 bg-slate-100 border border-slate-200 rounded-full shadow-sm">
                        Who We Are
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
                        Revolutionizing <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">
                            Academic Workflow.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                        We are dedicated to bridging the gap between students and educators by providing a seamless, modern platform for assignment management.
                    </p>
                </div>
            </section>

            {/* MISSION & VISION */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <ScrollReveal delay={100} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_8px_32px_0_rgba(79,70,229,0.15)] group-hover:border-indigo-200/50 z-0"></div>
                        <div className="relative z-10 p-10 text-left h-full">
                            <div className="w-16 h-16 bg-white/80 backdrop-blur-sm shadow-sm text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                <FiTarget className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Our mission is to empower educational institutions with the tools they need to function efficiently.
                                By centralizing submissions, grading, and coursework access, we strive to remove administrative
                                friction and let teachers focus on what matters most: teaching.
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_8px_32px_0_rgba(14,165,233,0.15)] group-hover:border-sky-200/50 z-0"></div>
                        <div className="relative z-10 p-10 text-left h-full">
                            <div className="w-16 h-16 bg-white/80 backdrop-blur-sm shadow-sm text-sky-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sky-500 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                                <FiEye className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We envision a future where every student has immediate, clear access to their academic requirements,
                                and every educator can manage their classrooms with zero technical overhead. We want to be the default digital desk.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* OUR TEAM */}
            <section className="w-full bg-white py-24 border-y border-slate-200">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet the Developers</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            The passionate engineers behind the Student Assignment Portal.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {
                            [
                                {
                                    name: "Abhishek Nanaware", role: "Developer | CSE AIML", initial: "A",
                                    gradient: "from-blue-500 to-indigo-600",
                                    iconColor: "text-indigo-600",
                                    shadow: "hover:shadow-indigo-500/20"
                                },
                                {
                                    name: "Harsh Khairnar", role: "Developer | CSE AIML", initial: "H",
                                    gradient: "from-emerald-400 to-teal-600",
                                    iconColor: "text-teal-600",
                                    shadow: "hover:shadow-teal-500/20"
                                },
                                {
                                    name: "Ashish Rohada", role: "Developer | CSE AIML", initial: "A",
                                    gradient: "from-rose-400 to-pink-600",
                                    iconColor: "text-pink-600",
                                    shadow: "hover:shadow-pink-500/20"
                                }
                            ].map((dev, idx) => (
                                <ScrollReveal key={idx} delay={idx * 300} duration="duration-[1500ms]" className="h-full">
                                    <div className={`h-full clean-panel overflow-hidden group border border-slate-100 transition-all duration-500 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-3 rounded-2xl ${dev.shadow}`}>
                                        <div className="h-32 relative z-20">
                                            {/* Background gradient and pattern wrapper with hidden overflow */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${dev.gradient} overflow-hidden`}>
                                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay transition-transform duration-700 group-hover:scale-110"></div>
                                                <div className="absolute inset-0 bg-black/10 z-0 group-hover:bg-transparent transition-colors duration-500"></div>
                                            </div>

                                            {/* Image Placeholder (placed outside the hidden overflow, centered on the bottom edge) */}
                                            <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 z-20">
                                                <div className={`w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-extrabold shadow-xl ${dev.iconColor} group-hover:scale-110 transition-transform duration-500 border-4 border-white`}>
                                                    {dev.initial}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8 pt-20 text-center relative z-10 bg-white">
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{dev.name}</h3>
                                            <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${dev.iconColor}`}>{dev.role}</p>
                                            <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">Passionate about building scalable web applications and intuitive user interfaces.</p>
                                            <div className="flex justify-center gap-4">
                                                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-600 hover:text-white hover:bg-slate-900 hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-md">
                                                    <FiGithub className="w-5 h-5" />
                                                </a>
                                                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-600 hover:text-white hover:bg-[#0077b5] hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-md">
                                                    <FiLinkedin className="w-5 h-5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* TIMELINE / HISTORY */}
            <section className="py-24 px-4 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Journey</h2>
                </div>
                <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-12">
                    {[
                        { year: "Phase 1", title: "Project Inception", desc: "Recognized the friction in traditional assignment submission methods and began planning a centralized, modern solution using the MERN stack.", color: "bg-blue-500", text: "text-blue-600", shadow: "group-hover:shadow-blue-500/30", border: "group-hover:border-blue-300" },
                        { year: "Phase 2", title: "Core Architecture & Backend", desc: "Developed the core architecture, establishing secure REST APIs, role-based access control, and robust database models.", color: "bg-indigo-500", text: "text-indigo-600", shadow: "group-hover:shadow-indigo-500/30", border: "group-hover:border-indigo-300" },
                        { year: "Phase 3", title: "Frontend Implementation", desc: "Built a responsive, distraction-free UI utilizing React and Tailwind CSS, focusing on a clean, professional aesthetic for students and teachers.", color: "bg-purple-500", text: "text-purple-600", shadow: "group-hover:shadow-purple-500/30", border: "group-hover:border-purple-300" },
                        { year: "Phase 4", title: "Integration & Testing", desc: "Connected the front-end to our secure backend, implementing full document handling capabilities and conducting rigorous end-to-end testing.", color: "bg-emerald-500", text: "text-emerald-600", shadow: "group-hover:shadow-emerald-500/30", border: "group-hover:border-emerald-300" }
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 150} className="relative pl-8 md:pl-12 group">
                            <div className={`absolute top-1 -left-[9px] w-4 h-4 rounded-full ${item.color} ring-4 ring-white group-hover:scale-150 transition-all duration-500 shadow-md ${item.shadow} z-10`}></div>
                            <span className={`text-sm font-extrabold tracking-widest uppercase mb-2 block ${item.text}`}>{item.year}</span>
                            <div className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 ${item.border}`}>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="pb-24 px-4 overflow-hidden relative">
                <ScrollReveal className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl shadow-indigo-900/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-sky-900/40 opacity-50 relative z-0"></div>

                    {/* Glowing effect inside CTA */}
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-40 group-hover:scale-150 group-hover:opacity-60 transition-all duration-700 pointer-events-none"></div>
                    <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-sky-500 rounded-full blur-[100px] opacity-40 group-hover:scale-150 group-hover:opacity-60 transition-all duration-700 pointer-events-none"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Join Our Community</h2>
                        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">Experience the platform designed for academic excellence. Ready to streamline your coursework?</p>
                        <Link to="/signup" className="inline-flex items-center justify-center bg-white text-slate-900 font-bold px-8 py-4 rounded-lg hover:bg-slate-50 hover:scale-105 hover:shadow-xl hover:shadow-white/10 transition-all duration-300">
                            Sign up today
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
