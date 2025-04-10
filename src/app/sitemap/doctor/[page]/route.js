export const GET = async (req, { params }) => {
    const siteUrl = "https://aidfastbd.com";
    const doctorsPerPage = 20;

    const page = parseInt(params.page || "1", 10);

    // Fetch paginated doctors from API
    try {
        const response = await fetch(
            `https://api.aidfastbd.com/api/GeneralWeb/GetDoctorSearchList?pageNumber=${page}&pageSize=${doctorsPerPage}`
        );

        if (!response.ok) {
            console.error("API fetch error:", response.statusText);
            return new Response("Error fetching doctors", { status: 500 });
        }

        const doctorsData = await response.json();
        const doctors = doctorsData?.data || []; // Adjust based on API response structure

        if (doctors.length === 0) {
            return new Response("Not Found", { status: 404 });
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`; // Added image namespace

        doctors.forEach((d) => {
            const doctorImageUrl = d.imageUrl ? `https://api.aidfastbd.com/${d.imageUrl}` : '';
            const doctorName = d.name || "Unknown Doctor";
            const lastModDate = d.updated_at || new Date().toISOString().split("T")[0];

            sitemap += `
  <url>
    <loc>${siteUrl}/doctor/${d.userId}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${doctorImageUrl ? `
    <image:image>
      <image:loc>${doctorImageUrl}</image:loc>
      <image:caption>Aidfastbd Doctor - ${doctorName}</image:caption>
      <image:title>${doctorName}</image:title>
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
        console.error("Error fetching doctors:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
