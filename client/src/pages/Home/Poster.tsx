import {
    Box,
    Button,
    Chip,
    styled,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Poster() {
    let isPhone = useMediaQuery("(max-width: 639px)");
    let navigate = useNavigate();
    return (
        <Wrapper>
            <Content>
                <Chip
                    icon={<img src="Error.png" />}
                    label="УВАГА: Файли зашифровано!"
                    sx={{
                        background: "rgba(254, 57, 78, 0.2)",
                        padding: "8px 16px",
                        color: "rgba(254, 57, 78, 1)",
                        fontSize: "14px"
                    }}
                />
                <Typography
                    variant="h2"
                    sx={{
                        marginY: "2rem",
                        color: (theme) => theme.palette.success.light,
                        fontSize:"48px"
                    }}
                >
                    Різдвяна місія{" "}
                    <span style={{ color: "white" }}>Robocode</span>
                </Typography>
                <Typography variant="body1" color="textSecondary">
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
                        p: "2px 0",
                        height: "auto",
                        lineHeight: "16px"
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
                        startIcon={<img src="./Accept.svg" style={{height: "20px"}}/>}
                        sx={{
                            padding: "16px 20px",
                            textTransform: "uppercase",
                            fontSize: "16px",
                            animation: "glowingBlue 2s ease-in-out infinite",
                        }}
                        onClick={()=>navigate("/decode")}
                    >
                        Почати місію
                    </Button>
                    <Button
                        variant="outlined"
                        color="inherit"
                        sx={{
                            padding: "16px 20px",
                            textTransform: "uppercase",
                            fontSize: "16px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            "&:hover": {
                            borderWidth: 0.1, 
                            background: "rgba(147, 50, 214, 1)"
                        },
                        }}
                        onClick={() => navigate("/rules")}
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
                            color="primary.main"
                            sx={{ fontWeight: "bold" }}
                        >
                            10 000+
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Файлів для розшифровки
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: isPhone ? "center" : "flex-start",
                        }}
                    >
                        <Typography
                            variant="h2"
                            color="warning.main"
                            sx={{ fontWeight: "bold" }}
                        >
                            3
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Рівні складності
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: isPhone ? "center" : "flex-start",
                        }}
                    >
                        <img
                            src="Trophy.png"
                            alt="trophy"
                            style={{ height: "36px", width: "36px" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Призи топ-3 гравцям
                        </Typography>
                    </Box>
                </Box>
            </Content>
            <Youtube
                src="https://www.youtube.com/embed/x7AvsJJdVWs?si=kr3h3DTZO4mxc2jf"
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
    z-index: 1;
    @media (max-width: 639px) {
        min-height: 220px;
    }
`;

let Content = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 1;
    @media (max-width: 639px) {
        align-items: center;
        text-align: center;
        width: 100%;
    }
`;

let BluePoint = styled("img")`
z-index: 0;
    position: absolute;
    left: 0;
    transform: translate(-50%, -15%);

    @media (max-width: 639px) {
        display: none;
    }
`;

