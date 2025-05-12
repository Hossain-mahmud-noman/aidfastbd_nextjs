import { base_endpoint, map_key } from "../utils/constants"
import Nearest from '../components/Nearest';
import LayoutAppBar from '../components/LayoutAppBar';
import Carousel from '../components/Carousel';
import BottomNavigation from "../components/BottomNavigation";
import AidComponent from '../components/AidComponent';

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

      <LayoutAppBar api_key={map_key} />
      <div style={{ paddingBottom: "70px" }} className="font-[family-name:var(--font-geist-sans)] pt-16">
        <Carousel data={data} />
        <AidComponent />
        <Nearest />
        <BottomNavigation active="/" />
      </div>
    </>
  );
}
