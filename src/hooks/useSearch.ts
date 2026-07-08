import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { SearchItem } from '../types/Search';
import { searchData } from './../../public/data/SearchData';

export function useSearch() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  // const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const q = query.toLowerCase();
    const matches = searchData.filter((item) => {
      let title = '';
      let excerpt = '';

      switch (item.type) {
        case 'lesson':
          title = item.title;
          excerpt = item.excerpt;
          break;
        case 'event':
          title = item.title;
          excerpt = item.excerpt;
          break;
        case 'instructor':
          title = item.name;
          excerpt = item.role;
          break;
        case 'page':
          title = item.title;
          excerpt = item.excerpt;
          break;
        case 'faq':
          title = item.question;
          excerpt = item.answer;
          break;
      }

      return title.toLowerCase().includes(q) || excerpt.toLowerCase().includes(q);
    }).slice(0, 5);

    setResults(matches);
    setShowResults(true);
  }, [query]);

  

  return {
    query,
    setQuery,
    results,
    showResults,
    setShowResults,
    searchRef,
    // handleSelect,
  };
}