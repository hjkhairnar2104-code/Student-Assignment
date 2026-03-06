import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 min-h-10 mt-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-center sm:text-left">

                    {/* Brand */}
                    <div className="flex flex-col space-y-4 items-center sm:items-start">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
                                <span className="text-lg font-bold">V</span>
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white">
                                Vault
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                            A seamless platform for students and educators to manage coursework, submissions, and grading effortlessly.
                        </p>
                    </div>

                    {/* Course Year */}
                    <div className="space-y-4 text-sm font-sans">
                        <p className="font-semibold text-white">Course Year</p>
                        <nav className="flex flex-col space-y-3">
                            <Link to="/courseyear/firstyear" className="hover:text-white transition-colors duration-200">First Year</Link>
                            <Link to="/courseyear/secondyear" className="hover:text-white transition-colors duration-200">Second Year</Link>
                            <Link to="/courseyear/thirdyear" className="hover:text-white transition-colors duration-200">Third Year</Link>
                            <Link to="/courseyear/fourthyear" className="hover:text-white transition-colors duration-200">Fourth Year</Link>
                        </nav>
                    </div>

                    {/* Get In Touch */}
                    <div className="space-y-4 text-sm">
                        <p className="font-semibold text-white">Platform</p>
                        <nav className="flex flex-col space-y-3">
                            <Link to="/aboutus" className="hover:text-white transition-colors duration-200">About Us</Link>
                            <Link to="/contactus" className="hover:text-white transition-colors duration-200">Contact Us</Link>
                            <Link to="/login" className="hover:text-white transition-colors duration-200">Log In</Link>
                            <Link to="/signup" className="hover:text-white transition-colors duration-200">Sign Up</Link>
                        </nav>
                    </div>

                    {/* Newsletter & Social */}
                    <div className="space-y-6 text-sm">
                        <div className="space-y-4">
                            <p className="font-semibold text-white">Stay updated</p>
                            <Link
                                to="/newsletter"
                                className="inline-flex items-center justify-center sm:justify-start gap-1 group text-slate-300 hover:text-white transition-colors duration-200"
                            >
                                Newsletter
                                <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M7 7h10v10"></path></svg>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <p className="font-semibold text-white">Follow us</p>
                            <div className="flex gap-4 justify-center sm:justify-start">
                                <a href="http://x.com/pccoe_pune" className="text-slate-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
                                </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200" aria-label="GitHub">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="https://www.linkedin.com/company/pccoe-pune/" className="text-slate-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 bg-slate-950 px-4 py-6 sm:flex sm:items-center sm:justify-between">
                <div className="text-sm text-slate-500 mx-auto max-w-7xl w-full flex flex-col sm:flex-row justify-between items-center text-center">
                    <p className="mb-4 sm:mb-0">© {new Date().getFullYear()} Vault Inc. All rights reserved.</p>
                    <div className="flex gap-6 sm:gap-4">
                        <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
