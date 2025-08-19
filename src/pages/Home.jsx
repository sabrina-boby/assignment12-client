import Banner from "../components/Banner";
import CallToAction from "../components/CallToAction/CallToAction";
import FAQ from "../components/FeaturedSection/AboutUs/FAQ";
import TeamSection from "../components/FeaturedSection/AboutUs/TeamSection";
import ContactUs from "../components/FeaturedSection/ContactUs/ContactUs";
import FeaturedSection from "../components/FeaturedSection/FeaturedSection";
import ChooseSection from "../components/HeroSection/ChooseSection";
import HeroSection from "../components/HeroSection/HeroSection"
import HomeSection from "../components/HeroSection/HomeSection";
import HowItWorks from "../components/HowItWorks/HowItWorks";

const Home = () => {
  return (
    <>
      <section id="home">
        {/* <Banner></Banner> */}
        <HeroSection></HeroSection>
        <FeaturedSection></FeaturedSection>
        <HomeSection></HomeSection>
        <HowItWorks></HowItWorks>
        <ChooseSection></ChooseSection>
        <CallToAction></CallToAction>
        <ContactUs></ContactUs>
        <FAQ></FAQ>
        <TeamSection></TeamSection>
        {/* https://project-server1.vercel.app*/}

      </section>
    </>
  );
};

export default Home;
