import { useEffect, useState } from "react";

type Word = { de: string; en: string; category: string };
type DialogueLine = { personID: string; personName: string; de: string; en: string };

type Lesson = {
  vocabulary: Word[];
  dialogue: Array<{ personID: string; personName: string; phrases: Array<{ de: string; en: string }> }>;
};

export const useLessonData = (currentLesson: Lesson | null, wordsFilter: string) => {
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [flattenedDialogue, setFlattenedDialogue] = useState<DialogueLine[]>([]);

  useEffect(() => {
    if (!currentLesson) {
      setFilteredWords([]);
      setFlattenedDialogue([]);
      return;
    }

    const flatDialog: DialogueLine[] = [];
    currentLesson.dialogue.forEach((entry) =>
      entry.phrases.forEach((phrase) =>
        flatDialog.push({ personID: entry.personID, personName: entry.personName, de: phrase.de, en: phrase.en })
      )
    );
    setFlattenedDialogue(flatDialog);

    if (wordsFilter === "all") {
      setFilteredWords(currentLesson.vocabulary);
    } else {
      const typeMap: Record<string, string> = {
        verbs: "Verbs",
        nouns: "Nouns",
        adjectives: "Adjectives",
        adverbs: "Adverbs",
        prepositions: "Prepositions",
        conjunctions: "Conjunctions",
        interjections: "Interjections",
      };
      const targetType = typeMap[wordsFilter] || wordsFilter;
      setFilteredWords(
        currentLesson.vocabulary.filter((w) => w.category === targetType)
      );
    }
  }, [currentLesson, wordsFilter]);

  return { filteredWords, flattenedDialogue };
};