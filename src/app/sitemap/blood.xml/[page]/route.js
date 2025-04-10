export const GET = async (req, { params }) => {
    const siteUrl = "https://aidfastbd.com";
    const bloodsPerPage = 20;

    const page = parseInt(params.page || "1", 10);

    // Fetch paginated bloods from API
    try {
        const response = await fetch(
            `https://api.aidfastbd.com/api/GeneralWeb/GetAllBloodBankList?pageNumber=${page}&pageSize=${bloodsPerPage}`
        );

        if (!response.ok) {
            console.error("API fetch error:", response.statusText);
            return new Response("Error fetching bloods", { status: 500 });
        }

        const bloodsData = await response.json();
        const bloods = bloodsData?.data || []; // Adjust based on API response structure

        if (bloods.length === 0) {
            return new Response("Not Found", { status: 404 });
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`; // Added image namespace

        bloods.forEach((d) => {
            const bloodImageUrl = d.profileImageUrl ? `https://api.aidfastbd.com/${d.profileImageUrl}` : '';
            const bloodName = d.name || "Unknown Blood";
            const lastModDate = d.updated_at || new Date().toISOString().split("T")[0];

            sitemap += `
  <url>
    <loc>${siteUrl}/blood/${d.userId}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${bloodImageUrl ? `
    <image:image>
      <image:loc>${bloodImageUrl}</image:loc>
      <image:caption>Aidfastbd Blood - ${bloodName}</image:caption>
      <image:title>${bloodName}</image:title>
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
        console.error("Error fetching bloods:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
