export const GET = async () => {
    const siteUrl = "https://aidfastbd.com";

    const staticPages = [
        "/",
        "/about",
        "/terms",
        "/privacy",
        "/login",
        "/registration",
        "/emergency",
        "/doctor",
        "/dental",
        "/diagnostic",
        "/pharmacy",
        "/ambulance",
        "/blood",
    ];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    staticPages.forEach((page) => {
        sitemap += `
  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    sitemap += `</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
};
