
import Hero from "../components/hero/hero.js";
import About from "../components/about/about.js";
import Service from '../components/landing/service/service.js'
import Information from '../components/landing/information/information.js'
import DoctorSpeciality from '../components/landing/specialty/doctorSpeciality.js'
import Doctor from '../components/landing/Doctor/doctor.js'
import Consultation from '../components/landing/consultation/consultation.js'
import DiagnostickCenter from '../components/landing/diagnosticCenter/diagnostickCenter.js'
import MobileApp from '../components/landing/mobileApp/mobileApp.js'
import Testimonials from '../components/landing/testimonials/testimonials.js'
import FAQ from '../components/landing/faq/faq.js'
import Blog from '../components/landing/blog/blog.js'
import Contact from '../components/landing/contact/contact.js'

export default async function Home() {

  return (
    <>
      <div className="">
        <Hero />
        {/* <Service /> */}
        {/* <About /> */}
        {/* <DoctorSpeciality />
        <Doctor />
        <Consultation />
        <DiagnostickCenter />
        <Information />
        <MobileApp />
        <Testimonials />
        <FAQ />
        <Blog /> */}
        <Contact />
      </div>
    </>
  );
}
