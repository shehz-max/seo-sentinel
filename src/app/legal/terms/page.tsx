export default function TermsOfService() {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-bold text-white mb-6">
                    Terms of <span className="text-gradient-blue">Service</span>
                </h1>
                <p className="text-gray-400 mb-8">Last updated: December 2025</p>

                <div className="space-y-8">
                    <Section title="Acceptance of Terms">
                        <p className="text-gray-300 leading-relaxed">
                            By accessing and using Free Spams Checker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
                        </p>
                    </Section>

                    <Section title="Use License">
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Permission is granted to use Free Spams Checker for personal and commercial website analysis purposes. This license shall automatically terminate if you violate any of these restrictions.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            You may not:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                            <li>Attempt to reverse engineer or copy our analysis algorithms</li>
                            <li>Use automated systems to abuse our service</li>
                            <li>Resell or redistribute our analysis results</li>
                            <li>Use the service for illegal purposes</li>
                        </ul>
                    </Section>

                    <Section title="Service Description">
                        <p className="text-gray-300 leading-relaxed">
                            Free Spams Checker provides website spam analysis using a combination of DapaChecker API data, real-time HTML scraping, and AI-powered insights (via Groq). We strive for accuracy but do not guarantee that our analysis is error-free or complete.
                        </p>
                    </Section>

                    <Section title="User Accounts">
                        <p className="text-gray-300 leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                        </p>
                    </Section>

                    <Section title="Limitation of Liability">
                        <p className="text-gray-300 leading-relaxed">
                            Fast Website Spam Checker shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                        </p>
                    </Section>

                    <Section title="Changes to Terms">
                        <p className="text-gray-300 leading-relaxed">
                            We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service.
                        </p>
                    </Section>

                    <Section title="Contact">
                        <p className="text-gray-300 leading-relaxed">
                            Questions about the Terms of Service should be sent to us at support@fastwebsitespamchecker.com
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
