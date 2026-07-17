const items = Array.from({length: 10}, (_, i) => i);

export const RandomPositionContainer = () => {
  const generateUniquePositions = (count) => {
    const positions = new Set();
    while (positions.size < count) {
      const row = Math.floor(Math.random() * 30);
      const col = Math.floor(Math.random() * 30);
      positions.add(`${row}-${col}`);
    }
    return Array.from(positions).map(pos => {
      const [row, col] = pos.split('-').map(Number);
      return { row, col };
    });
  };

  const positions = generateUniquePositions(items.length);

  return (
    <div
      className="p-10"
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        overflow: 'hidden'
      }}
    >
      {items.map((item, index) => {
        const { row, col } = positions[index];
        const topPercent = ((row + 0.5) / 30) * 100;
        const leftPercent = ((col + 0.5) / 30) * 100;
        
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${topPercent}%`,
              left: `${leftPercent}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="border-2 border-black"
          >
            <div className="bg-blue-700 w-10 h-10 flex items-center justify-center text-white">
              {index}
            </div>
          </div>
        );
      })}
    </div>
  );
};