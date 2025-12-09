import styled from "@emotion/styled";
import {
    Box,
    Card,
    CardContent,
    Typography,
    LinearProgress,
} from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";

export default function Progress() {
    return (
        <Wrapper>
            <Background />
            <Box sx={{zIndex: 1}}>
            <Typography variant="h2" color="info.light" textAlign="center">
                План порятунку{" "}
                <Box component="span" style={{ color: "white" }}>
                    {" "}
                    вже працює
                </Box>
            </Typography>
            <Typography variant="body1" color="info.light" textAlign="center" sx={{my: 3}}>
                Файли повертаються, грінч-хакери нервують. Скільки залишилось –
                показує індикатор. Долучайся до команди помічників!
            </Typography>
            <Card sx={{ width: "100%", maxWidth: 800 }}>
                <CardContent
                    sx={{ display: "flex", gap: "1rem"}}
                >
                    <ProgressBar>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="h5">
                                Прогрес спільноти
                            </Typography>
                            <Typography variant="body2" color="info.light">
                                28.5% завершено
                            </Typography>
                        </Box>
                        <ProgressWrapper>
                            <BorderLinearProgress
                                variant="determinate"
                                value={20}
                            />
                        </ProgressWrapper>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body2" color="success">
                                Врятовано: 2 847 файлів
                            </Typography>
                            <Typography variant="body2" color="info.light">
                                Залишилось: 7 153
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
                                sx={{ backgroundColor: "#2a2a3a", flexGrow: 1, padding: "0.5rem" }}
                            >
                                <Typography
                                    variant="h2"
                                    color="success.light"
                                    textAlign="center"
                                >
                                    1245
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="info.light"
                                    textAlign="center"
                                >
                                    Гравців
                                </Typography>
                            </Card>
                            <Card
                                sx={{ backgroundColor: "#2a2a3a", flexGrow: 1, padding: "0.5rem" }}
                            >
                                <Typography
                                    variant="h2"
                                    color="warning"
                                    textAlign="center"
                                >
                                    8432
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="info.light"
                                    textAlign="center"
                                >
                                    Сьогодні
                                </Typography>
                            </Card>
                            <Card
                                sx={{ backgroundColor: "#2a2a3a", flexGrow: 1, padding: "0.5rem" }}
                            >
                                <Typography
                                    variant="h2"
                                    color="primary"
                                    textAlign="center"
                                >
                                    24
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="info.light"
                                    textAlign="center"
                                >
                                    Дні до свята
                                </Typography>
                            </Card>
                        </Box>
                    </ProgressBar>
                </CardContent>
            </Card>
            </Box>
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    /* background-color: ${({ theme }: any) => theme.palette.background.paper}; */
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
    borderRadius: 5,
    margin: "0.5rem 0",
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 12px ${theme.palette.primary.main}`,
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }: any) => ({
    height: 10,
    borderRadius: 5,
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
`
