import { useState } from 'react'

import { useQuery } from '@tanstack/react-query';

const fetchWordDefinition = async ({ language, currentWord }: { language: string, currentWord: string }) => {
    const response = await fetch(`https://freedictionaryapi.com/api/v1/entries/${language}/${currentWord.trim()}?translations=true`);


    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Not Found");
        }
        throw new Error("Faild to fetch word definition")
    }

    const data = await response.json();
    console.log(data)
    return data;
}

interface TranslationProps {
    currentWord: string; language: string;
}

const Translation = ({ language }: TranslationProps) => {
    const [searchValue, setSearchValue] = useState("");
    const [currentWord, setCurrentWord] = useState("");

    const { data: wordData, isLoading, error } = useQuery({
        queryKey: ["dictionary", language, currentWord],
        queryFn: () => fetchWordDefinition({ language, currentWord }),
        enabled: !!currentWord.trim(),
        staleTime: 1000 * 60 * 10,
    });

    function handleSearch() {
        if (searchValue.trim()) {
            setCurrentWord(searchValue.trim())
        }
    }

    return (
        <div className="p-4 mt-4 rounded-lg bg-gray-50">
            <div>
                <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Search for a word...' />
                <button disabled={isLoading} onClick={handleSearch}>Search</button>
            </div>

            {isLoading && <div>Searching...</div>}
            {error && <div>Error {(error as Error).message}</div>}

            {wordData && wordData.entries?.[0].forms?.map((form, index) => (
                <div key={index}>
                    <strong>Form: {index + 1}</strong> <code>{form.word}</code>
                    <div className='flex gap-5'>
                        Tags: {form.tags.map((tag, i) => (
                            <span key={i}>{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Translation;