import heroSectionBackground from "../../../public/images/banner-bg.jpg"

const imageStyles = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "darken"
}

const Footer = () => {
    return (
        <footer className="relative">
            <div className="h-[15rem] w-full">
            </div>
            <div className="h-[10rem] w-full flex place-content-center place-items-center text-white text-sm absolute bottom-0 left-0 right-0 rounded-tl-full rounded-tr-full" style={{ ...imageStyles, backgroundImage: `url(${heroSectionBackground})` }}>
                <p >Copyright@ 2046 Scholar Organization. All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer;