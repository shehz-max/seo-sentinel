import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'SEO Sentinel Analysis'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { domain: string } }) {
    // Font loading would go here in production

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0f172a, #1e1b4b)',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '40px',
                    }}
                >
                    <div style={{ fontSize: 60, fontWeight: 'bold', color: 'white', marginRight: '20px' }}>🛡️</div>
                    <div style={{ fontSize: 60, fontWeight: 'bold', color: 'white' }}>SEO Sentinel</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '40px 60px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ fontSize: 30, color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '4px' }}>Analyze Domain</div>
                    <div style={{ fontSize: 80, fontWeight: 'bold', color: '#38bdf8' }}>{params.domain}</div>
                </div>

                <div style={{ marginTop: '50px', fontSize: 24, color: '#cbd5e1' }}>
                    Free Spam Score • Domain Authority • Toxicity Check
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
