import Contactus from "./components/ContactUs/Contactus";
import Courses from "./components/Courses/Courses";
import Button from "./components/customizedComponents/Button";
import Events from "./components/Events/Events";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import TabbedComponent from "./components/TabbedComponent/TabbedComponent";
import Team from "./components/Team/Team";


export default function App() {
    return <div className="relative">
        <Header />
        <HeroSection />
        <ServicesSection />
        <Courses />
        {/* <TabbedComponent /> */}
        <Team />
        <div className="flex flex-col gap-20">

            <Events />
            <Contactus />
        </div>
        <Footer />
    </div>;
}
