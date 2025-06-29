import { base_endpoint, map_key } from "../utils/constants"
import Nearest from '../components/Nearest';
import LayoutAppBar from '../components/LayoutAppBar';
import Navbar from "../components/layout/nabvar.js";
import Hero from "../components/hero/hero.js";
import Carousel from '../components/Carousel';
import BottomNavigation from "../components/BottomNavigation";
import AidComponent from '../components/AidComponent';
import Service from '../components/service/service.js'
import AbmulenceService from '../components/ambulenceService/abmulenceService.js'
import Information from '../components/information/information.js'
import MobileApp from '../components/mobileApp/mobileApp.js'
import Testimonials from '../components/testimonials/testimonials.js'
import FAQ from '../components/faq/faq.js'
import Blog from '../components/blog/blog.js'
import Contact from '../components/contact/contact.js'
const fetchCarousel = async () => {

  try {
    const carouselResponse = await
      fetch(`${base_endpoint}/GeneralWeb/GetBannerImg`, { cache: 'no-cache' });
    if (carouselResponse.status === 200) {
      const carouselData = await carouselResponse.json();
      return carouselData['result'];
    }
    else {
      return [];
    }
  } catch (err) {
    console.error('Error fetching carousel:', err);
    return [];
  }
}

export default async function Home() {

  const data = await fetchCarousel();

  return (
    <>
      <Navbar />
      {/* <LayoutAppBar api_key={map_key} /> */}
      <div style={{ paddingBlockEnd: "70px" }} className="font-[family-name:var(--font-geist-sans)] pt-16">
        {/* <Carousel data={data} /> */}
        <Hero />
        <Service />
        <AbmulenceService />
        <Information />
        <MobileApp />
        <Testimonials />
        <FAQ />
        <Blog />
        <Contact />
        {/* <AidComponent />
        <Nearest />
        <BottomNavigation active="/" /> */}
      </div>
    </>
  );
}
