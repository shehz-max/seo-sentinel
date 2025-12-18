import { Metadata } from "next";
import ResultClient from "./ResultClient";

type Props = {
    params: { domain: string }
}

export async function generateMetadata(
    { params }: { params: Promise<{ domain: string }> },
): Promise<Metadata> {
    const { domain } = await params;
    const decodedDomain = decodeURIComponent(domain);

    return {
        title: `Check ${decodedDomain} Spam Score & DA - Free SEO Analysis`,
        description: `Is ${decodedDomain} safe? Check its Website Spam Score, Domain Authority (DA), and toxicity signals instantly. Free AI-powered audit.`,
        alternates: {
            canonical: `/result/${domain}`
        }
    }
}

export default async function ResultPage({ params }: { params: Promise<{ domain: string }> }) {
    const { domain } = await params;
    const decodedDomain = decodeURIComponent(domain);
    return <ResultClient domain={decodedDomain} />;
}
