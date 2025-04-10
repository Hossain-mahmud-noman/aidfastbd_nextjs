export const GET = async (req, { params }) => {
    const siteUrl = "https://aidfastbd.com";
    const dentalsPerPage = 20;

    const page = parseInt(params.page || "1", 10);

    // Fetch paginated dentals from API
    try {
        const response = await fetch(
            `https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?&serviceType=1&pageNumber=${page}&pageSize=${dentalsPerPage}`
        );

        if (!response.ok) {
            console.error("API fetch error:", response.statusText);
            return new Response("Error fetching dentals", { status: 500 });
        }

        const dentalsData = await response.json();
        const dentals = dentalsData?.data || []; // Adjust based on API response structure

        if (dentals.length === 0) {
            return new Response("Not Found", { status: 404 });
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`; // Added image namespace

        dentals.forEach((d) => {
            const dentalImageUrl = d.profileImageUrl ? `https://api.aidfastbd.com/${d.profileImageUrl}` : '';
            const dentalName = d.name || "Unknown Dental";
            const lastModDate = d.updated_at || new Date().toISOString().split("T")[0];

            sitemap += `
  <url>
    <loc>${siteUrl}/dental/${d.userId}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${dentalImageUrl ? `
    <image:image>
      <image:loc>${dentalImageUrl}</image:loc>
      <image:caption>Aidfastbd Dental - ${dentalName}</image:caption>
      <image:title>${dentalName}</image:title>
    </image:image>` : ''}
  </url>`;
        });

        sitemap += `
</urlset>`;

        return new Response(sitemap, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } catch (error) {
        console.error("Error fetching dentals:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
