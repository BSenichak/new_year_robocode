import React from "react";

type Props = {
  puzzle: string;
};

const SudokuGrid: React.FC<Props> = ({ puzzle }) => {
  // Розбиваємо рядок на масив чисел
  const cells = puzzle.split("").map((c) => Number(c));

  return (
    <div style={{ display: "inline-block" }}>
      {Array.from({ length: 9 }).map((_, row) => (
        <div key={row} style={{ display: "flex" }}>
          {Array.from({ length: 9 }).map((_, col) => {
            const value = cells[row * 9 + col];
            return (
              <div
                key={col}
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid black",
                  fontSize: 20,
                  backgroundColor: value === 0 ? "#fff" : "#eee",
                }}
              >
                {value !== 0 ? value : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
