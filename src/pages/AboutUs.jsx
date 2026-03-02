export default function AboutUs() {
    return (
        <div className="flex-1 bg-white py-20 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight text-center">
                    About Us
                </h1>
                <p className="text-lg text-slate-600 mb-10 text-center max-w-2xl mx-auto">
                    We are dedicated to bridging the gap between students and educators by providing a seamless, modern platform for assignment management.
                </p>

                <div className="grid md:grid-cols-2 gap-10 mt-12">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Our mission is to empower educational institutions with the tools they need to function efficiently.
                            By centralizing submissions, grading, and coursework access, we strive to remove administrative
                            friction and let teachers focus on what matters most: teaching.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We envision a future where every student has immediate, clear access to their academic requirements,
                            and every educator can manage their classrooms with zero technical overhead.
                        </p>
                    </div>
                </div>

                <div className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Join Our Community</h2>
                    <p className="text-slate-600 mb-6">Experience the platform designed for academic excellence.</p>
                    <a href="/signup" className="clean-button">
                        Sign up today
                    </a>
                </div>
            </div>
        </div>
    );
}
