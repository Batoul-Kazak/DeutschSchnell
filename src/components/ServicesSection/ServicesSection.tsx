
import { SERVICES } from "../../constants/SERVICES";
import Service from "./Service";

const ServicesSection = () => {


    return (
        <section id="services" className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 lg:gap-12 md:gap-8 md:grid-cols-3 px-4 md:px-10 py-20 min-h-[30rem]">
                {SERVICES.map((section) => (
                    <Service section={section} />
                ))}
            </div>

        </section>
    );
};

export default ServicesSection;