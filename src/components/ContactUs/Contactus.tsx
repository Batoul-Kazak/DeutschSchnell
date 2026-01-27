import heroSectionBackground from "../../../public/images/banner-bg.jpg"

const imageStyles = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "darken"
}

const Contactus = () => {
    return <div id="contactus" className="relative h-[40rem]">
        <div className="absolute flex top-0 bottom-0 left-0 h-[40rem] w-[65%] z-10 bg-gray-300 rounded-tr-full rounded-br-full">
            <div className="flex p-10 pl-20 w-[30rem] flex-col gap-[3rem] place-content-center ">
                <div>
                    <h2 className="p-5 font-bold text-indigo-600 uppercase">Contact Us</h2>
                    <h1 className="text-4xl font-bold ">Feel free to contact us anytime</h1>
                </div>
                <p className="text-sm text-gray-700">Thank you for choosing our templates. We provide you best CSS templates at absolutely 100% free of charge. You may support us by sharing our website to your friends.</p>
                {/* <div className="relative p-10 bg-white rounded-3xl"> */}
                {/* <h2>VALID 24</h2> */}
                {/* </div> */}
            </div>
        </div>
        <div className="absolute top-[20rem] rounded-3xl translate-y-[-50%] left-[50%] h-[35rem] z-20 w-[45%] " style={{ ...imageStyles, backgroundImage: `url(${heroSectionBackground})` }}>
            <div className="flex flex-col w-full gap-10 p-[5rem] gap-15 place-content-center">
                <input type="text" placeholder="Your Name..." className="p-2 pl-6 text-white rounded-full bg-my-violet placeholder:text-white" />
                <input type="email" placeholder="Your Email" className="p-2 pl-6 text-white rounded-full bg-my-violet placeholder:text-white" />
                <textarea placeholder="Your Message..." className="p-2 pl-6 text-white rounded-xl h-[10rem] bg-my-violet placeholder:text-white"></textarea>
                <button className="px-5 py-2 text-indigo-600 bg-white rounded-full w-[50%] font-bold">Send Message Now</button>
            </div>
        </div>
    </div>
}

export default Contactus;