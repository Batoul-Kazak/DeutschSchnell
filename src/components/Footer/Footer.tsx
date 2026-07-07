import heroSectionBackground from "/public/images/banner-bg.jpg"

const imageStyles = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "darken"
}

const Footer = () => {
    return (
        <footer className="relative pt-20 sm:pt-0">
            <div className="h-[15rem] w-full">
            </div>
            <div className="h-[10rem] w-full flex place-content-center place-items-center rounded-b-0 p-5 text-center text-white text-sm absolute bottom-0 left-0 right-0  sm:rounded-tl-full rounded-tl-[4rem] sm:rounded-tr-full rounded-tr-[4rem]" style={{ ...imageStyles, backgroundImage: `url(${heroSectionBackground})` }}>
                <p >Copyright@ 2046 Scholar Organization. All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer;