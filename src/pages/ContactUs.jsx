import { motion } from "framer-motion";
import RippleButton from "../components/RippleButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 24 } },
};

const GlowInput = ({ ...props }) => (
  <motion.input
    whileFocus={{ boxShadow: "0 0 0 2px rgba(99,102,241,0.5)" }}
    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-md"
    {...props}
  />
);

const GlowTextarea = ({ ...props }) => (
  <motion.textarea
    whileFocus={{ boxShadow: "0 0 0 2px rgba(99,102,241,0.5)" }}
    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-md min-h-[120px] resize-y"
    {...props}
  />
);

export default function ContactUs() {
  return (
    <div className="flex-1 bg-transparent py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            We'd love to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">hear from you</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Have questions, feedback, or need support? Send us a message and we'll get back to you shortly.
          </p>
        </motion.div>

        {/* ── Two Column Layout ── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* LEFT: Contact Info Panel */}
          <motion.div
            variants={containerVariants} initial="hidden" animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Cards */}
            {[
              {
                icon: "📧",
                title: "Email Us",
                detail: "support@vaultportal.com",
                sub: "We reply within 24 hours",
                color: "from-indigo-500 to-violet-600",
              },
              {
                icon: "💬",
                title: "Live Chat",
                detail: "Available Mon–Fri",
                sub: "9 AM – 6 PM IST",
                color: "from-sky-500 to-indigo-500",
              },
              {
                icon: "🎓",
                title: "For Students",
                detail: "Check the FAQ first",
                sub: "Most answers are there",
                color: "from-violet-500 to-fuchsia-500",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-start gap-4 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/20 hover:border-white/20 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl shadow-md border border-white/20`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">{item.title}</p>
                  <p className="text-sm text-indigo-400 font-medium mb-1">{item.detail}</p>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div variants={itemVariants} className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/20">
              <p className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { icon: "𝕏", label: "Twitter", hover: "hover:bg-slate-800 hover:text-white" },
                  { icon: "in", label: "LinkedIn", hover: "hover:bg-[#0077b5] hover:text-white" },
                  { icon: "⌥", label: "GitHub", hover: "hover:bg-slate-800 hover:text-white" },
                ].map(({ icon, label, hover }) => (
                  <motion.a
                    key={label}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 font-bold text-lg transition-all duration-300 ${hover} hover:border-white/20 shadow-sm`}
                    title={label}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 h-full"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/40 p-8 sm:p-10 h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">First Name</label>
                    <GlowInput type="text" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Last Name</label>
                    <GlowInput type="text" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Email Address</label>
                  <GlowInput type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Subject</label>
                  <GlowInput type="text" placeholder="How can we help?" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Message</label>
                  <GlowTextarea placeholder="Tell us more about your inquiry..." />
                </div>

                <RippleButton className="w-full py-4 mt-2 rounded-xl text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 border border-indigo-400/30">
                  Send Message
                </RippleButton>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
