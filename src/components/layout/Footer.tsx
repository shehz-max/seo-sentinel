import Link from "next/link";
import { ShieldCheck, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-primary/20">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <ShieldCheck className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-lg text-white">
                                SEO<span className="text-primary">Sentinel</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400">
                            Authentic SEO analysis powered by real-time data and advanced AI. Shield your site from spam penalties.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link href="/" className="text-base text-gray-400 hover:text-primary transition-colors">Tool</Link></li>
                            <li><Link href="/blog" className="text-base text-gray-400 hover:text-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link href="/about" className="text-base text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-base text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link href="/legal/privacy" className="text-base text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms" className="text-base text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/legal/cookies" className="text-base text-gray-400 hover:text-primary transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-primary/20 pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} SEO Sentinel. All rights reserved. Professional Website Spam Detection.
                    </p>
                </div>
            </div>
        </footer>
    );
}
