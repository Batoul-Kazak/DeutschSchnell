const items = [
  { label: 'A', position: { row: 5, col: 10 } },
  { label: 'B', position: { row: 15, col: 20 } },
  { label: 'C', position: { row: 25, col: 5 } }
];

export const GridContainer = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(15, 1fr)',
          gridTemplateRows: 'repeat(15, 1fr)',
          border: '2px solid black',
          position: 'relative'
        }}
        className="w-[80%] h-[80%]"
      >
        {Array.from({ length: 900 }, (_, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #eee'
            }}
          />
        ))}

        {items.map((item, index) => {
          const row = item.position.row;
          const col = item.position.col;
          
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: `${(row / 15) * 100}%`,
                left: `${(col / 15) * 100}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10
              }}
            >
              <div className="bg-blue-700 w-10 h-10 flex items-center justify-center text-white rounded">
                {item.label || index}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};