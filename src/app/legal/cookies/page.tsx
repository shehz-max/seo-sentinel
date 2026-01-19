export default function CookiePolicy() {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-bold text-white mb-6">
                    Cookie <span className="text-gradient-blue">Policy</span>
                </h1>
                <p className="text-gray-400 mb-8">Last updated: December 2025</p>

                <div className="space-y-8">
                    <Section title="What Are Cookies">
                        <p className="text-gray-300 leading-relaxed">
                            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                        </p>
                    </Section>

                    <Section title="How We Use Cookies">
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Free Spams Check uses cookies for the following purposes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li><strong className="text-white">Authentication:</strong> To keep you logged in to your account</li>
                            <li><strong className="text-white">Preferences:</strong> To remember your settings and preferences</li>
                            <li><strong className="text-white">Analytics:</strong> To understand how you use our service</li>
                            <li><strong className="text-white">Security:</strong> To protect against fraudulent activity</li>
                        </ul>
                    </Section>

                    <Section title="Types of Cookies We Use">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                                <p className="text-gray-300">Required for the website to function properly. These cannot be disabled.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
                                <p className="text-gray-300">Help us understand how visitors interact with our website.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Functional Cookies</h3>
                                <p className="text-gray-300">Enable enhanced functionality and personalization.</p>
                            </div>
                        </div>
                    </Section>

                    <Section title="Third-Party Cookies">
                        <p className="text-gray-300 leading-relaxed">
                            We use Google Firebase for authentication and analytics, which may set their own cookies. Please refer to Google's privacy policy for more information about their cookie usage.
                        </p>
                    </Section>

                    <Section title="Managing Cookies">
                        <p className="text-gray-300 leading-relaxed">
                            You can control and manage cookies through your browser settings. However, please note that disabling cookies may affect the functionality of Free Spams Check.
                        </p>
                    </Section>

                    <Section title="Contact Us">
                        <p className="text-gray-300 leading-relaxed">
                            If you have questions about our use of cookies, please contact us at hyspam6@gmail.com
                        </p>
                    </Section>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="glass-dark p-6 rounded-xl border border-primary/20">
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            {children}
        </div>
    );
}
