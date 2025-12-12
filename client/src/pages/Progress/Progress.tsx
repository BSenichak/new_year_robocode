import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getProgress } from "../../store/resultsSlice";
import { logout } from "../../store/authReducer";
import {
    Box,
    Typography,
    Card,
    CardContent,
    useTheme,
    alpha,
    styled,
    Avatar,
    Button,
    useMediaQuery,
} from "@mui/material";
import NotAuth from "./NotAuth";
import { useNavigate } from "react-router-dom";
import { Share, Logout } from "@mui/icons-material";
import { useState } from "react";
import ShareModal from "./ShareModal";

export default function Progress() {
    let dispatch = useDispatch<AppDispatch>();
    let user: any = useSelector<RootState, RootState["auth"]["user"]>(
        (state) => state.auth.user
    );
    let progress: any = useSelector<
        RootState,
        RootState["results"]["progress"]
    >((state) => state.results.progress);
    useEffect(() => {
        if (user) dispatch(getProgress());
    }, [user]);
    let theme = useTheme();
    let navigate = useNavigate();
    let [shareIsOpen, setShareIsOpen] = useState(false);
    if (!user) return <NotAuth />;
    let isPhone = useMediaQuery("(max-width: 639px)");

    const calculateAverage = () => {
        const ease = Number(progress.ease);
        const middle = Number(progress.middle);
        const hard = Number(progress.hard);

        const totalTests = ease + middle + hard;
        if (totalTests === 0) return 0;

        const totalPoints = ease * 1 + middle * 2 + hard * 3;

        return (totalPoints / totalTests).toFixed(1);
    };

    return (
        <Wrapper>
            <Typography variant="h2" textAlign="center">
                Твій Прогрес
            </Typography>
            <Card
                sx={{
                    width: "100%",
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    position: "relative",
                    overflow: "visible",
                    borderRadius: "24px",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <Avatar
                        sx={{
                            height: "86px",
                            width: "86px",
                            bgcolor: alpha(theme.palette.primary.dark, 0.2),
                        }}
                    >
                        <Avatar
                            sx={{
                                height: "56px",
                                width: "56px",
                            }}
                            src={user.photos[0].value}
                        ></Avatar>
                    </Avatar>
                    <Typography variant="h3">
                        Вітаю,{" "}
                        <Typography
                            variant="h3"
                            component={"span"}
                            color="warning"
                        >
                            {user.displayName}
                        </Typography>
                        !
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Ви розшифрували{" "}
                        <Typography
                            variant="body2"
                            component={"span"}
                            color="success"
                        >
                            {progress.decode_count} файлів
                        </Typography>
                        !
                    </Typography>
                    <Grid>
                        <Card
                            sx={{
                                bgcolor: "rgba(42, 42, 58, 1)",
                                borderRadius: "12px",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="./Trophy.png"
                                    alt="img"
                                    style={{
                                        height: "48px",
                                        marginBottom: "0.5rem",
                                    }}
                                />
                                <Typography variant="h3" textAlign="center">
                                    {progress.rank || "-"}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    textAlign="center"
                                    color="text.secondary"
                                >
                                    Місце в рейтингу
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                bgcolor: "rgba(42, 42, 58, 1)",
                                borderRadius: "12px",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="./star.png"
                                    alt="img"
                                    style={{
                                        height: "48px",
                                        marginBottom: "0.5rem",
                                    }}
                                />
                                <Typography variant="h3" textAlign="center">
                                    {progress.ease +
                                        progress.middle * 2 +
                                        progress.hard * 3}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    textAlign="center"
                                    color="text.secondary"
                                >
                                    Всього очок
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                bgcolor: "rgba(42, 42, 58, 1)",
                                borderRadius: "12px",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="./folder.png"
                                    alt="img"
                                    style={{
                                        height: "48px",
                                        marginBottom: "0.5rem",
                                    }}
                                />
                                <Typography variant="h3" textAlign="center">
                                    {progress.decode_count}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    textAlign="center"
                                    color="text.secondary"
                                >
                                    Файлів розшифрувано
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                bgcolor: "rgba(42, 42, 58, 1)",
                                borderRadius: "12px",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="./goal.png"
                                    alt="img"
                                    style={{
                                        height: "48px",
                                        marginBottom: "0.5rem",
                                    }}
                                />
                                <Typography variant="h3" textAlign="center">
                                    {calculateAverage()}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    textAlign="center"
                                    color="text.secondary"
                                >
                                    Середній бал
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                bgcolor: "rgba(42, 42, 58, 1)",
                                borderRadius: "12px",
                                gridColumn: "1/-1",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h5" textAlign="center">
                                    За рівнями складності
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        mt: 1,
                                        justifyContent: "space-around",
                                        alignSelf: "stretch",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="h3"
                                            color="success"
                                        >
                                            {progress.ease}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Легкий
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="h3"
                                            color="warning"
                                        >
                                            {progress.middle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Середній
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography variant="h3" color="error">
                                            {progress.hard}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Складний
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{ bgcolor: theme.palette.secondary.main }}
                            startIcon={<Share />}
                            onClick={() => setShareIsOpen(true)}
                        >
                            {isPhone ? "Поділитися" : "Поділитися результатами"}
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => navigate("/decode")}
                        >
                            Продовжити гру
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<Logout />}
                            onClick={() => dispatch(logout())}
                        >
                            {isPhone ? "Вийти" : "Вийти з облікового запису"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <ShareModal
                isOpen={shareIsOpen}
                closeModal={() => setShareIsOpen(false)}
            />
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    padding: 2rem 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

let Grid = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    width: 100%;
    @media (max-width: 639px) {
        grid-template-columns: 1fr 1fr;
    }
`;
