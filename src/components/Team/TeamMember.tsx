import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';

const icons = [
    { icon: <Twitter />, label: "Twitter" },
    { icon: <Facebook />, label: "Facebook" },
    { icon: <LinkedIn />, label: "LinkedIn" }
];

const COLOR_CLASSES = {
    red: "dark:text-light-red text-dark-red",
    blue: "dark:text-light-blue text-dark-blue",
    green: "dark:text-light-green text-dark-green",
    yellow: "dark:text-light-yellow text-dark-yellow"
};

export default function TeamMember({ member }) {
    return (
        <div className='py-5'>
            <div key={member.id} className="relative lg:pt-[7rem] md:w-auto w-[90%] p-5 bg-gray-200 dark:bg-light-violet/50 shadow-md h-[20rem] rounded-3xl place-content-center pt-[10rem] place-items-center flex gap-5 flex-col">
                <img src={member.image} alt={member.name} className="w-[12rem] hover:-translate-y-5 transition duration-300 hover:cursor-pointer h-[12rem] rounded-full absolute  lg:-top-[7rem]  -top-[70px] left-[50%] translate-x-[-50%] " />
                <h2 className={`${COLOR_CLASSES[member.color as keyof typeof COLOR_CLASSES]} font-bold dark:text-dark-${member.color} text-center lg:text-xl text-dark-violet dark:text-white md:text-base`}>{member.role}</h2>
                <h1 className="font-bold text-light-violet lg:text-xl md:text-base dark:text-white">{member.name}</h1>
                <div className="flex gap-2 pb-5">
                    {icons.map((icon, idx) => (
                        <div key={idx} className="p-2 transition duration-300 bg-white rounded-full cursor-pointer text-light-violet hover:bg-indigo-600 hover:text-white" aria-label={`${member.name} on ${icon.label}`}>{icon.icon}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
