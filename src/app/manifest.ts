import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SEO Sentinel - Website Spam Checker',
        short_name: 'SEO Sentinel',
        description: 'Advanced website spam detection and domain authority analysis. Protect your SEO rankings.',
        start_url: '/',
        display: 'standalone',
        background_color: '#020617',
        theme_color: '#06b6d4',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
