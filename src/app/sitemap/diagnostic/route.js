export const GET = async (req) => {

    const siteUrl = "https://aidfastbd.com";
    const perPage = 20;
    // Fetch the total number of diagnostics
    const response = await fetch("https://api.aidfastbd.com/api/GeneralWeb/GetAllDiagnosticCenterList?pageSize=" + perPage);
    const data = await response.json();


    const totalPages = Math.ceil(data.totalRecords / perPage);

    let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add paginated doctor sitemaps
    for (let i = 1; i <= totalPages; i++) {
        sitemapIndex += `
  <sitemap>
    <loc>${siteUrl}/sitemap/diagnostic/${i}.xml</loc>
  </sitemap>`;
    }

    sitemapIndex += `
</sitemapindex>`;

    return new Response(sitemapIndex, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
};
