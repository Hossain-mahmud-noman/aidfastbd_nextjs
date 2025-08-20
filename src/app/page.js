
import Hero from "../components/hero/hero.js";
import About from "../components/about/about.js";
import Service from '../components/landing/service/service.js'
import Information from '../components/landing/information/information.js'
import MobileApp from '../components/landing/mobileApp/mobileApp.js'
import Testimonials from '../components/landing/testimonials/testimonials.js'
import FAQ from '../components/landing/faq/faq.js'
import Blog from '../components/landing/blog/blog.js'
import Contact from '../components/landing/contact/contact.js'

export default async function Home() {

  return (
    <>
      <div className="font-[family-name:var(--font-geist-sans)] pt-4 md:pt-6 lg:pt-10">
        <Hero />
        <Service />
        {/* <About /> */}
        <Information />
        <MobileApp />
        <Testimonials />
        <FAQ />
        <Blog />
        <Contact />
      </div>
    </>
  );
}
