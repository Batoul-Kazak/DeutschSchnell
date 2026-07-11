import React from 'react';
import { useParams } from 'react-router-dom';

interface VocabItem {
  word: string;
  translation: string;
  gender?: 'm' | 'f' | 'n';
}

interface GrammarRule {
  title: string;
  explanation: string;
  examples: string[];
}

interface DialogLine {
  speaker: string;
  text: string;
  isUser?: boolean;
}

const Lesson_: React.FC = () => {
  const { courseId, itemId } = useParams();

  // --- Mock Data ---
  const vocabulary: VocabItem[] = [
    { word: 'der Supermarkt', translation: 'supermarket', gender: 'm' },
    { word: 'die Lebensmittel', translation: 'groceries', gender: 'f' },
    { word: 'das Obst', translation: 'fruit', gender: 'n' },
    { word: 'kaufen', translation: 'to buy' },
    { word: 'brauchen', translation: 'to need' },
    { word: 'frisch', translation: 'fresh' },
  ];

  const grammarRules: GrammarRule[] = [
    {
      title: 'Accusative Case (Direct Objects)',
      explanation:
        'When a noun is the direct object of a sentence, masculine articles change from "der" to "den". Feminine and neuter remain unchanged.',
      examples: [
        'Ich kaufe den Apfel. (masculine → den)',
        'Ich sehe die Banane. (feminine → die)',
        'Ich esse das Brot. (neuter → das)',
      ],
    },
    {
      title: 'Word Order in Main Clauses',
      explanation:
        'In a standard German sentence, the conjugated verb always stays in the second position.',
      examples: [
        'Maria geht heute in den Supermarkt.',
        'Heute geht Maria in den Supermarkt.',
        'In den Supermarkt geht Maria heute.',
      ],
    },
  ];

  const readingText = `Maria geht in den Supermarkt. Sie braucht Lebensmittel für das Wochenende. Zuerst kauft sie frisches Obst: drei Äpfel und eine Banane. Dann nimmt sie zwei Flaschen Wasser und ein Stück Käse. An der Kasse bezahlt sie mit ihrer Karte. Der Kassierer gibt ihr den Bon und sagt: "Einen schönen Tag noch!" Maria antwortet freundlich und geht nach Hause.`;

  const dialog: DialogLine[] = [
    { speaker: 'Verkäufer', text: 'Guten Tag! Kann ich Ihnen helfen?' },
    { speaker: 'Maria', text: 'Ja, bitte. Wo finde ich die Milchprodukte?', isUser: true },
    { speaker: 'Verkäufer', text: 'Die Milchprodukte sind im dritten Gang, ganz rechts.' },
    { speaker: 'Maria', text: 'Vielen Dank! Und haben Sie auch frische Brötchen?', isUser: true },
    { speaker: 'Verkäufer', text: 'Natürlich, direkt neben der Bäckerei-Theke.' },
    { speaker: 'Maria', text: 'Perfekt, danke schön!', isUser: true },
  ];

  // --- Gender Color Helper ---
  const getGenderColor = (gender?: string) => {
    switch (gender) {
      case 'm': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'f': return 'text-red-600 bg-red-50 border-red-200';
      case 'n': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 bg-white min-h-screen">
      {/* Header */}
      <header className="mb-12 border-b border-gray-200 pb-6">
        <nav className="text-sm text-gray-500 mb-3 uppercase tracking-wide font-semibold">
          Course {courseId} &rsaquo; Lesson {itemId}
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Im Supermarkt</h1>
        <p className="text-lg text-gray-500">Learn grocery shopping vocabulary, accusative case, and practice with a real-life dialog.</p>
      </header>

      {/* SECTION 1: VOCABULARY */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold text-sm">1</span>
          <h2 className="text-2xl font-bold text-gray-900">Vocabulary</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vocabulary.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${getGenderColor(item.gender)} transition-all hover:shadow-md`}>
              <div className="flex justify-between items-start mb-1">
                <span className="text-xl font-bold">{item.word}</span>
                {item.gender && (
                  <span className="text-xs font-bold uppercase opacity-70 px-2 py-0.5 rounded-full border border-current">
                    {item.gender}
                  </span>
                )}
              </div>
              <span className="text-sm opacity-80 italic">{item.translation}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: GRAMMAR */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm">2</span>
          <h2 className="text-2xl font-bold text-gray-900">Grammar</h2>
        </div>
        <div className="space-y-6">
          {grammarRules.map((rule, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{rule.title}</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{rule.explanation}</p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400 space-y-2">
                {rule.examples.map((example, eIdx) => (
                  <p key={eIdx} className="font-mono text-sm text-gray-800">{example}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: READING */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">3</span>
          <h2 className="text-2xl font-bold text-gray-900">Reading Comprehension</h2>
        </div>
        <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl border border-gray-200 shadow-sm leading-loose text-gray-800">
          {readingText.split('. ').map((sentence, idx) => (
            <span key={idx} className="inline-block mr-1 hover:bg-yellow-50 rounded px-1 transition-colors cursor-default">
              {sentence}{idx < readingText.split('. ').length - 1 ? '.' : ''}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500 italic">💡 Hover over sentences to highlight them for focused reading.</p>
      </section>

      {/* SECTION 4: DIALOG */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">4</span>
          <h2 className="text-2xl font-bold text-gray-900">Dialog Practice</h2>
        </div>
        <div className="space-y-4 max-w-2xl mx-auto">
          {dialog.map((line, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${line.isUser ? 'items-end' : 'items-start'}`}
            >
              <span className={`text-xs font-bold mb-1 px-2 ${line.isUser ? 'text-teal-600' : 'text-gray-500'}`}>
                {line.speaker}
              </span>
              <div
                className={`px-5 py-3 rounded-2xl max-w-[85%] text-base leading-relaxed ${
                  line.isUser
                    ? 'bg-teal-600 text-white rounded-tr-sm'
                    : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                }`}
              >
                {line.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 p-4 z-10">
        <div className="max-w-4xl mx-auto flex justify-end">
          <button className="px-10 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg">
            Take Quiz →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lesson_;