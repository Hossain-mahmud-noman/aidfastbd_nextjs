export const GET = async (req, { params }) => {
    const siteUrl = "https://aidfastbd.com";
    const perPage = 20;

    const page = parseInt(params.page || "1", 10);

    // Fetch paginated diagnostics from API
    try {
        const response = await fetch(
            `https://api.aidfastbd.com/api/GeneralWeb/GetAllDiagnosticCenterList?pageNumber=${page}&pageSize=${perPage}`
        );

        if (!response.ok) {
            console.error("API fetch error:", response.statusText);
            return new Response("Error fetching diagnostics", { status: 500 });
        }

        const diagnosticsData = await response.json();
        const diagnostics = diagnosticsData?.data || []; // Adjust based on API response structure

        if (diagnostics.length === 0) {
            return new Response("Not Found", { status: 404 });
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`; // Added image namespace

        const escapeXml = (unsafe) => {
            return unsafe.replace(/&/g, "&amp;")
                         .replace(/</g, "&lt;")
                         .replace(/>/g, "&gt;")
                         .replace(/"/g, "&quot;")
                         .replace(/'/g, "&apos;");
        };
        
        diagnostics.forEach((d) => {
            let name = d.name === null || d.name === "null" ? "gf" : escapeXml(d.name);
            
            sitemap += `
  <url>
    <loc>${siteUrl}/diagnostic/${d.userId}</loc>
    <lastmod>${d.updated_at || new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://api.aidfastbd.com/${d.profileImageUrl}</image:loc>
      <image:caption>Aidfastbd Diagnostic - ${name}</image:caption>
      <image:title>${name}</image:title>
    </image:image>
  </url>`;
        });

        sitemap += `</urlset>`;

        return new Response(sitemap, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } catch (error) {
        console.error("Error fetching diagnostics:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
