export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-bold text-white mb-6">
                    Privacy <span className="text-gradient-blue">Policy</span>
                </h1>
                <p className="text-gray-400 mb-8">Last updated: December 2025</p>

                <div className="space-y-8">
                    <Section title="Introduction">
                        <p className="text-gray-300 leading-relaxed">
                            At Free Spams Checker, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website spam checking service.
                        </p>
                    </Section>

                    <Section title="Information We Collect">
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>Email address and name (via Google Sign-In)</li>
                            <li>Domain URLs you submit for analysis</li>
                            <li>Usage data and analytics</li>
                        </ul>
                    </Section>

                    <Section title="How We Use Your Information">
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>Provide and maintain our SEO analysis service</li>
                            <li>Improve and personalize your experience</li>
                            <li>Send you technical notices and support messages</li>
                            <li>Monitor and analyze usage patterns</li>
                        </ul>
                    </Section>

                    <Section title="Data Security">
                        <p className="text-gray-300 leading-relaxed">
                            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </Section>

                    <Section title="Third-Party Services">
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We use the following third-party services:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>Google Firebase for authentication and data storage</li>
                            <li>DapaChecker API for domain authority metrics</li>
                            <li>Groq AI (Llama 3) for analysis insights</li>
                        </ul>
                    </Section>

                    <Section title="Your Rights">
                        <p className="text-gray-300 leading-relaxed">
                            You have the right to access, update, or delete your personal information at any time. Contact us at support@fastwebsitespamchecker.com for any privacy-related requests.
                        </p>
                    </Section>

                    <Section title="Contact Us">
                        <p className="text-gray-300 leading-relaxed">
                            If you have questions about this Privacy Policy, please contact us at support@fastwebsitespamchecker.com
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
