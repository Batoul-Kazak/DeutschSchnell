import { WORD_TYPES } from "../../constants/lessonView"

export default function VocabularySection({ wordsFilter, setWordsFilter, filteredWords }) {

    return (
        <div id="vocabulary" className="flex flex-col w-full gap-5 mt-8">
            <h2 className="text-3xl font-bold text-my-violet">Vocabulary you will learn:</h2>
            <div className="flex w-full gap-5 py-2 font-bold rounded-lg text-my-violet place-content-center place-items-center">
                {WORD_TYPES.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setWordsFilter(key)}
                        className={`px-4 py-1 rounded-full ${wordsFilter === key ? "bg-my-red text-white" : "bg-white text-black"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap gap-3 p-5 place-content-center place-items-center">
                {filteredWords.length > 0 ? (
                    filteredWords.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex gap-5 px-2 py-1 text-white rounded-md shadow-lg bg-my-violet"
                        >
                            <span className="font-bold text-my-blue">{item.de}</span>
                            <span>{item.en}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-400">No words for this filter.</div>
                )}
            </div>
        </div>
    )
}
