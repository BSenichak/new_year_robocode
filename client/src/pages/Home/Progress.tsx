import styled from "@emotion/styled";
import {
    Box,
    Card,
    CardContent,
    Typography,
    LinearProgress,
} from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchLeaderboardStats } from "../../store/leaderboardSlice";

export default function Progress() {
    return (
        <Wrapper>
            <Background />
            <Box sx={{ zIndex: 1 }}>
                <Typography variant="h2" color="info.light" textAlign="center">
                    План порятунку{" "}
                    <Box component="span" style={{ color: "white" }}>
                        {" "}
                        вже працює
                    </Box>
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ my: 3 }}
                >
                    Файли повертаються, грінч-хакери нервують. Скільки
                    залишилось – показує індикатор. Долучайся до команди
                    помічників!
                </Typography>
                <ProgressCard />
            </Box>
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    gap: 1 rem;
    padding: 80px 0;
`;

let ProgressBar = styled(Box)`
    width: 100%;
`;

const ProgressWrapper = styled("div")(({ theme }: any) => ({
    borderRadius: "16px",
    margin: "16px 0",
    backgroundColor: theme.palette.background.paper,
    animation: "glowingBlue 2s ease-in-out infinite",
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }: any) => ({
    height: "16px",
    borderRadius: "16px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.background.paper,
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main,
    },
}));

let Background = styled(Box)`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100vw;
    z-index: 0;
    background-color: ${({ theme }: any) => theme.palette.background.paper};
`;

export function ProgressCard() {
    let dispatch = useDispatch<AppDispatch>();
    let stats = useSelector<RootState, RootState["leaderboard"]["stats"]>(
        (state) => state.leaderboard.stats
    );
    useEffect(() => {
        if (!stats) dispatch(fetchLeaderboardStats());
    }, [stats]);
    const totalFiles = 10000; 
    const completedFiles = stats?.totalDecodeCount || 0;
    const remainingFiles = totalFiles - completedFiles;
    const progressPercent = Math.min(
        100,
        Math.round((completedFiles / totalFiles) * 100)
    );
    return (
        <Card
            sx={{
                width: "100%",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "24px",
                p: "12px",
            }}
        >
            <CardContent sx={{ display: "flex", gap: "16px" }}>
                <ProgressBar>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h5">Прогрес спільноти</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {progressPercent}% завершено
                        </Typography>
                    </Box>
                    <ProgressWrapper>
                        <BorderLinearProgress
                            variant="determinate"
                            value={progressPercent}
                        />
                    </ProgressWrapper>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="body2" color="success">
                            Врятовано: {completedFiles.toLocaleString()} файлів
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Залишилось: {remainingFiles.toLocaleString()}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "1rem",
                            marginTop: "1rem",
                        }}
                    >
                        <Card
                            sx={{
                                backgroundColor: "#2a2a3a",
                                flexGrow: 1,
                                padding: "0.5rem",
                                borderRadius: "12px",
                            }}
                        >
                            <Typography
                                variant="h2"
                                color="success.light"
                                textAlign="center"
                            >
                                {stats?.totalPlayers || 0}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                textAlign="center"
                            >
                                Гравців
                            </Typography>
                        </Card>
                        <Card
                            sx={{
                                backgroundColor: "#2a2a3a",
                                flexGrow: 1,
                                padding: "0.5rem",
                                borderRadius: "12px",
                            }}
                        >
                            <Typography
                                variant="h2"
                                color="warning"
                                textAlign="center"
                            >
                                {stats?.todayDecodeCount || 0}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                textAlign="center"
                            >
                                Сьогодні
                            </Typography>
                        </Card>
                        <Card
                            sx={{
                                backgroundColor: "#2a2a3a",
                                flexGrow: 1,
                                padding: "0.5rem",
                                borderRadius: "12px",
                            }}
                        >
                            <Typography
                                variant="h2"
                                color="primary"
                                textAlign="center"
                            >
                                {Math.ceil(
                                    (new Date("2026-01-01").getTime() -
                                        new Date().getTime()) /
                                        (1000 * 60 * 60 * 24)
                                )}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                textAlign="center"
                            >
                                Дні до свята
                            </Typography>
                        </Card>
                    </Box>
                </ProgressBar>
            </CardContent>
        </Card>
    );
}
