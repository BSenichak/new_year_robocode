import {
    Box,
    Button,
    Chip,
    styled,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material";

export default function Poster() {
    let isPhone = useMediaQuery("(max-width: 639px)");
    return (
        <Wrapper>
            <Content>
                <Chip
                    icon={<img src="Error.png" />}
                    label="УВАГА: Файли зашифровано!"
                    sx={{
                        background: (theme) =>
                            alpha(theme.palette.error.main, 0.5),
                        padding: "0.5rem 1rem",
                        color: (theme) => theme.palette.error.main,
                    }}
                />
                <Typography
                    variant="h2"
                    sx={{
                        marginY: "2rem",
                        color: (theme) => theme.palette.success.light,
                    }}
                >
                    Різдвяна місія{" "}
                    <span style={{ color: "white" }}>Robocode</span>
                </Typography>
                <Typography variant="body1" color="info.light">
                    Злі грінч-хакери взламали комп’ютер Санта Клауса! Злодії
                    зашифрували файли зі списком дітей та їхніх подарунків. Щоб
                    допомогти Санті, потрібно відкрити кожен файл. А ключ до
                    нього – правильно розв’язане судоку!
                </Typography>
                <Chip
                    label="* Санта обов’язково нагородить топ-помічників"
                    sx={{
                        background: (theme) => theme.palette.info.light,
                        marginY: "1rem",
                        color: "InfoText",
                        alignSelf: !isPhone ? "flex-start" : "center",
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        gap: "2rem",
                        marginY: "2rem",
                        alignSelf: !isPhone ? "flex-start" : "center",
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<img src="./Accept.svg" />}
                        sx={{
                            padding: "1rem 2rem",
                            textTransform: "uppercase",
                            fontSize: "1.2rem",
                        }}
                    >
                        Почати місію
                    </Button>
                    <Button
                        variant="outlined"
                        color="inherit"
                        sx={{
                            padding: "1rem 2rem",
                            textTransform: "uppercase",
                            fontSize: "1.2rem",
                            border: "1px solid #ffffff3b",
                        }}
                    >
                        Правила місії
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: "2rem",
                        alignSelf: !isPhone ? "flex-start" : "center",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                            variant="h2"
                            color="info.dark"
                            sx={{ fontWeight: "bold" }}
                        >
                            10 000+
                        </Typography>
                        <Typography variant="body1" color="info.light">
                            Файлів для розшифровки
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography
                            variant="h2"
                            color="warning.main"
                            sx={{ fontWeight: "bold" }}
                        >
                            3
                        </Typography>
                        <Typography variant="body1" color="info.light">
                            Рівні складності
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <img
                            src="Trophy.png"
                            alt="trophy"
                            style={{ height: "35px", width: "35px" }}
                        />
                        <Typography variant="body1" color="info.light">
                            Призи топ-3 гравцям
                        </Typography>
                    </Box>
                </Box>
            </Content>
            <Youtube
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=_q3zVO02e8bm4yh5"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
            <BluePoint src="./blue-point.png" alt="blue-point" />
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    display: flex;
    padding: 2rem 0;
    position: relative;
    gap: 2rem;
    width: 100%;

    @media (max-width: 639px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

let Youtube = styled("iframe")`
    flex: 1;
    width: 100%;
    min-height: 300px;
    border-radius: 24px;

    @media (max-width: 639px) {
        min-height: 220px;
    }
`;

let Content = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 639px) {
        align-items: center;
        text-align: center;
        width: 100%;
    }
`;

let BluePoint = styled("img")`
    position: absolute;
    left: 0;
    transform: translate(-50%, -15%);

    @media (max-width: 639px) {
        display: none;
    }
`;

