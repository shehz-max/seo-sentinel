import Link from "next/link";
import { ShieldCheck, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-primary/20">
            <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <ShieldCheck className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-xl text-white tracking-tight">
                                Free <span className="text-primary">Spams Checker</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                            Protecting your search rankings with real-time signal auditing and advanced AI metrics.
                        </p>
                        {/* Social links removed until provided
                         <div className="flex space-x-6 mt-8">
                            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
                            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
                        </div>
                        */}
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-[10px] font-bold text-white tracking-widest uppercase mb-6 opacity-50">Product</h3>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors">Tool</Link></li>
                            <li><Link href="/blog" className="text-sm text-gray-400 hover:text-primary transition-colors">Blogs</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-[10px] font-bold text-white tracking-widest uppercase mb-6 opacity-50">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-sm text-gray-400 hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/contact" className="text-sm text-gray-400 hover:text-primary transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1 lg:col-span-1">
                        <h3 className="text-[10px] font-bold text-white tracking-widest uppercase mb-6 opacity-50">Legal</h3>
                        <ul className="space-y-4">
                            <li><Link href="/legal/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">Privacy</Link></li>
                            <li><Link href="/legal/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">Terms</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} Fast Website Spam Checker. Crafted for Webmasters.
                    </p>
                    <div className="flex gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <span>Status: Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
