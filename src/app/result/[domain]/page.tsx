import { Metadata } from "next";
import ResultClient from "./ResultClient";

type Props = {
    params: { domain: string }
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const domain = decodeURIComponent(params.domain);

    return {
        title: `Check ${domain} Spam Score & DA - Free SEO Analysis`,
        description: `Is ${domain} safe? Check its Website Spam Score, Domain Authority (DA), and toxicity signals instantly. Free AI-powered audit.`,
        alternates: {
            canonical: `/result/${params.domain}`
        }
    }
}

export default function ResultPage({ params }: Props) {
    const domain = decodeURIComponent(params.domain);
    return <ResultClient domain={domain} />;
}
