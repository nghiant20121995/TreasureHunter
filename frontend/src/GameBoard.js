import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TreasureDataService from "./dataservice/treasuredata.service";
import treasureIcon from './treasure.svg'; // Adjust the path as necessary

const treasureService = new TreasureDataService();

const board = [
  [3, 2, 2],
  [2, 2, 2],
  [2, 2, 1]
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
// Default treasure number

function getTileColor(value) {
  return tileColors[value] || "#3c3a32";
}

export default function GameBoard() {
  const [boardState, setBoardState] = React.useState(board);
  const [width, setWidth] = React.useState(board[0].length);
  const [height, setHeight] = React.useState(board.length);
  const [treasureNumber, setTreasureNumber] = React.useState(3);
  const [apiMessage, setApiMessage] = React.useState("");

  const handleChange = (i, j, value, e) => {
    if (!value || isNaN(value) || value <= 0) {
      e.preventDefault();
      return;
    }
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

  const handleSubmit = async () => {
    try {
      setApiMessage("Đang gửi dữ liệu...");
      var rs = await treasureService.post("https://localhost:8386/api/treasure", { IsLands: boardState, TreasureNumber: treasureNumber });
      if (rs) {
        setApiMessage("Năng lượng tối ưu để tim kho báu: " + rs.fuelConsumed);
      } else {
        setApiMessage("Unexpected response from API.");
      }
    } catch (error) {
      setApiMessage("Failed to submit board: " + error.message);
    }
  };

  const handleTreasureChange = (e) => {
    let newTreasureNumber = Number(e.target.value);
    setTreasureNumber(newTreasureNumber);
  }

  return (
    <Box
      sx={{
        display: "inline-block",
        background: "#bbada0",
        p: 3,
        borderRadius: 10,
        minWidth: 140,
        minHeight: 140,
        boxShadow: '0 8px 80px 0 #ffffff',
      }}
    >
      {apiMessage && (
        <Box
          sx={{
            background: '#fffbe7',
            color: '#a80038',
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center',
            borderRadius: 4,
            p: 3,
            boxShadow: '0 8px 40px 0 rgba(246, 65, 108, 0.18), 0 2px 16px 0 #fffbe7',
            letterSpacing: 1.5,
            fontSize: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            minHeight: 64,
            maxWidth: 600,
            mx: 'auto',
            mt: 3,
            border: '3px solid #ffe066',
            transition: 'all 0.3s',
            position: 'relative',
            zIndex: 10,
            animation: 'pop-in 0.5s cubic-bezier(.68,-0.55,.27,1.55)'
          }}
        >
          <span role="img" aria-label="celebrate" style={{fontSize: 38, marginRight: 16, filter: 'drop-shadow(0 2px 4px #ffe066)'}}>🎉</span>
          {apiMessage}
        </Box>
      )}
      {/* Add pop-in animation */}
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span style={{ color: '#fff', fontSize: 14 }}>Chiều ngang:</span>
        <TextField
          type="number"
          size="small"
          value={width}
          onChange={handleWidthChange}
          inputProps={{
            min: 1,
            style: { width: 40, fontSize: 12, textAlign: 'center' },
            onKeyDown: (e) => {
              if (
                (e.key.length === 1 && !/[0-9]/.test(e.key)) ||
                e.key === '-' ||
                e.key === 'e'
              ) {
                e.preventDefault();
              }
            }
          }}
          sx={{ background: '#eee4da', borderRadius: 1 }}
        />
        <span style={{ color: '#fff', fontSize: 14 }}>Chiều dọc:</span>
        <TextField
          type="number"
          size="small"
          value={height}
          onChange={handleHeightChange}
          inputProps={{
            min: 1,
            style: { width: 40, fontSize: 12, textAlign: 'center' },
            onKeyDown: (e) => {
              if (
                (e.key.length === 1 && !/[0-9]/.test(e.key)) ||
                e.key === '-' ||
                e.key === 'e'
              ) {
                e.preventDefault();
              }
            }
          }}
          sx={{ background: '#eee4da', borderRadius: 1 }}
        />
        <span style={{ color: '#fff', fontSize: 14 }}>Kho báu số:</span>
        <TextField
          type="number"
          size="small"
          value={treasureNumber}
          onChange={handleTreasureChange}
          inputProps={{
            min: 1,
            style: { width: 40, fontSize: 12, textAlign: 'center' },
            onKeyDown: (e) => {
              if (
                (e.key.length === 1 && !/[0-9]/.test(e.key)) ||
                e.key === '-' ||
                e.key === 'e'
              ) {
                e.preventDefault();
              }
            }
          }}
          sx={{ background: '#eee4da', borderRadius: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ ml: 2 }}
          onClick={handleSubmit}
        >
          Tìm kho báu
        </Button>
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
                fontSize: 40,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                boxSizing: "border-box",
                transition: "background 0.2s",
                p: 0,
                minWidth: 0,
                ":hover": {
                  background: cell > 0 ? "#f2b179" : "#cdc1b4",
                  cursor: "pointer",
                },
                position: "relative",
              }}
            >
              {cell === treasureNumber && (
                <img src={treasureIcon} alt="Treasure" style={{ top: 0, right: 0, width: '20%', height: '20%', padding: '10px', display: 'block', position: 'absolute', margin: '0 auto 12px auto' }} />
              )}
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
                  fontSize: 40,
                  fontWeight: "bold",
                  color: cell > 4 ? "#f9f6f2" : "#776e65",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
                onBlur={e => handleChange(i, j, e.target.innerText, e)}
                onKeyDown={e => {
                  // Prevent a-z, negative, and non-numeric input
                  if (
                    (e.key.length === 1 && !/[0-9]/.test(e.key)) ||
                    e.key === '-' ||
                    e.key === 'e'
                  ) {
                    e.preventDefault();
                  }
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