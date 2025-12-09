import styled from "@emotion/styled";
import {
    Box,
    Card,
    CardContent,
    Typography,
    useTheme,
    alpha,
} from "@mui/material";

export default function LeaderBar() {
    const theme = useTheme();
    return (
        <Wrapper>
            <Background />
            <Box sx={{ zIndex: 1, width: "100%" }}>
                <Typography variant="h2" color="info.light" textAlign="center">
                    Топ-3
                    <Box component="span" style={{ color: "white" }}>
                        {" "}
                        отримають подарунки
                    </Box>
                </Typography>
                <Typography
                
                    variant="body2"
                    color="info.light"
                    textAlign="center"
                    sx={{ my: 3, maxWidth: "400px", mx: "auto" }}
                >
                    За дорученням Санти гравці, які розшифрують найбільше
                    файлів, отримають особливі різдвяні призи від Robocode!
                </Typography>
                <Cards>
                    <CardItem
                        icon="./1st.png"
                        color={theme.palette.warning.light}
                        title="Перше місце"
                        text="Безкоштовний курс програмування"
                    />
                    <CardItem
                        icon="./2st.png"
                        color={theme.palette.grey[500]}
                        title="Друге місце"
                        text="Робокіт-іграшка + мерч"
                    />
                    <CardItem
                        icon="./3st.png"
                        color={theme.palette.warning.dark}
                        title="Третє місце"
                        text="Брендований мерч Robocode"
                    />
                </Cards>
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
    padding: 80px 1rem;
`;

let Background = styled(Box)`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100vw;
    z-index: 0;
    background-color: ${({ theme }: any) => theme.palette.background.paper};
`;
let Cards = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    width: 100%;
`;

function CardItem({ icon, title, color, text }: any) {
    return (
        <Card sx={{flexGrow: 1}}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.3rem",
                    background: alpha(color, 0.3),
                    border: `1px ${color} solid`,
                    borderRadius: 3,
                }}
            >
                <img src={icon} style={{ height: "40px" }} alt="icon" />
                <Typography variant="h5" textAlign="center">{title}</Typography>
                <Typography variant="body2" color="textDisabled" textAlign="center">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
}
