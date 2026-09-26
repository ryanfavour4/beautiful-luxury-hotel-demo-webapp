import type { ReactNode } from "react";

export interface SEOProps {
  // Basic SEO
  title: string;
  description: string;
  canonical?: string;

  // Branding
  siteName?: string;
  author?: string;
  publisher?: string;

  // Open Graph
  ogType?: "website" | "article" | "hotel";

  ogImage?: string;
  ogImageAlt?: string;

  // Twitter / X
  twitterCard?: "summary" | "summary_large_image";

  twitterSite?: string;
  twitterCreator?: string;

  // Robots
  robots?: string;

  // Language
  locale?: string;

  // Keywords (optional)
  keywords?: string[];

  // JSON-LD structured data
  schema?: Record<string, unknown>;

  children?: ReactNode;
}

export default function SEO({
  title,
  description,
  canonical,

  siteName = "Beautiful Luxury Hotel",
  author = "Beautiful Luxury Hotel",
  publisher = "Beautiful Luxury Hotel",

  ogType = "website",
  ogImage,
  ogImageAlt = "Beautiful Luxury Hotel",

  twitterCard = "summary_large_image",
  twitterSite,
  twitterCreator,

  robots = "index, follow",

  locale = "en_NG",

  keywords = [],

  schema,
}: SEOProps) {
  return (
    <>
      {/* Basic SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />

      {keywords.length > 0 && <meta name="keywords" content={keywords?.join(", ")} />}

      <meta name="author" content={author} />

      <meta name="publisher" content={publisher} />

      <meta name="robots" content={robots} />

      <meta name="language" content="English" />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:type" content={ogType} />

      <meta property="og:site_name" content={siteName} />

      <meta property="og:locale" content={locale} />

      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />

          <meta property="og:image:alt" content={ogImageAlt} />
        </>
      )}

      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content={twitterCard} />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      {twitterSite && <meta name="twitter:site" content={twitterSite} />}

      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Structured Data */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}
    </>
  );
}
