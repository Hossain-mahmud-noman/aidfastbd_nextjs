export const GET = async (req) => {

 
    const siteUrl = "https://aidfastbd.com";
    const doctorsPerPage = 20;
    // Fetch the total number of doctors
    const response = await fetch("https://api.aidfastbd.com/api/GeneralWeb/GetDoctorSearchList?pageSize=" + doctorsPerPage);
    const data = await response.json();


    const totalPages = Math.ceil(data.totalRecords / doctorsPerPage);

    let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add paginated doctor sitemaps
    for (let i = 1; i <= totalPages; i++) {
        sitemapIndex += `
  <sitemap>
    <loc>${siteUrl}/sitemap/doctor/${i}.xml</loc>
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
