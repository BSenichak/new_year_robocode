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
    CircularProgress,
    Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchLeaders } from "../../store/leaderboardSlice";

export default function LeaderTable() {
    const theme = useTheme();
    let user: any = useSelector<RootState, RootState["auth"]["user"]>(
        (state) => state.auth.user
    );
    let leaderboard =
        useSelector<RootState, RootState["leaderboard"]["leaders"]>(
            (state) => state.leaderboard.leaders
        ) || [];
    let dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchLeaders());
    }, []);

    const getRowStyle = (place: number, isMe: boolean) => {
        if (place === 1) {
            return {
                background: "rgba(239, 177, 0, 0.3)",
                borderLeft: `4px solid rgba(239, 177, 0, 1)`,
            };
        }
        if (place === 2) {
            return {
                background: "rgba(230, 240, 240, 0.3)",
                borderLeft: `4px solid rgba(230, 240, 240, 1)`,
            };
        }
        if (place === 3) {
            return {
                background: "rgba(255, 121, 57, 0.3)",
                borderLeft: `4px solid rgba(255, 121, 57, 1)`,
            };
        }
        if (isMe) {
            return {
                background: "rgba(255, 121, 57, 1)",
                borderLeft: `4px solid $rgba(22, 70, 255, 1)`,
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

    let loading = useSelector<RootState, RootState["leaderboard"]["loading"]>(
        (state) => state.leaderboard.loading
    );
    if (loading || !leaderboard)
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                }}
            >
                <CircularProgress />
            </Box>
        );

    return (
        <TableContainer
            component={Paper}
            sx={{ p: 2, border: "1px solid #ffffff19", borderRadius: 3 }}
        >
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
                    {leaderboard.map((row: any, index: number) => {
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
                                        color: getRowStyle(row.place, false).borderLeft?.substring(10) || "rgba(22, 70, 255, 1)",
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
