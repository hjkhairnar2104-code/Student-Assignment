import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useTilt from "../hooks/useTilt";

// Icons 
const FiTarget = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>);
const FiEye = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const FiGithub = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>);
const FiLinkedin = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);

const ScrollReveal = ({ children, delay = 0, duration = "duration-[1000ms]", className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: delay / 1000 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function AboutUs() {
    return (
        <div className="flex-1 bg-transparent min-h-screen">
            {/* HERO SECTION */}
            <section className="relative w-full overflow-hidden border-b border-white/10 bg-transparent min-h-[50vh] flex items-center justify-center pt-16">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.07)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 relative z-0" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl opacity-60 -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl opacity-60 -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

                <div className="max-w-4xl mx-auto relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 rounded-full shadow-sm"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        Who We Are
                    </motion.div>
                    <motion.h1
                        initial="hidden" animate="visible"
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight"
                    >
                        {["Revolutionizing", "Academic", "Workflow."].map((w, i) => (
                            <motion.span
                                key={i}
                                className={`inline-block mr-[0.3em] ${i === 0 ? "text-white" : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"}`}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 22 } } }}
                            >{w}</motion.span>
                        ))}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                        className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        We are dedicated to bridging the gap between students and educators by providing a seamless, modern platform for assignment management.
                    </motion.p>
                </div>
            </section>

            {/* MISSION & VISION */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <ScrollReveal delay={100} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_8px_32px_0_rgba(79,70,229,0.25)] group-hover:border-indigo-500/30 z-0" />
                        <div className="relative z-10 p-10 text-left h-full">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm shadow-sm text-indigo-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                <FiTarget className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                Our mission is to empower educational institutions with the tools they need to function efficiently.
                                By centralizing submissions, grading, and coursework access, we strive to remove administrative
                                friction and let teachers focus on what matters most: teaching.
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_8px_32px_0_rgba(14,165,233,0.25)] group-hover:border-sky-500/30 z-0" />
                        <div className="relative z-10 p-10 text-left h-full">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm shadow-sm text-sky-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sky-500 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                <FiEye className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                We envision a future where every student has immediate, clear access to their academic requirements,
                                and every educator can manage their classrooms with zero technical overhead. We want to be the default digital desk.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* OUR TEAM */}
            <section className="w-full bg-white/[0.03] backdrop-blur-sm py-24 border-y border-white/10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Meet the Developers</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
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
                                <TiltDevCard key={idx} dev={dev} delay={idx * 150} />
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* TIMELINE / HISTORY */}
            <section className="py-24 px-4 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
                </div>
                <div className="relative border-l-2 border-white/10 ml-3 md:ml-6 space-y-12">
                    {[
                        { year: "Phase 1", title: "Project Inception", desc: "Recognized the friction in traditional assignment submission methods and began planning a centralized, modern solution using the MERN stack.", color: "bg-blue-500", text: "text-blue-600", shadow: "group-hover:shadow-blue-500/30", border: "group-hover:border-blue-300" },
                        { year: "Phase 2", title: "Core Architecture & Backend", desc: "Developed the core architecture, establishing secure REST APIs, role-based access control, and robust database models.", color: "bg-indigo-500", text: "text-indigo-600", shadow: "group-hover:shadow-indigo-500/30", border: "group-hover:border-indigo-300" },
                        { year: "Phase 3", title: "Frontend Implementation", desc: "Built a responsive, distraction-free UI utilizing React and Tailwind CSS, focusing on a clean, professional aesthetic for students and teachers.", color: "bg-purple-500", text: "text-purple-600", shadow: "group-hover:shadow-purple-500/30", border: "group-hover:border-purple-300" },
                        { year: "Phase 4", title: "Integration & Testing", desc: "Connected the front-end to our secure backend, implementing full document handling capabilities and conducting rigorous end-to-end testing.", color: "bg-emerald-500", text: "text-emerald-600", shadow: "group-hover:shadow-emerald-500/30", border: "group-hover:border-emerald-300" }
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 150} className="relative pl-8 md:pl-12 group">
                            <div className={`absolute top-1 -left-[9px] w-4 h-4 rounded-full ${item.color} ring-4 ring-[#0a0a1b] group-hover:scale-150 transition-all duration-500 shadow-md ${item.shadow} z-10`} />
                            <span className={`text-sm font-extrabold tracking-widest uppercase mb-2 block ${item.text}`}>{item.year}</span>
                            <div className={`bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 ${item.border}`}>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
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
                        <Link to="/signup" className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300">
                            Sign up today
                            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}

/* ── 3D Tilt Developer Card ──────────────────────────────────────── */
function TiltDevCard({ dev, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 180, damping: 20, delay: delay / 1000 }}
            className="h-full"
        >
            <div className={`h-full bg-slate-900/40 backdrop-blur-2xl overflow-hidden group border border-white/10 rounded-[2rem] ${dev.shadow} transition-all duration-500 hover:border-white/20 hover:-translate-y-1 shadow-2xl shadow-black/30`}>
                <div className="h-40 relative z-20">
                    <div className={`absolute inset-0 bg-gradient-to-br ${dev.gradient} opacity-80 overflow-hidden`}>
                        <div className="absolute inset-0 opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    </div>
                    <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 z-20">
                        <div className={`w-28 h-28 rounded-3xl bg-[#0a0a1b] flex items-center justify-center text-5xl font-extrabold shadow-2xl ${dev.iconColor} group-hover:scale-105 transition-all duration-500 border-4 border-white/10 shadow-black/50`}>
                            {dev.initial}
                        </div>
                    </div>
                </div>
                <div className="p-10 pt-20 text-center relative z-10 bg-transparent">
                    <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">{dev.name}</h3>
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${dev.iconColor}`}>{dev.role}</p>
                    </div>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                        Passionate about building scalable web applications and intuitive student-focused interfaces.
                    </p>
                    <div className="flex justify-center gap-5">
                        <motion.a 
                            href="#" 
                            whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.15)" }}
                            className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 shadow-lg shadow-black/20"
                        >
                            <FiGithub className="w-5 h-5" />
                        </motion.a>
                        <motion.a 
                            href="#" 
                            whileHover={{ y: -3, scale: 1.05 }}
                            className={`w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-lg shadow-black/20`}
                        >
                            <FiLinkedin className="w-5 h-5" />
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
