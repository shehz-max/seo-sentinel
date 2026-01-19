import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://spamscheck.com';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dynamic blog routes from Firestore
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    if (db) {
      const postsRef = collection(db, "posts");
      const querySnapshot = await getDocs(postsRef);

      blogEntries = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          url: `${baseUrl}/blog/${doc.id}`, // Using doc.id which is the slug
          lastModified: data.updatedAt?.toDate() || new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        };
      });
    }
  } catch (error) {
    console.error("Error generating sitemap dynamic entries:", error);
  }

  return [...staticRoutes, ...blogEntries];
}
