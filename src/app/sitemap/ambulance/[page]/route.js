export const GET = async (req, { params }) => {
    const siteUrl = "https://aidfastbd.com";
    const ambulancesPerPage = 20;

    const page = parseInt(params.page || "1", 10);


    // Fetch paginated ambulances from API
    try {
        const response = await fetch(
            `https://api.aidfastbd.com/api/GeneralWeb/GetAllAmbulanceList?pageNumber=${page}&pageSize=${ambulancesPerPage}`
        );

        if (!response.ok) {
            console.error("API fetch error:", response.statusText);
            return new Response("Error fetching ambulances", { status: 500 });
        }

        const ambulancesData = await response.json();
        const ambulances = ambulancesData?.data || []; // Adjust based on API response structure

        if (ambulances.length === 0) {
            return new Response("Not Found", { status: 404 });
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`; // Added image namespace

        ambulances.forEach((d) => {
            const ambulanceImageUrl = d.profileImageUrl ? `https://api.aidfastbd.com/${d.profileImageUrl}` : '';
            const ambulanceName = d.name || "Unknown Ambulance";
            const lastModDate = d.updated_at || new Date().toISOString().split("T")[0];

            sitemap += `
  <url>
    <loc>${siteUrl}/ambulance/${d.userId}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${ambulanceImageUrl ? `
    <image:image>
      <image:loc>${ambulanceImageUrl}</image:loc>
      <image:caption>Aidfastbd Ambulance - ${ambulanceName}</image:caption>
      <image:title>${ambulanceName}</image:title>
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
        console.error("Error fetching ambulances:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
