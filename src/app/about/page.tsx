import { ShieldCheck, Target, Zap, Users } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        About <span className="text-gradient-blue">SEO Sentinel</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        The only hybrid SEO audit engine that combines real-time scraping with authentic Moz data
                    </p>
                </div>

                {/* Story Section */}
                <div className="glass-dark rounded-2xl p-8 md:p-12 mb-12 border border-primary/20">
                    <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p className="text-lg">
                            SEO Sentinel was born from a simple frustration: <strong className="text-white">Most spam checkers provide unreliable results.</strong>
                        </p>
                        <p>
                            They use basic algorithms that can't detect sophisticated spam tactics. We realized that to truly protect website owners and SEO professionals, we needed a comprehensive solution that goes beyond surface-level analysis.
                        </p>
                        <ol className="list-decimal list-inside space-y-3 ml-4">
                            <li>
                                <strong className="text-primary">Accurate Data:</strong> Real domain authority scores and comprehensive spam signal detection.
                            </li>
                            <li>
                                <strong className="text-secondary">Deep Analysis:</strong> Advanced algorithms that analyze your website's code, structure, and security.
                            </li>
                        </ol>
                        <p className="text-lg font-medium text-white">
                            Today, SEO Sentinel is the most comprehensive spam detection platform, giving you insights you can trust to protect your SEO rankings.
                        </p>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ValueCard
                        icon={<ShieldCheck className="h-8 w-8 text-primary" />}
                        title="Authentic Data"
                        description="Real Moz metrics, not simulations"
                    />
                    <ValueCard
                        icon={<Target className="h-8 w-8 text-secondary" />}
                        title="Precision Analysis"
                        description="27 spam signals checked in real-time"
                    />
                    <ValueCard
                        icon={<Zap className="h-8 w-8 text-accent" />}
                        title="AI-Powered"
                        description="Google Gemini insights for context"
                    />
                    <ValueCard
                        icon={<Users className="h-8 w-8 text-primary" />}
                        title="Trusted by SEOs"
                        description="1,000+ professionals rely on us"
                    />
                </div>
            </div>
        </div>
    );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    );
}
