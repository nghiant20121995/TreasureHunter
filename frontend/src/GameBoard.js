import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const board = [
  [32, 64, 8192, 16384],
  [16, 128, 4096, 32768],
  [8, 256, 2048, 65536],
  [4, 512, 1024, 131072],
];

const tileColors = {
  0: "#cdc1b4",
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#edc850",
  1024: "#edc53f",
  2048: "#edc22e",
  4096: "#3c3a32",
  8192: "#3c3a32",
  16384: "#3c3a32",
  32768: "#3c3a32",
  65536: "#3c3a32",
  131072: "#3c3a32",
};

function getTileColor(value) {
  return tileColors[value] || "#3c3a32";
}

export default function GameBoard() {
  const [boardState, setBoardState] = React.useState(board);
  const [width, setWidth] = React.useState(board[0].length);
  const [height, setHeight] = React.useState(board.length);

  const handleChange = (i, j, value) => {
    const newBoard = boardState.map((row, rowIdx) =>
      row.map((cell, colIdx) =>
        rowIdx === i && colIdx === j ? Number(value) || 0 : cell
      )
    );
    setBoardState(newBoard);
  };

  const handleWidthChange = (e) => {
    let newWidth = Math.max(1, Number(e.target.value) || 1);
    setWidth(newWidth);
    setBoardState(prev =>
      prev.map(row => {
        if (row.length < newWidth) {
          return [...row, ...Array(newWidth - row.length).fill(0)];
        } else if (row.length > newWidth) {
          return row.slice(0, newWidth);
        }
        return row;
      })
    );
  };

  const handleHeightChange = (e) => {
    let newHeight = Math.max(1, Number(e.target.value) || 1);
    setHeight(newHeight);
    setBoardState(prev => {
      let newBoard = [...prev];
      if (newBoard.length < newHeight) {
        // Add new rows
        const widthToUse = width;
        for (let i = newBoard.length; i < newHeight; i++) {
          newBoard.push(Array(widthToUse).fill(0));
        }
      } else if (newBoard.length > newHeight) {
        // Remove rows
        newBoard = newBoard.slice(0, newHeight);
      }
      return newBoard;
    });
  };

  return (
    <Box
      sx={{
        display: "inline-block",
        background: "#bbada0",
        p: 1,
        borderRadius: 2,
        minWidth: 140,
        minHeight: 140,
      }}
    >
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span style={{ color: '#fff', fontSize: 12 }}>Width:</span>
        <TextField
          type="number"
          size="small"
          value={width}
          onChange={handleWidthChange}
          inputProps={{ min: 1, style: { width: 40, fontSize: 12, textAlign: 'center' } }}
          sx={{ background: '#eee4da', borderRadius: 1 }}
        />
        <span style={{ color: '#fff', fontSize: 12 }}>Height:</span>
        <TextField
          type="number"
          size="small"
          value={height}
          onChange={handleHeightChange}
          inputProps={{ min: 1, style: { width: 40, fontSize: 12, textAlign: 'center' } }}
          sx={{ background: '#eee4da', borderRadius: 1 }}
        />
      </Box>
      {boardState.slice(0, height).map((row, i) => (
        <Box key={i} sx={{ display: "flex" }}>
          {row.slice(0, width).map((cell, j) => (
            <Paper
              key={j}
              elevation={6}
              sx={{
                flex: 1,
                aspectRatio: '1 / 1',
                m: 0.1,
                background: getTileColor(cell),
                color: cell > 4 ? "#f9f6f2" : "#776e65",
                fontSize: 10,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                boxSizing: "border-box",
                transition: "background 0.2s",
                p: 0,
                minWidth: 0,
              }}
            >
              <div
                contentEditable
                suppressContentEditableWarning
                style={{
                  width: "100%",
                  height: "100%",
                  outline: "none",
                  border: "none",
                  background: "transparent",
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: "bold",
                  color: cell > 4 ? "#f9f6f2" : "#776e65",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
                onBlur={e => handleChange(i, j, e.target.innerText)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.target.blur();
                  }
                }}
                dangerouslySetInnerHTML={{ __html: cell }}
              />
            </Paper>
          ))}
        </Box>
      ))}
    </Box>
  );
}