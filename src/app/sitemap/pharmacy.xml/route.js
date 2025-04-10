export const GET = async (req) => {


    const siteUrl = "https://aidfastbd.com";
    const pharmacysPerPage = 20;
    // Fetch the total number of pharmacys
    const response = await fetch("https://api.aidfastbd.com/api/GeneralWeb/GetAllPharmacyList?pageSize=" + pharmacysPerPage);
    const data = await response.json();


    const totalPages = Math.ceil(data.totalRecords / pharmacysPerPage);

    let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add paginated pharmacy sitemaps
    for (let i = 1; i <= totalPages; i++) {
        sitemapIndex += `
  <sitemap>
    <loc>${siteUrl}/sitemap/pharmacy/${i}.xml</loc>
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
