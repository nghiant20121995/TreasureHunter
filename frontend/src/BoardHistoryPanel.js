import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TreasureDataService from "./dataservice/treasuredata.service";

const treasureService = new TreasureDataService();

export default function BoardHistoryPanel({ onLoadBoard }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const res = await treasureService.get("http://localhost:8386/api/treasure");
                if (res) {
                    for (let i = 0; i < res.length; i++) {
                        let map = res[i].map;
                        let parsedMap = JSON.parse(map);
                        const currentIsland = [];
                        res[i].isLands = currentIsland;
                        for (let key in parsedMap) {
                            let currentKey = Number(key);
                            if (Number(currentKey) === 0) continue; // Skip the first key if it's not needed
                            for (let j = 0; j < parsedMap[key].length; j++) {
                                var axis = parsedMap[key][j];
                                var pX = Number(axis.PositionX) - 1;
                                var pY = Number(axis.PositionY) - 1;
                                if (!(pX in currentIsland)) {
                                    currentIsland[pX] = [];
                                }
                                currentIsland[pX][pY] = currentKey;
                            }
                        }
                    }
                    let historyData = res;
                    setHistory(historyData);
                }
            } catch (e) {
                setHistory([]);
            }
            setLoading(false);
        };
        fetchHistory();
    }, []);

    const convertDateUtcToLocal = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    return (
        <Box sx={{
            position: 'fixed',
            top: 32,
            right: 32,
            width: 340,
            background: '#f7f6f3',
            p: 2,
            borderRadius: 3,
            boxShadow: '0 8px 32px 0 #bbb',
            minHeight: 400,
            maxHeight: 700,
            overflowY: 'auto',
            zIndex: 1200,
            border: '2px solid #ffe066',
            transition: 'box-shadow 0.2s',
        }}>
            <Box sx={{ fontWeight: 'bold', fontSize: 20, mb: 2, color: '#a80038', textAlign: 'center' }}>Lịch sử bảng chơi</Box>
            {loading && <Box>Đang tải...</Box>}
            {!loading && history.length === 0 && <Box sx={{ color: 'black' }}>Chưa có dữ liệu.</Box>}
            {!loading && history.map((item, idx) => (
                <Paper
                    key={idx}
                    sx={{ p: 1.5, mb: 2, borderRadius: 2, background: '#fffbe7', boxShadow: '0 1px 6px #ffe066', cursor: 'pointer', transition: 'box-shadow 0.2s', ':hover': { boxShadow: '0 4px 16px #fcb900' } }}
                    onClick={() => onLoadBoard && onLoadBoard(item)}
                >
                    <Box sx={{ fontWeight: 'bold', color: '#7b341e', mb: 1 }}>{convertDateUtcToLocal(item.createdDate) || idx + 1}</Box>
                    <Box sx={{ fontSize: 14, color: '#444', mb: 1 }}>Kho báu số: {item.treasureNumber}</Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${item.isLands[0]?.length || 0}, 24px)`, gap: 0.5, mb: 1 }}>
                        {item.isLands.map((row, i) => row.map((cell, j) => (
                            <Box key={j} sx={{ width: 24, height: 24, background: '#ede0c8', color: '#7b341e', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, border: '1px solid #eee' }}>{cell}</Box>
                        )))}
                    </Box>
                    <Box sx={{ fontSize: 13, color: '#a80038' }}>Nhiên liệu tối ưu: <b>{item.minDistance?.totalDistance}</b></Box>
                </Paper>
            ))}
        </Box>
    );
}
