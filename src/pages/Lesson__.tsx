import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// --- Types ---
interface VocabItem {
  id: string;
  word: string;
  translation: string;
  gender?: 'm' | 'f' | 'n';
  audioUrl?: string;
}

interface GrammarRule {
  title: string;
  explanation: string;
  examples: { german: string; english: string }[];
  note?: string;
}

interface DialogLine {
  speaker: string;
  text: string;
  translation: string;
}

// --- Mock Data (Replace with your JSON fetch) ---
const MOCK_LESSON_DATA = {
  title: "Lektion 3: Im Supermarkt",
  description: "Learn how to shop for groceries, understand articles, and handle basic conversations at the market.",
  vocabulary: [
    { id: '1', word: 'der Apfel', translation: 'the apple', gender: 'm' },
    { id: '2', word: 'die Banane', translation: 'the banana', gender: 'f' },
    { id: '3', word: 'das Brot', translation: 'the bread', gender: 'n' },
    { id: '4', word: 'die Milch', translation: 'the milk', gender: 'f' },
    { id: '5', word: 'kaufen', translation: 'to buy' },
    { id: '6', word: 'bezahlen', translation: 'to pay' },
  ] as VocabItem[],
  grammar: [
    {
      title: "Definite Articles (Der, Die, Das)",
      explanation: "Every German noun has a gender. The definite article changes based on this gender.",
      examples: [
        { german: "Der Mann ist groß.", english: "The man is tall." },
        { german: "Die Frau trinkt Wasser.", english: "The woman drinks water." },
        { german: "Das Kind spielt.", english: "The child plays." }
      ],
      note: "Always learn the article together with the noun!"
    },
    {
      title: "Accusative Case (Direct Objects)",
      explanation: "When you buy something, that item becomes the direct object. 'Der' changes to 'Den'.",
      examples: [
        { german: "Ich kaufe den Apfel.", english: "I buy the apple." },
        { german: "Sie hat die Milch.", english: "She has the milk." }
      ]
    }
  ] as GrammarRule[],
  reading: {
    title: "Einkaufen am Samstag",
    content: [
      "Am Samstag geht Maria in den Supermarkt. Sie braucht viele Lebensmittel für das Wochenende.",
      "Zuerst nimmt sie einen Korb. Dann geht sie zur Obst- und Gemüseabteilung. Sie kauft drei Äpfel, zwei Bananen und eine Tüte Tomaten.",
      "Danach sucht sie die Backwaren. Das Brot sieht sehr frisch aus. Sie nimmt ein Vollkornbrot und vier Brötchen.",
      "An der Kasse bezahlt sie mit Karte. Der Kassierer fragt: \"Brauchen Sie eine Tüte?\" Maria antwortet: \"Nein, danke. Ich habe meine eigene Tasche.\""
    ],
    questions: [
      "Was kauft Maria zuerst?",
      "Wie bezahlt Maria?",
      "Nimmt Maria eine Tüte vom Kassierer?"
    ]
  },
  dialog: {
    title: "Beim Bäcker",
    lines: [
      { speaker: "Verkäufer", text: "Guten Morgen! Was darf es sein?", translation: "Good morning! What can I get you?" },
      { speaker: "Kunde", text: "Guten Morgen. Ich hätte gern zwei Croissants und ein Baguette.", translation: "Good morning. I'd like two croissants and a baguette." },
      { speaker: "Verkäufer", text: "Sehr gerne. Soll ich das Baguette schneiden?", translation: "Certainly. Should I slice the baguette?" },
      { speaker: "Kunde", text: "Nein, danke. Am Stück bitte. Was kostet das?", translation: "No, thanks. Whole please. How much is that?" },
      { speaker: "Verkäufer", text: "Das macht 4 Euro 50. Bar oder mit Karte?", translation: "That's 4 euros 50. Cash or card?" }
    ] as DialogLine[]
  }
};

// --- Sub-Components ---

const SectionHeader: React.FC<{ number: string; title: string; color: string }> = ({ number, title, color }) => (
  <div className={`flex items-center gap-4 mb-8 pb-4 border-b-2 ${color}`}>
    <span className={`text-4xl font-black ${color.replace('border-', 'text-')} opacity-30`}>{number}</span>
    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
  </div>
);

const VocabCard: React.FC<{ item: VocabItem }> = ({ item }) => {
  const genderColor = item.gender === 'm' ? 'text-blue-600 bg-blue-50' : 
                      item.gender === 'f' ? 'text-red-600 bg-red-50' : 
                      'text-green-600 bg-green-50';
  
  return (
    <div className="group relative p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${genderColor}`}>
          {item.gender || 'verb'}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.word}</h3>
      <p className="text-gray-500 text-lg">{item.translation}</p>
    </div>
  );
};

const GrammarBlock: React.FC<{ rule: GrammarRule }> = ({ rule }) => (
  <div className="mb-10 p-8 bg-gray-50 rounded-2xl border border-gray-200">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">{rule.title}</h3>
    <p className="text-lg text-gray-700 mb-6 leading-relaxed">{rule.explanation}</p>
    
    <div className="space-y-3">
      {rule.examples.map((ex, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
          <span className="font-semibold text-gray-900">{ex.german}</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="text-gray-500 italic">{ex.english}</span>
        </div>
      ))}
    </div>

    {rule.note && (
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 rounded-r-lg">
        <span className="font-bold">Tip:</span> {rule.note}
      </div>
    )}
  </div>
);

// --- Main Component ---

const Lesson__: React.FC = () => {
  const { courseId, itemId } = useParams();
  const data = MOCK_LESSON_DATA; // Replace with useQuery hook

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Header */}
      <header className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">
            Course {courseId} &bull; Lesson {itemId}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{data.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">{data.description}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 -mt-8">
        
        {/* SECTION 1: VOCABULARY */}
        <section className="mb-20 pt-12">
          <SectionHeader number="01" title="Wortschatz (Vocabulary)" color="border-blue-500" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.vocabulary.map(item => <VocabCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* SECTION 2: GRAMMAR */}
        <section className="mb-20">
          <SectionHeader number="02" title="Grammatik (Grammar)" color="border-purple-500" />
          {data.grammar.map((rule, idx) => <GrammarBlock key={idx} rule={rule} />)}
        </section>

        {/* SECTION 3: READING */}
        <section className="mb-20">
          <SectionHeader number="03" title="Lesen (Reading)" color="border-green-500" />
          <article className="prose prose-lg max-w-none mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{data.reading.title}</h3>
            {data.reading.content.map((para, i) => (
              <p key={i} className="text-gray-700 leading-loose mb-4">{para}</p>
            ))}
          </article>
          
          <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
            <h4 className="text-xl font-bold text-green-900 mb-4">Comprehension Check</h4>
            <ul className="space-y-3">
              {data.reading.questions.map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-green-900">
                  <span className="font-bold mt-0.5">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 4: DIALOG */}
        <section className="mb-20">
          <SectionHeader number="04" title="Dialog (Conversation)" color="border-orange-500" />
          <div className="space-y-6">
            {data.dialog.lines.map((line, i) => {
              const isCustomer = line.speaker === 'Kunde';
              return (
                <div key={i} className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}>
                  <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide px-2">
                    {line.speaker}
                  </span>
                  <div className={`max-w-[85%] p-5 rounded-2xl ${
                    isCustomer 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-900 rounded-tl-none'
                  }`}>
                    <p className="text-lg font-medium mb-1">{line.text}</p>
                    <p className={`text-sm ${isCustomer ? 'text-blue-200' : 'text-gray-500'}`}>
                      {line.translation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Lesson__;