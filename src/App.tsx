import Courses from "./components/Courses/Courses";
import Button from "./components/customizedComponents/Button";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import TabbedComponent from "./components/TabbedComponent/TabbedComponent";


export default function App() {
    return <div className="relative">
        <Header />
        <HeroSection />
        <ServicesSection />
        <Courses />
        {/* <TabbedComponent /> */}
    </div>;
}
