import { Link } from "react-router-dom";

// Define level config
interface LevelConfig {
    id: 'A1' | 'A2'; // extend to 'B1' | 'B2' later if needed
    label: string;
    title: string;
    description: string;
    timeMinutes: number;
    questionCount: number;
    color: 'blue' | 'violet'; // matches your Tailwind theme
}

const LEVELS: LevelConfig[] = [
    {
        id: 'A1',
        label: 'Anfänger',
        title: 'A1',
        description: 'Grundlegende Begrüßungen, einfache Sätze, Alltagswörter.',
        timeMinutes: 15,
        questionCount: 20,
        color: 'blue',
    },
    {
        id: 'A2',
        label: 'Fortgeschritten',
        title: 'A2',
        description: 'Vergangenheit, Modalverben, längere Gespräche.',
        timeMinutes: 20,
        questionCount: 25,
        color: 'violet',
    },
    // Add more levels here later!
    // {
    //   id: 'B1',
    //   label: 'Mittelstufe',
    //   title: 'B1',
    //   description: 'Komplexe Texte, flüssige Gespräche.',
    //   timeMinutes: 25,
    //   questionCount: 30,
    //   color: 'red', // if you add red to your theme
    // },
];

export default function SelectLevelInterface() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-yellow">
            {/* Decorative Top Accent */}
            <div className="absolute top-0 left-0 w-full h-24 bg-violet opacity-10"></div>

            <div className="w-full max-w-2xl text-center">
                <h1 className="mb-4 text-4xl font-bold md:text-5xl text-violet">
                    Deutsch Test
                </h1>

                <p className="max-w-md mx-auto mb-12 text-lg text-gray-800">
                    Wähle dein Niveau und starte den Test!
                </p>

                {/* Dynamically rendered level cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {LEVELS.map((level) => (
                        <Link key={level.id} to={`/tests/${level.id}`} className="block">
                            <div
                                className={`overflow-hidden transition-all duration-300 transform bg-white border-4 shadow-xl rounded-3xl border-${level.color} hover:shadow-2xl hover:-translate-y-2`}
                            >
                                <div className={`p-6 text-center bg-${level.color}`}>
                                    <span className="inline-block px-4 py-1 text-sm font-semibold text-white rounded-full bg-white/20 backdrop-blur-sm">
                                        {level.label}
                                    </span>
                                    <h2 className="mt-3 text-3xl font-bold text-white">{level.title}</h2>
                                </div>
                                <div className="p-6 text-gray-700">
                                    <p className="mb-4">{level.description}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>⏱️ {level.timeMinutes} Minuten</span>
                                        <span>❓ {level.questionCount} Fragen</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12">
                    <Link
                        to="/"
                        className="inline-flex items-center font-medium text-violet hover:underline"
                    >
                        ← Zurück zur Startseite
                    </Link>
                </div>
            </div>

            {/* Decorative Bottom Accent */}
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue opacity-10 -z-10"></div>
        </div>
    );
}