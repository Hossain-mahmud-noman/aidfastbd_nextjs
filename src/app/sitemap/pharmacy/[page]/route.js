export const GET = async (req, { params }) => {
    const siteUrl = "https://aidfastbd.com";
    const pharmacysPerPage = 20;

    const page = parseInt(params.page || "1", 10);

    // Fetch paginated pharmacys from API
    try {
        const response = await fetch(
            `https://api.aidfastbd.com/api/GeneralWeb/GetAllPharmacyList?pageNumber=${page}&pageSize=${pharmacysPerPage}`
        );

        if (!response.ok) {
            console.error("API fetch error:", response.statusText);
            return new Response("Error fetching pharmacys", { status: 500 });
        }

        const pharmacysData = await response.json();
        const pharmacys = pharmacysData?.data || []; // Adjust based on API response structure

        if (pharmacys.length === 0) {
            return new Response("Not Found", { status: 404 });
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`; // Added image namespace

        pharmacys.forEach((d) => {
            const pharmacyImageUrl = d.profileImageUrl ? `https://api.aidfastbd.com/${d.profileImageUrl}` : '';
            const pharmacyName = d.name || "Unknown Pharmacy";
            const lastModDate = d.updated_at || new Date().toISOString().split("T")[0];

            sitemap += `
  <url>
    <loc>${siteUrl}/pharmacy/${d.userId}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${pharmacyImageUrl ? `
    <image:image>
      <image:loc>${pharmacyImageUrl}</image:loc>
      <image:caption>Aidfastbd Pharmacy - ${pharmacyName}</image:caption>
      <image:title>${pharmacyName}</image:title>
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
        console.error("Error fetching pharmacys:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
