import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useTheme,
    alpha,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const leaderboard = [
    { place: 1, name: "CyberNinja_2024", filesDecoded: 100, points: 256 },
    { place: 2, name: "Bohdan S", filesDecoded: 78, points: 198 },
    { place: 3, name: "CodeWizard_UA", filesDecoded: 50, points: 145 },
    { place: 4, name: "SantaHelper42", filesDecoded: 45, points: 120 },
    { place: 5, name: "PuzzleSolver", filesDecoded: 38, points: 98 },
    { place: 6, name: "RoboKid_Master", filesDecoded: 32, points: 87 },
    { place: 7, name: "TechKid_Kyiv", filesDecoded: 28, points: 76 },
    { place: 8, name: "AIExplorer", filesDecoded: 24, points: 65 },
    { place: 9, name: "LogicMaster", filesDecoded: 20, points: 54 },
    { place: 10, name: "HolidayGamer", filesDecoded: 16, points: 43 },
];

export default function LeaderTable() {
    const theme = useTheme();
    let user: any = useSelector<RootState, RootState["auth"]["user"]>(
        (state) => state.auth.user
    );

    const getRowStyle = (place: number, isMe: boolean) => {
        if (place === 1) {
            return {
                background: alpha(theme.palette.warning.light, 0.5),
                borderLeft: `5px solid ${theme.palette.warning.light}`,
            };
        }
        if (place === 2) {
            return {
                background: alpha(theme.palette.grey[300], 0.5),
                borderLeft: `5px solid ${theme.palette.grey[300]}`,
            };
        }
        if (place === 3) {
            return {
                background: alpha(theme.palette.warning.dark, 0.3),
                borderLeft: `5px solid ${theme.palette.warning.dark}`,
            };
        }
        if (isMe) {
            return {
                background: alpha(theme.palette.primary.dark, 0.5),
                borderLeft: `5px solid ${theme.palette.primary.dark}`,
            };
        }
        return {};
    };
    const getNumber = (number: number) => {
        if (number === 1) {
            return "🥇";
        }
        if (number === 2) {
            return "🥈";
        }
        if (number === 3) {
            return "🥉";
        }
        return number;
    };

    return (
        <TableContainer component={Paper} sx={{ p: 2, border: "1px solid #ffffff19", borderRadius: 3 }}>
            <Table size="small" sx={{ width: "100%" }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "1rem", border: "none" }}>
                            Місце
                        </TableCell>
                        <TableCell sx={{ width: "auto", border: "none" }}>
                            Імʼя
                        </TableCell>

                        <TableCell
                            sx={{ whiteSpace: "nowrap", border: "none" }}
                            align="right"
                        >
                            Розшифровано файлів
                        </TableCell>
                        <TableCell
                            sx={{ whiteSpace: "nowrap", border: "none" }}
                            align="right"
                        >
                            Очки
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {leaderboard.map((row, index) => {
                        const isLast = index === leaderboard.length - 1;

                        return (
                            <TableRow
                                key={row.name}
                                sx={{
                                    ...getRowStyle(
                                        row.place,
                                        row.name === user?.displayName
                                    ),
                                }}
                            >
                                <TableCell
                                    sx={{
                                        borderBottom: isLast
                                            ? "none"
                                            : `1px solid ${alpha(
                                                  theme.palette.grey[300],
                                                  0.1
                                              )}`,
                                    }}
                                    align="center"
                                >
                                    {getNumber(row.place)}
                                </TableCell>

                                <TableCell
                                    sx={{
                                        borderBottom: isLast
                                            ? "none"
                                            : `1px solid ${alpha(
                                                  theme.palette.grey[300],
                                                  0.1
                                              )}`,
                                    }}
                                >
                                    {row.name}{" "}
                                    {row.name === user?.displayName && (
                                        <Typography
                                            variant="body2"
                                            component={"span"}
                                            sx={{
                                                ml: 1,
                                                color: getRowStyle(
                                                    row.place,
                                                    true
                                                ).borderLeft?.substring(10),
                                            }}
                                        >
                                            {" "}
                                            (ти тут)
                                        </Typography>
                                    )}
                                </TableCell>

                                <TableCell
                                    align="right"
                                    sx={{
                                        borderBottom: isLast
                                            ? "none"
                                            : `1px solid ${alpha(
                                                  theme.palette.grey[300],
                                                  0.1
                                              )}`,
                                    }}
                                >
                                    {row.filesDecoded}
                                </TableCell>

                                <TableCell
                                    align="right"
                                    sx={{
                                        borderBottom: isLast
                                            ? "none"
                                            : `1px solid ${alpha(
                                                  theme.palette.grey[300],
                                                  0.1
                                              )}`,
                                    }}
                                >
                                    {row.points}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
