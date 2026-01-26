import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";

type Word = { german: string; english: string; type: string };
type DialogueLine = { person: string; german: string; english: string };
type GrammarRow = Record<string, string>;
type GrammarSection = {
    title: string;
    type: string;
    note?: string;
    rows: GrammarRow[];
};

type Lesson = {
    id: string;
    course: string;
    lessonNumber: number;
    title: string;
    description: string;
    time: string;
    skills: string[];
    tags: string[];
    words: Word[];
    dialogue: DialogueLine[];
    grammars: GrammarSection[];
};

const WORD_TYPES = [
    { key: "all", label: "All" },
    { key: "verbs", label: "Verbs", type: "Verb" },
    { key: "nouns", label: "Nouns", type: "Noun" },
    { key: "adjectives", label: "Adjectives", type: "Adjective" },
    { key: "adverbs", label: "Adverbs", type: "Adverb" },
    { key: "prepositions", label: "Prepositions", type: "Preposition" },
    { key: "conjunctions", label: "Conjunctions", type: "Conjunction" },
    { key: "interjections", label: "Interjections", type: "Interjection" },
];

// const fetchLesson = async (courseId: string, lessonId: string) => {
//     const res = await fetch("/data/db.json");

//     if (!res.ok) {
//         throw new Error("Failed to fetch lessons");
//     }

//     const lessons = await res.json();
//     console.log(lessons);

//     const fullLessonTitle = `Lesson ${lessonId}`;

//     const found = lessons.find(
//         (l: any) => l.course === courseId && l.lessons === fullLessonTitle
//     );

//     if (!found) {
//         throw new Error("Lesson not found");
//     }

//     return found;
// };


const LessonView = () => {
    const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>();
    const [wordsFilter, setWordsFilter] = useState("all");
    const [filteredWords, setFilteredWords] = useState<Word[]>([])

    const { data: lesson, isLoading, error } = useQuery<Lesson>({
        queryKey: ["lesson", courseId, lessonId],
        queryFn: async () => {
            const url = "/data/db.json";
            // const url = `http://localhost:3004/lessons?course=${courseId}&lessonNumber=${lessonId}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Lesson not found");
            const data = await res.json();
            return data.lessons[0];
        },
        enabled: !!courseId && !!lessonId,
        // staleTime: 60 * 1000 * 5
        retry: 1,
    })

    useEffect(() => {
        if (!lesson) {
            setFilteredWords([]);
            return;
        }

        if (wordsFilter === "all") {
            setFilteredWords(lesson.words);
        } else {
            const typeMap: Record<string, string> = {
                verbs: "Verb",
                nouns: "Noun",
                adjectives: "Adjective",
                adverbs: "Adverb",
                prepositions: "Preposition",
                conjunctions: "Conjunction",
                interjections: "Interjection",
            };
            const targetType = typeMap[wordsFilter] || wordsFilter;
            setFilteredWords(lesson.words.filter(w => w.type === targetType));
        }
    }, [lesson, wordsFilter]);



    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading lesson</div>

    return <div className="relative flex flex-col gap-20 p-10 pt-20 place-items-center">
        <Link to="/" className="absolute px-4 py-2 font-bold text-white top-2 left-2 bg-yellow">Go Back to Home Page</Link>
        <h1 className="text-4xl">Lesson 1: <span className="text-[2.4rem] text-red font-bold">Greetings and Introductions</span> </h1>
        <p className="text-xl">This lesson will teach you essential German vocabulary, basic grammar structures, and simple spoken sentences through practical dialogues. You’ll learn how to greet others, introduce yourself, ask and answer basic personal questions, and use polite expressions in everyday conversations.</p>
        <div className="flex flex-col w-full gap-5">
            <h2 className="text-3xl font-bold text-violet">Vocabulary you will learn:</h2>
            <div className="flex w-full gap-5 py-2 font-bold rounded-lg text-violet text-violetbg-violet place-content-center place-items-center">
                {WORD_TYPES.map(({ key, label }) =>
                    <button key={key} onClick={() => setWordsFilter(key)} className={`px-4 py-1 rounded-full ${wordsFilter === key ? "bg-red text-white" : "bg-white"} `}>{label}</button>
                )}
            </div>
            <div className="flex flex-wrap gap-3 p-5 place-content-center place-items-center">
                {filteredWords.length ? filteredWords.map(item => <div className="flex gap-5 px-2 py-1 text-white rounded-md shadow-lg bg-violet text-violetbg-violet ">
                    <span className="font-bold text-blue">{item.german}</span>
                    <span className="">{item.english}</span>
                </div>) : "No words."}</div>

            <div className="flex flex-col gap-5 pt-10 place-content-center place-items-center">
                <h2 className="text-3xl font-bold text-violet">Dialogue</h2>
                <p className="p-5 text-gray-800">Two people, Anna (A) and Ben (B), meet and greet each other in German. They exchange basic introductions sharing their names, countries of origin (Austria and Switzerland), ages, and languages spoken. They comment on the city, their first day, and express friendly interest in one another. The conversation ends with polite goodbyes for the evening and night. The dialogue covers essential A1-level phrases for greetings, self-introduction, and simple everyday questions.</p>
                <div className="flex flex-col gap-5 sm:w-[80%]">
                    {lesson?.dialogue.map((item, i) =>
                        <div className={`  flex flex-col ${item.person === 'A' ? "place-self-start" : " place-self-end"} `}>
                            <div className="flex gap-2">
                                <div className={`w-[3rem] h-[3rem] ${item.person === 'A' ? "border-l-rose-700" : "border-l-blue-700"} border-[10px] hover:scale-110 cursor-pointer transition duration-300 flex place-content-center place-items-center font-bold bg-red-500 rounded-full`}>{item.person}</div>
                                <div className={`p-4 rounded-3xl hover:scale-105 transition duration-300 shadow-2xl ${i % 2 == 0 ? "bg-red text-white" : "bg-yellow"} `}>
                                    <div className="text-xl">{item.german}</div>
                                    <div className={i % 2 == 0 ? "text-gray-300" : "text-gray-700"}>{item.english}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-10">
                <h2 className="text-3xl font-bold text-violet">Grammar</h2>
                {lesson?.grammars.map((section, idx) => (
                    <div key={idx} className="mb-10">
                        <h3 className="mb-3 text-xl font-bold text-blue">{section.title}</h3>
                        {section.note && <p className="mb-2 text-sm text-gray-600">{section.note}</p>}

                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200">
                                <thead>
                                    <tr className="text-white bg-blue">
                                        {Object.keys(section.rows[0]).map(key => (
                                            <th key={key} className="px-3 py-2 text-left border">
                                                {key === 'de' ? 'German' : key === 'en' ? 'English' : key}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {section.rows.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "text-violetbg-violet text-white"}>
                                            {Object.values(row).map((val, j) => (
                                                <td key={j} className="px-3 py-2 border">
                                                    {val}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
            {/* <table> */}
            {/* {words.map(item => */}
            {/* <tr> */}
            {/* <td>{item.german}</td> */}
            {/* <td>{item.english}</td> */}
            {/* </tr>)} */}
            {/* </table> */}
        </div>
        <BackToTopButton />
    </div>
}

export default LessonView;


