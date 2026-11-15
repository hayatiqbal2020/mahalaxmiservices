import About from "@/components/About";
import BusinessJsonLd from "@/components/BusinessJsonLd";
import Contact from "@/components/Contact";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import Finder from "@/components/Finder";
import FireClasses from "@/components/FireClasses";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import Loader from "@/components/Loader";
import Process from "@/components/Process";
import Products from "@/components/Products";
import RefillReminder from "@/components/RefillReminder";
import Services from "@/components/Services";
import SiteEffects from "@/components/SiteEffects";
import Stats from "@/components/Stats";
import SvgDefs from "@/components/SvgDefs";
import Testimonials from "@/components/Testimonials";
import TopBar from "@/components/TopBar";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Loader />
      <SvgDefs />
      <TopBar />
      <Header />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Products />
      <FireClasses />
      <Finder />
      <Process />
      <Cta />
      <RefillReminder />
      <WhyUs />
      <Industries />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
      <FloatingButtons />
      <SiteEffects />
      <BusinessJsonLd />
    </>
  );
}
