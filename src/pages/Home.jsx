import { Link } from "react-router-dom";

// Clean, simple SVGs
const FiClock = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const FiArrowRight = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const FiBookOpen = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>);
const FiCheckCircle = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>);
const FiShield = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const FiUsers = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
const FiTrendingUp = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>);
const FiLayers = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>);

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-slate-50 text-slate-900 flex flex-col items-center">

            {/* ===== HERO SECTION ===== */}
            <section className="relative w-full overflow-hidden border-b border-slate-200">
                {/* Subtle background pattern for hero */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 relative z-0"></div>

                <div className="w-full max-w-5xl mx-auto px-6 py-24 md:py-32 text-center relative z-10">
                    <div className="inline-flex items-center px-4 py-1.5 mb-8 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full shadow-sm animate-fade-in">
                        <span className="flex w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                        Welcome to the new Student Assignment Portal
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight animate-slide-up">
                        Manage assignments <br className="hidden md:block" /> with maximum clarity
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
                        A truly modern platform connecting educators and students.
                        Streamline document submissions, track progress, and improve grading turnaround in one clean workspace.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <Link
                            to="/signup"
                            className="clean-button text-base px-8 py-3.5 w-full sm:w-auto flex items-center justify-center shadow-lg shadow-slate-900/10 hover:-translate-y-0.5"
                        >
                            Get Started Free
                            <FiArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                        <Link
                            to="/aboutus"
                            className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-all hover:shadow-sm text-center"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS (STEP-BY-STEP) ===== */}
            <section className="w-full py-24 bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto mb-16 text-lg">
                        Everything you need to successfully submit and manage coursework in three simple steps.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Steps connection line */}
                        <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-slate-100 -z-10"></div>

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
                            <div key={idx} className="relative group">
                                <div className="w-24 h-24 mx-auto bg-white border-8 border-slate-50 rounded-full flex items-center justify-center shadow-sm relative z-10 group-hover:border-indigo-50 transition-colors duration-300">
                                    <item.icon className="w-8 h-8 text-slate-700 group-hover:text-indigo-600 transition-colors duration-300" />
                                </div>
                                <div className="mt-8">
                                    <span className="text-sm font-bold text-indigo-600 mb-2 block tracking-widest uppercase">Step {item.step}</span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed px-4">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FEATURES / BENEFITS GRID ===== */}
            <section className="w-full bg-slate-50 py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose This Platform?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            We built this portal to eliminate the friction from university document submissions. Here is what makes it stand out.
                        </p>
                    </div>

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
                            <div key={idx} className="clean-panel p-8 text-left group hover:border-indigo-200">
                                <div className="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-slate-100 text-slate-700 mb-6 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FAQ SECTION ===== */}
            <section className="w-full py-24 bg-white border-t border-slate-200">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Frequently Asked Questions</h2>
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
                            }
                        ].map((faq, i) => (
                            <div key={i} className="clean-panel p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-2">{faq.q}</h4>
                                <p className="text-slate-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATS SUMMARY STRIP ===== */}
            <section className="w-full border-t border-slate-200 bg-slate-900 mt-auto py-16">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
                    <div>
                        <div className="text-4xl font-black text-white">15k+</div>
                        <div className="text-sm text-slate-400 mt-2 font-medium">Active Students</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white">45k+</div>
                        <div className="text-sm text-slate-400 mt-2 font-medium">Assignments</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white">99%</div>
                        <div className="text-sm text-slate-400 mt-2 font-medium">Uptime Guarantee</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white">24/7</div>
                        <div className="text-sm text-slate-400 mt-2 font-medium">Platform Access</div>
                    </div>
                </div>
            </section>

        </div>
    );
}
