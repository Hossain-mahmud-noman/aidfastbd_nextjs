
import Hero from "../components/hero/hero.js";
import About from "../components/about/about.js";
import Service from '../components/service/service.js'
import AbmulenceService from '../components/ambulenceService/abmulenceService.js'
import CommonService from '../components/common/service.js'
import Information from '../components/information/information.js'
import MobileApp from '../components/mobileApp/mobileApp.js'
import Testimonials from '../components/testimonials/testimonials.js'
import FAQ from '../components/faq/faq.js'
import Blog from '../components/blog/blog.js'
import Contact from '../components/contact/contact.js'

export default async function Home() {

  return (
    <>
      <div  className="font-[family-name:var(--font-geist-sans)] pt-16">
        {/* <Hero />
        <About />
        <Service /> */}
        <CommonService />
        {/* <AbmulenceService /> */}
        {/* <Information />
        <MobileApp />
        <Testimonials />
        <FAQ />
        <Blog />
        <Contact /> */}
      </div>
    </>
  );
}
