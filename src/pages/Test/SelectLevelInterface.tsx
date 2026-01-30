import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import bannerImage from "./../../../public/images/banner-bg.jpg"

interface LevelMetadata {
    label: string;
    title: string;
    description: string;
    timeMinutes: number;
    questionCount: number;
    color: string;
}

type LevelId = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export default function SelectLevelInterface() {
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ['levelMetadata'],
        queryFn: () =>
            fetch('/data/level-metadata.json').then(res => {
                if (!res.ok) throw new Error('Failed to load level info');
                return res.json() as Promise<Record<LevelId, LevelMetadata>>;
            }),
        staleTime: Infinity,
    });

    const handleSelect = (levelId: LevelId) => {
        navigate(`/tests/${levelId}`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-my-yellow">
                <div className="text-my-violet">Lädt Niveaus...</div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-my-yellow">
                <div className="text-my-red">Fehler beim Laden der Testniveaus.</div>
            </div>
        );
    }

    const levels = Object.entries(data).map(([id, config]) => ({
        id: id as LevelId,
        ...config,
    }));

    return (
        <div className="relative min-h-screen">
            {/* Background image with fixed attachment */}
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: 'url(/images/background2.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            />

            {/* Dark overlay */}
            <div className="fixed inset-0 -z-10 bg-black/50"></div>

            {/* Content container */}
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="absolute top-0 left-0 w-full h-24 bg-my-violet opacity-10"></div>

                <div className="w-full max-w-4xl text-center">
                    <h2 className="max-w-md p-10 mx-auto mb-12 text-3xl text-white">
                        Choose your level and start the test!
                    </h2>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {levels.map((level) => (
                            <div
                                key={level.id}
                                onClick={() => handleSelect(level.id)}
                                className="cursor-pointer"
                            >
                                <div
                                    className={`overflow-hidden transition-all duration-300 transform h-[300px]  bg-white border-4 rounded-3xl hover:-translate-y-2`}
                                    style={{ border: `5px solid ${level.color}` }}
                                >
                                    <div className={`p-6 text-center`} style={{ backgroundColor: level.color }}>
                                        <span className="inline-block px-4 py-1 text-sm font-semibold text-white rounded-full bg-white/20 backdrop-blur-sm">
                                            {level.label}
                                        </span>
                                        <h2 className="mt-3 text-3xl font-bold text-white">{level.title}</h2>
                                    </div>
                                    <div className="flex flex-col justify-between p-6 text-gray-700">
                                        <p className="mb-4">{level.description}</p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>⏱️ {level.timeMinutes} Minuten</span>
                                            <span>❓ {level.questionCount} Fragen</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Link
                            to="/"
                            className="inline-flex items-center p-10 text-2xl font-medium text-white hover:underline"
                        >
                            Go To Home Page
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-my-blue opacity-10 -z-10"></div>
            </div>
        </div>
    );
}