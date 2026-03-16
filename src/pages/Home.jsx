import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { animated } from "@react-spring/web";
import useTilt from "../hooks/useTilt";
import useMagnetic from "../hooks/useMagnetic";
import RippleButton from "../components/RippleButton";

/* ── Animated counter ───────────────────────────────────── */
function AnimatedNumber({ to, suffix = "", duration = 1.8 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v));
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (!inView) return;
        const controls = animate(count, to, { duration, ease: "easeOut" });
        const unsub = rounded.on("change", (v) => setDisplay(v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)));
        return () => { controls.stop(); unsub(); };
    }, [inView, to, duration, count, rounded]);

    return <span ref={ref}>{display}{suffix}</span>;
}

// Clean, simple SVGs
const FiClock = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const FiArrowRight = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const FiBookOpen = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>);
const FiCheckCircle = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>);
const FiShield = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const FiUsers = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
const FiTrendingUp = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>);
const FiLayers = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>);
const FiArchive = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect> <line x1="10" y1="12" x2="14" y2="12"></line></svg>);
const FiGlobe = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);
const FiZap = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const FiAward = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>);
const FiCpu = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>);

const ScrollReveal = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: delay / 1000 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function Home() {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="min-h-[calc(100vh-80px)] bg-transparent text-slate-900 flex flex-col items-center">

            {/* ===== HERO SECTION ===== */}
            <section className="relative w-full overflow-hidden min-h-[92vh] flex items-center">
                {/* Bottom fade into next section */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1b]/40 to-transparent z-10 pointer-events-none" />

                <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* ── LEFT: Text Content ── */}
                        <div className="text-left">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 rounded-full shadow-sm"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                Student Assignment Portal
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } }
                                }}
                            >
                                {["Manage", "assignments", "with", "maximum", "clarity"].map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className={`inline-block mr-[0.3em] ${i === 2 ? '' : ''} ${i >= 3 ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600' : ''}`}
                                        variants={{
                                            hidden: { opacity: 0, y: 40 },
                                            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 22 } }
                                        }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            {/* Subtext */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55, duration: 0.5 }}
                                className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg"
                            >
                                A modern platform connecting educators and students. Streamline submissions, track progress, and improve grading turnaround — in one clean workspace.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.75, duration: 0.4 }}
                                className="flex flex-col sm:flex-row items-start gap-4 mb-12"
                            >
                                <MagneticCTA to="/signup" />

                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    <Link
                                        to="/aboutus"
                                        className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-medium text-slate-700 bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl hover:border-indigo-200 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                                    >
                                        Learn More
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Animated Stats */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="flex flex-wrap items-center gap-8"
                            >
                                {[
                                    { label: "Students", to: 500, suffix: "+" },
                                    { label: "Assignments", to: 2000, suffix: "+" },
                                    { label: "Educators", to: 50, suffix: "+" },
                                ].map(({ label, to, suffix }) => (
                                    <div key={label} className="flex flex-col">
                                        <span className="text-3xl font-extrabold text-white leading-none">
                                            <AnimatedNumber to={to} suffix={suffix} />
                                        </span>
                                        <span className="text-xs font-medium text-slate-400 mt-0.5 uppercase tracking-wider">{label}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* ── RIGHT: Animated Dashboard Mockup ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="hidden lg:flex flex-col gap-4 relative"
                        >
                            {/* Glow behind mockup */}
                            <div className="absolute inset-0 -m-8 bg-gradient-to-br from-indigo-200/40 via-violet-200/30 to-sky-200/20 rounded-3xl blur-2xl" />

                            {/* Main card */}
                            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40 p-6 overflow-hidden">
                                {/* Card header */}
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-0.5">My Assignments</p>
                                        <h3 className="text-lg font-bold text-white">This Week</h3>
                                    </div>
                                    <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">V</div>
                                </div>

                                {/* Assignment list */}
                                <div className="space-y-3">
                                    {[
                                        { title: "Data Structures — Lab Report", subject: "CSE 301", due: "Due today", status: "pending", color: "orange" },
                                        { title: "Machine Learning Assignment 2", subject: "AIML 401", due: "Due tomorrow", status: "done", color: "green" },
                                        { title: "Operating Systems Quiz", subject: "CSE 302", due: "Due in 3 days", status: "done", color: "green" },
                                        { title: "Database Normalization Task", subject: "CSE 303", due: "Due in 5 days", status: "pending", color: "indigo" },
                                    ].map((a, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 + i * 0.1 }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/30 transition-all duration-200 group"
                                        >
                                            {/* Status icon */}
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${a.status === 'done' ? 'bg-emerald-100 text-emerald-600' : a.color === 'orange' ? 'bg-orange-100 text-orange-500' : 'bg-indigo-100 text-indigo-600'}`}>
                                                {a.status === 'done' ? (
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /><circle cx="12" cy="12" r="9" /></svg>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-200 truncate group-hover:text-indigo-400 transition-colors">{a.title}</p>
                                                <p className="text-xs text-slate-500">{a.subject} · {a.due}</p>
                                            </div>
                                            <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.status === 'done' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-500'}`}>
                                                {a.status === 'done' ? 'Done' : 'Pending'}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Progress bar */}
                                <div className="mt-5 pt-4 border-t border-white/10">
                                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                                        <span className="font-medium">Weekly Progress</span>
                                        <span className="font-bold text-indigo-400">2 / 4 done</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "50%" }}
                                            transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Floating mini card — deadlines */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -right-6 -bottom-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl shadow-black/30 p-4 w-52"
                            >
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Grade Summary</p>
                                {[
                                    { sub: "AIML 401", grade: "A+", color: "text-emerald-600" },
                                    { sub: "CSE 301", grade: "B+", color: "text-indigo-600" },
                                ].map(({ sub, grade, color }) => (
                                    <div key={sub} className="flex justify-between items-center py-1">
                                        <span className="text-sm text-slate-400">{sub}</span>
                                        <span className={`text-sm font-extrabold ${color}`}>{grade}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section className="w-full py-24 bg-white/[0.03] backdrop-blur-sm border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
                            Everything you need to successfully submit and manage coursework in three simple steps.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Steps connection line */}
                        <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-white/10 -z-10" />

                        {[
                            {
                                step: "01",
                                icon: FiUsers,
                                title: "Register & Connect",
                                desc: "Sign up securely as a teacher or a student. Teachers can instantly start publishing courses and assignments."
                            },
                            {
                                step: "02",
                                icon: FiBookOpen,
                                title: "Manage Coursework",
                                desc: "Filter active coursework by year or semester. View pending deadlines and access required readings."
                            },
                            {
                                step: "03",
                                icon: FiTrendingUp,
                                title: "Track Progress",
                                desc: "Monitor your completion rates through dedicated dashboards that keep you focused on what's due."
                            }
                        ].map((item, idx) => (
                            <ScrollReveal key={idx} delay={idx * 150} className="relative group">
                                <div className="w-24 h-24 mx-auto bg-white/10 border-4 border-white/10 rounded-full flex items-center justify-center shadow-lg relative z-10 group-hover:border-indigo-500/30 transition-all duration-500 group-hover:scale-110">
                                    <item.icon className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors duration-300" />
                                </div>
                                <div className="mt-8 transition-all duration-300 group-hover:-translate-y-1">
                                    <span className="text-sm font-bold text-indigo-400 mb-2 block tracking-widest uppercase">Step {item.step}</span>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed px-4">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FEATURES / BENEFITS GRID ===== */}
            <section className="w-full bg-transparent py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <ScrollReveal className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose This Platform?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            We built this portal to eliminate the friction from university document submissions. Here is what makes it stand out.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Organized Workflows",
                                desc: "Keep all your coursework centralized. Filter by semesters, course years, and deadlines instantly.",
                                icon: FiLayers
                            },
                            {
                                title: "Verified Document System",
                                desc: "Ensure academic integrity. Teachers publish secure, timestamped PDFs that students can reliably access 24/7.",
                                icon: FiCheckCircle
                            },
                            {
                                title: "Strict Privacy",
                                desc: "Role-based authorization logic ensures that teacher administration privileges and student records remain completely isolated.",
                                icon: FiShield
                            },
                            {
                                title: "Accessible Design",
                                desc: "Built using clean, high-contrast aesthetics (inspired by modern design systems like Shadcn) that reduce eye-strain.",
                                icon: FiBookOpen
                            },
                            {
                                title: "Zero Distractions",
                                desc: "No ads, no complicated social feeds. Just a pure, focused environment meant entirely for academic production.",
                                icon: FiTrendingUp
                            },
                            {
                                title: "Always Fast",
                                desc: "Leveraging modern web architecture so that the portal loads instantly whether you are on campus or at home.",
                                icon: FiClock
                            }
                        ].map((feature, idx) => (
                            <TiltFeatureCard key={idx} feature={feature} delay={idx * 100} />
                        ))}
                    </div>
                </div>
            </section>
            {/* ===== TRUSTED BY INSTITUTIONS ===== */}
            <section className="w-full pb-24 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <FiArchive className="w-32 h-32 text-white" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">Designed for Academic Excellence.</h2>
                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    StudyStash isn't just a file storage; it's a dedicated workspace built to foster communication between students and their mentors.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Automated Deadline Notifications",
                                        "Secure PDF Content Delivery",
                                        "Teacher-Student Feedback Loops",
                                        "Consolidated Academic Progress"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                                            <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                                <FiCheckCircle className="w-3 h-3 text-indigo-400" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "On-Time Deliveries", val: "99.8%", icon: FiZap },
                                    { label: "Digital Artifacts", val: "850k+", icon: FiLayers },
                                    { label: "Verified Faculty", val: "1.2k+", icon: FiUsers },
                                    { label: "Uptime SLA", val: "99.9%", icon: FiShield },
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group/stat">
                                        <div className="flex items-center gap-3 mb-2">
                                            <stat.icon className="w-4 h-4 text-indigo-400 opacity-50 group-hover/stat:opacity-100 transition-opacity" />
                                            <p className="text-2xl font-black text-white">{stat.val}</p>
                                        </div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS SECTION ===== */}
            <section className="w-full bg-transparent py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <ScrollReveal className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Don't just take our word for it. Here is what students and educators have to say about their experience.
                        </p>
                    </ScrollReveal>
                    <div className="relative overflow-hidden w-full flex align-center mt-12 py-4 group">
                        <div className="flex w-max animate-marquee gap-8 group-hover:[animation-play-state:paused] pr-8">
                            {[
                                {
                                    quote: "This platform completely organized my semester. I no longer miss deadlines and tracking my grades is easier than ever.",
                                    author: "Sarah Jenkins",
                                    role: "Computer Science Student",
                                    avatar: "SJ"
                                },
                                {
                                    quote: "As an educator, the ability to securely distribute materials and collect assignments in one place has saved me hours every week.",
                                    author: "Dr. Robert Chen",
                                    role: "Professor of Mathematics",
                                    avatar: "RC"
                                },
                                {
                                    quote: "The interface is so clean and distraction-free. It's exactly what I needed to stay focused on my actual coursework.",
                                    author: "Emily Rodriguez",
                                    role: "Literature Major",
                                    avatar: "ER"
                                },
                                {
                                    quote: "This platform completely organized my semester. I no longer miss deadlines and tracking my grades is easier than ever.",
                                    author: "Sarah Jenkins",
                                    role: "Computer Science Student",
                                    avatar: "SJ"
                                },
                                {
                                    quote: "As an educator, the ability to securely distribute materials and collect assignments in one place has saved me hours every week.",
                                    author: "Dr. Robert Chen",
                                    role: "Professor of Mathematics",
                                    avatar: "RC"
                                },
                                {
                                    quote: "The interface is so clean and distraction-free. It's exactly what I needed to stay focused on my actual coursework.",
                                    author: "Emily Rodriguez",
                                    role: "Literature Major",
                                    avatar: "ER"
                                }
                            ].map((testimonial, idx) => (
                                <motion.div
                                    key={idx}
                                    drag="x"
                                    dragConstraints={{ left: -100, right: 100 }}
                                    dragElastic={0.4}
                                    whileTap={{ cursor: "grabbing" }}
                                    className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 relative flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/20 hover:border-indigo-500/30 transition-all duration-300 w-[350px] md:w-[400px] shrink-0 whitespace-normal rounded-2xl cursor-grab z-10"
                                >
                                    <div className="text-indigo-300 mb-6 group-hover:text-indigo-500 transition-colors pointer-events-none">
                                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                            <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-300 italic flex-grow mb-6 leading-relaxed font-medium pointer-events-none">"{testimonial.quote}"</p>
                                    <div className="flex items-center gap-4 mt-auto pointer-events-none">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{testimonial.author}</h4>
                                            <span className="text-xs text-slate-400 font-medium">{testimonial.role}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FAQ SECTION ===== */}
            <section className="w-full py-24 bg-[#050510]/40 backdrop-blur-md border-t border-white/10 overflow-hidden">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
                    </ScrollReveal>
                    <div className="space-y-4 text-left">
                        {[
                            {
                                q: "Who is this application for?",
                                a: "This application is designed specifically for students and teachers of educational institutions looking for a streamlined, non-distracting way to assign and collect coursework."
                            },
                            {
                                q: "How do I view assignment PDFs?",
                                a: "Once you log into your Student Dashboard and locate your coursework, click the 'View Assignment' button on an assignment card. If your teacher attached a PDF, it will open directly in your browser."
                            },
                            {
                                q: "Can I use this on my mobile phone?",
                                a: "Absolutely. The clean aesthetic is entirely responsive, meaning you can manage your deadlines just as easily on a smartphone as on a desktop."
                            },
                            {
                                q: "Is this platform free to use?",
                                a: "Yes! The basic tier for students and educators is completely free, allowing you to manage courses and submit assignments without any hidden costs."
                            },
                            {
                                q: "Can teachers grade assignments directly on the platform?",
                                a: "Currently, educators can mark assignments as completed and provide written feedback. A fully integrated grading rubric system is planned for our next major update."
                            },
                            {
                                q: "How secure is my data?",
                                a: "We take your privacy seriously. All data is encrypted both in transit and at rest, and strict role-based access control guarantees that only authorized personnel can view your academic files."
                            }
                        ].map((faq, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div
                                    className={`bg-white/5 backdrop-blur-lg rounded-2xl border p-6 cursor-pointer transition-all duration-300 overflow-hidden ${openFaq === i ? 'border-indigo-500/50 shadow-lg shadow-indigo-900/20' : 'border-white/10 hover:border-white/20 hover:bg-white/10'}`}
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <div className="flex justify-between items-center w-full">
                                        <h4 className={`font-bold text-lg transition-colors duration-300 ${openFaq === i ? 'text-indigo-400' : 'text-slate-200'}`}>{faq.q}</h4>
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-indigo-500/20 text-indigo-400 rotate-180' : 'bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white'}`}>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={`transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                        <p className="text-slate-400 leading-relaxed border-t border-white/10 pt-4">{faq.a}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FINAL CTA BANNER ===== */}
            <section className="w-full pb-24 pt-12 px-6 relative z-10">
                <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 text-center border border-white/10 shadow-2xl">
                    {/* Dark/Aurora Background */}
                    <div className="absolute inset-0 bg-[#070714] -z-20" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent -z-10" />
                    
                    {/* Animated Mesh Gradients */}
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
                    
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                            Ready to Transform Your <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Academic Workflow?</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Join thousands of students and educators already using our platform to simplify their coursework management.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all border border-indigo-500"
                                >
                                    Sign Up as Teacher
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-slate-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg"
                                >
                                    Sign Up as Student
                                </Link>
                            </motion.div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </div>
    );
}

/* ── Magnetic CTA button ──────────────────────────────────────────── */
function MagneticCTA({ to }) {
    const { ref, style, handlers } = useMagnetic(0.28);
    return (
        <animated.div ref={ref} style={style} {...handlers}>
            <RippleButton
                as={Link}
                to={to}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
            >
                Get Started Free
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </RippleButton>
        </animated.div>
    );
}

/* ── 3D Tilt Feature Card ─────────────────────────────────────────── */
function TiltFeatureCard({ feature, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: delay / 1000 }}
            className="relative group"
        >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 group-hover:shadow-[0_20px_48px_0_rgba(79,70,229,0.25)] group-hover:border-indigo-500/50 z-0" />
            {/* Neon glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1.5px rgba(99,102,241,0.4), 0 0 32px -4px rgba(99,102,241,0.3)" }} />
            <div className="relative z-10 p-8 text-left">
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                    <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </div>
        </motion.div>
    );
}
