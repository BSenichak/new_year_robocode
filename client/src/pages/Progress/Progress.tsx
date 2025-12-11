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
    let progress = useSelector<RootState, RootState["results"]["progress"]>(
        (state) => state.results.progress
    );
    useEffect(() => {
        if (user) dispatch(getProgress());
    }, [user]);
    let theme = useTheme();
    let navigate = useNavigate();
    let [shareIsOpen, setShareIsOpen] = useState(false);
    if (!user) return <NotAuth />;
    return (
        <Wrapper>
            <Typography variant="h4" textAlign="center">
                Твій Прогрес
            </Typography>
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 800,
                    border: `1px solid ${alpha(theme.palette.grey[300], 0.1)}`,
                    backgroundColor: "#1d1d27",
                    position: "relative",
                    overflow: "visible",
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
                    <Typography variant="body1" color="secondary">
                        Ви розшифрували{" "}
                        <Typography
                            variant="body1"
                            component={"span"}
                            color="warning"
                        >
                            {progress} файлів
                        </Typography>
                        !
                    </Typography>
                    <Grid>
                        <Card
                            sx={{
                                bgcolor: alpha(theme.palette.grey[100], 0.05),
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
                                    5
                                </Typography>
                                <Typography
                                    variant="body2"
                                    textAlign="center"
                                    color="secondary"
                                >
                                    Місце в рейтингу
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                bgcolor: alpha(theme.palette.grey[100], 0.05),
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
                                    5
                                </Typography>
                                <Typography
                                    variant="body2"
                                    textAlign="center"
                                    color="secondary"
                                >
                                    Всього очок
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                bgcolor: alpha(theme.palette.grey[100], 0.05),
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
                                    5
                                </Typography>
                                <Typography
                                    variant="body2"
                                    textAlign="center"
                                    color="secondary"
                                >
                                    Файлів розшифрувано
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                bgcolor: alpha(theme.palette.grey[100], 0.05),
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
                                    5
                                </Typography>
                                <Typography
                                    variant="body2"
                                    textAlign="center"
                                    color="secondary"
                                >
                                    Середній бал
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                bgcolor: alpha(theme.palette.grey[100], 0.05),
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
                                <Box sx={{ display: "flex", gap: 2, mt: 1, justifyContent: "space-around", alignSelf: "stretch" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography variant="h3" color="success">
                                            20
                                        </Typography>
                                        <Typography variant="body2">
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
                                        <Typography variant="h3" color="warning">
                                            12
                                        </Typography>
                                        <Typography variant="body2">
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
                                            6
                                        </Typography>
                                        <Typography variant="body2">
                                            Складний
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Box sx={{display: "flex", justifyContent: "center", gap: 1 }}>
                        <Button variant="contained" sx={{bgcolor: theme.palette.secondary.main}} startIcon={<Share/>} onClick={()=>setShareIsOpen(true)}>Поділитися результатами</Button>
                        <Button variant="contained" color="success" onClick={()=>navigate("/decode")}>Продовжити гру</Button>
                        <Button variant="contained" color="error" startIcon={<Logout/>} onClick={() => dispatch(logout())}>Вийти з облікового запису</Button>
                    </Box>
                </CardContent>
            </Card>
            <ShareModal isOpen={shareIsOpen} closeModal={() => setShareIsOpen(false)}/>
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
