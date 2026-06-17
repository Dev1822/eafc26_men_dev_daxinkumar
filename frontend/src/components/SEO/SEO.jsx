import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Dashboard | EAFC26", 
  description = "Manage EAFC26 players, stats, and analytics from the premium admin dashboard.",
  type = "website",
  url = "https://eafc26.dev",
  image = "https://eafc26.dev/og-image.jpg"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "EAFC26 Dashboard",
    "url": url,
    "description": description,
    "applicationCategory": "Dashboard",
    "operatingSystem": "All"
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Social Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
