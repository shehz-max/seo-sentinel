"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Save to Firebase (Existing)
            if (db) {
                await addDoc(collection(db, "messages"), {
                    ...formData,
                    timestamp: serverTimestamp()
                });
            }

            // 2. Send Email (New)
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            console.error("Failed to send message", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Contact <span className="text-gradient-blue">Us</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-400">
                        Need help with your Spams Audit? Our team is here to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="glass-dark rounded-2xl p-8 border border-primary/20">
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-primary/20 text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-primary/20 text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                <textarea
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-primary/20 text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50"
                            >
                                {loading ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="glass-dark rounded-2xl p-8 border border-primary/20">
                            <h2 className="text-2xl font-bold text-white mb-6">Get in touch</h2>
                            <div className="space-y-6">
                                <a href="mailto:hyspam6@gmail.com" className="block hover:opacity-80 transition-opacity bg-primary/10 rounded-lg p-2 border border-primary/20 -mx-2">
                                    <ContactMethod
                                        icon={<Mail className="h-6 w-6 text-primary" />}
                                        title="Email"
                                        value="hyspam6@gmail.com"
                                    />
                                </a>
                                <ContactMethod
                                    icon={<Phone className="h-6 w-6 text-secondary" />}
                                    title="Phone"
                                    value="+92 (348) 4771574"
                                />
                            </div>
                        </div>

                        <div className="glass-dark rounded-2xl p-8 border border-primary/20">
                            <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
                            <div className="space-y-2 text-gray-400">
                                <p className="text-lg font-medium text-white flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    24/7 Open
                                </p>
                                <p className="text-sm">We are always available to help you.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactMethod({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-medium text-white">{title}</h3>
                <p className="mt-1 text-gray-400">{value}</p>
            </div>
        </div>
    );
}
