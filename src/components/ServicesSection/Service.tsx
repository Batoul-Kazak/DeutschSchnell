import React, { useState } from 'react'

export default function Service({ section }) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="bg-gradient-to-t from-light-violet/40 to-white/40 rounded-3xl">
            <div className="pb-4 bg-gradient-to-t from-light-violet/50 to-white/50 rounded-3xl">
                <div
                    key={section.id}
                    className="relative p-4 pt-8 rounded-3xl bg-gradient-to-t from-light-violet/50 to-gray-100/50 lg:p-8 md:p-4"
                >
                    <div className="absolute p-8 rounded-full bg-light-violet/70 -top-8 -right-8 ">
                        <img src={section.image} alt={`service-${section.id}`} className="w-12 lg:w-16 lg:h-16 md:h-12 " />
                    </div>

                    <div className="flex flex-col h-full pt-12">
                        <h3 className="text-xl font-bold text-indigo-800">{section.title}</h3>

                        <div className="mt-4 text-gray-800">
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedId === section.id
                                    ? 'max-h-[300px]'
                                    : 'max-h-16'
                                    }`}
                            >
                                {section.description}
                            </div>

                            {(section.description.split(' ').length > 25 || expandedId !== section.id) && (
                                <button
                                    onClick={() => toggleExpand(section.id)}
                                    className="block mt-2 font-medium text-white md:block sm:hidden hover:underline"
                                >
                                    {expandedId === section.id ? 'Show Less' : 'Read More'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
