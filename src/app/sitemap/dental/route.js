export const GET = async (req) => {
 
    const siteUrl = "https://aidfastbd.com";
    const dentalsPerPage = 20;
    // Fetch the total number of dentals
    const response = await fetch("https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?&serviceType=1&pageSize=" + dentalsPerPage);
    const data = await response.json();


    const totalPages = Math.ceil(data.totalRecords / dentalsPerPage);

    let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add paginated dental sitemaps
    for (let i = 1; i <= totalPages; i++) {
        sitemapIndex += `
  <sitemap>
    <loc>${siteUrl}/sitemap/dental/${i}.xml</loc>
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
