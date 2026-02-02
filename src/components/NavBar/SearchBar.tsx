import { Search } from "@mui/icons-material";

interface SearchBarProps {
    query: string;
    onQueryChange: (value: string) => void;
    onFocus: () => void;
    showResults: boolean;
    results: SearchItem[];
    onResultSelect: (item: SearchItem) => void;
    searchRef: React.RefObject<HTMLDivElement>;
}

export default function SearchBar({
    query,
    onQueryChange,
    onFocus,
    showResults,
    results,
    onResultSelect,
    searchRef,
}: SearchBarProps) {
    return (
        <div className="relative" ref={searchRef}>
            <input
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onFocus={onFocus}
                placeholder="Type Something"
                className="p-2 pl-5 pr-8 bg-transparent rounded-full w-[200px] text-white placeholder:text-white/70"
            />
            <Search className="absolute text-white w-5 h-5 right-3 top-2.5" />

            {showResults && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        color: 'black',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 1000,
                        maxHeight: '250px',
                        overflowY: 'auto',
                        marginTop: '8px',
                    }}
                >
                    {results.length > 0 ? (
                        results.map((item, i) => {
                            const title =
                                item.type === 'instructor'
                                    ? item.name
                                    : item.type === 'faq'
                                        ? item.question
                                        : item.title;
                            return (
                                <div
                                    key={i}
                                    onClick={() => onResultSelect(item)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    style={{
                                        padding: '10px 16px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #eee',
                                    }}
                                >
                                    {title}
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ padding: '10px 16px', color: '#888' }}>No results found</div>
                    )}
                </div>
            )}
        </div>
    );
}