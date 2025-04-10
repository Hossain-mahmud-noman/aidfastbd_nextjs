export const GET = async (req) => {


    const siteUrl = "https://aidfastbd.com";
    const bloodsPerPage = 20;
    // Fetch the total number of bloods
    const response = await fetch("https://api.aidfastbd.com/api/GeneralWeb/GetAllBloodBankList?pageSize=" + bloodsPerPage);
    const data = await response.json();


    const totalPages = Math.ceil(data.totalRecords / bloodsPerPage);

    let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add paginated blood sitemaps
    for (let i = 1; i <= totalPages; i++) {
        sitemapIndex += `
  <sitemap>
    <loc>${siteUrl}/sitemap/blood/${i}.xml</loc>
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
