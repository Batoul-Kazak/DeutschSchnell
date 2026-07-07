

import { useForm } from 'react-hook-form';
import heroSectionBackground from "/public/images/banner-bg.jpg";
import { useState } from 'react';

const imageStyles = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "darken"
};

type FormData = {
    name: string;
    email: string;
    message: string;
};

const Contactus = () => {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<FormData>({
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const onSubmit = async (data: FormData) => {
        setSubmitStatus("idle");
        try {
            console.log("Form submitted:", data);

            await new Promise(resolve => setTimeout(resolve, 800));

            setSubmitStatus("success");
            reset();

            setTimeout(() => setSubmitStatus("idle"), 4000);
        } catch (error) {
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus("idle"), 5000);
        }
    };

    return (
        <div id="contactus" className="relative flex md:pt-0 pt-10 gap-5 flex-col place-content-center md:text-base text-sm place-items-center h-[40rem] ">
            <div className="absolute hidden md:flex top-0 bottom-0 left-0 h-[40rem] w-[65%] z-10 bg-gray-300 dark:bg-gray-700 rounded-tr-full rounded-br-full">
                <div className="flex p-10 lg:pl-20 md:pl-5 w-[30rem] flex-col gap-[3rem] place-content-center ">
                    <div>
                        <h2 className="p-5 font-bold uppercase text-light-violet">Contact Us</h2>
                        <h1 className="text-4xl font-bold ">Feel free to contact us anytime</h1>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                        Thank you for choosing our templates. We provide you best CSS templates at absolutely 100% free of charge.
                    </p>
                </div>
            </div>

            <div className='flex flex-col gap-5 px-6 md:hidden'>
                <div className='text-center'>
                    <h2 className="p-5 text-2xl font-bold uppercase text-light-violet">Contact Us</h2>
                    <h1 className="text-4xl font-bold dark:text-white">Feel free to contact us anytime</h1>
                </div>
                <p className="text-sm text-center text-gray-700 dark:text-gray-200">
                    Thank you for choosing our templates. We provide you best CSS templates at absolutely 100% free of charge.
                </p>
            </div>

            <div
                className="md:absolute md:top-[20rem] sm:rounded-3xl rounded-xl  md:translate-y-[-50%] md:left-[50%] z-20 md:w-[45%] w-[90%]"
                style={{ ...imageStyles, backgroundImage: `url(${heroSectionBackground})` }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full py-12 gap-6 lg:p-[5rem] md:p-[3rem] sm:px-[2rem] sm:py-[4rem] p-[1rem] place-content-center">
                    <div className='relative h-[4rem]'>
                        <input
                            {...register("name", { required: "Name is required" })}
                            placeholder="Your Name..."
                            className={`p-2 pl-6 md:rounded-full rounded-xl sm:rounded-2xl absolute bg-inherit w-full
                                } text-white placeholder:text-white`}
                        />
                        {errors.name && (
                            <span className="absolute bottom-0 text-sm text-red-900 left-5">{errors.name.message}</span>
                        )}
                    </div>
                    <div className='relative h-[4rem]'>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            placeholder="Your Email"
                            type="email"
                            className={`p-2 pl-6 md:rounded-full rounded-xl sm:rounded-2xl absolute  bg-inherit w-full
                                } placeholder:text-white`}
                        />
                        {errors.email && (
                            <span className="absolute bottom-0 text-sm text-red-900 left-5">{errors.email.message}</span>
                        )}
                    </div>
                    <div className="">
                        <div className="relative w-full h-[8rem]">
                            <textarea
                                style={{ resize: "none" }}
                                {...register("message", { required: "Message is required", minLength: 10 })}
                                placeholder="Your Message..."
                                className="w-full h-full p-2 pl-6 rounded-xl sm:rounded-2xl bg-inherit placeholder:text-white"
                            />
                        </div>

                        {errors.message?.type === "minLength" && (
                            <span className="block mt-1 text-sm text-red-900">
                                Message must be at least 10 characters
                            </span>
                        )}
                        {errors.message && errors.message.type !== "minLength" && (
                            <span className="block mt-1 text-sm text-red-900">
                                {errors.message.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2 text-light-violet place-self-center bg-white md:rounded-full rounded-xl sm:rounded-2xl lg:w-[50%] md:w-[80%] w-full font-bold disabled:opacity-50"
                    >
                        {isSubmitting ? "Sending..." : "Send Message Now"}
                    </button>
                </form>


                {submitStatus !== 'idle' && (
                    <div
                        className={`p-3 rounded-lg text-center font-medium ${submitStatus === 'success'
                            ? 'bg-light-violet/20 text-lime-200 border border-light-violet'
                            : 'bg-red-100 text-red-900 border border-red-300'
                            }`}
                        style={{ width: '26rem', margin: '0 auto 1rem' }}
                    >
                        {submitStatus === 'success'
                            ? 'Message sent successfully!'
                            : 'Failed to send. Please try again.'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contactus;