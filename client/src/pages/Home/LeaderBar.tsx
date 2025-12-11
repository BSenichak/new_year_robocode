import styled from "@emotion/styled";
import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

export default function LeaderBar() {
    return (
        <Wrapper>
            <Background />
            <Box sx={{ zIndex: 1, width: "100%" }}>
                <Typography
                    variant="h2"
                    color="rgba(169, 57, 255, 1)"
                    textAlign="center"
                >
                    Топ-3
                    <Box component="span" style={{ color: "white" }}>
                        {" "}
                        отримають подарунки
                    </Box>
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ my: 3, maxWidth: "400px", mx: "auto" }}
                >
                    За дорученням Санти гравці, які розшифрують найбільше
                    файлів, отримають особливі різдвяні призи від Robocode!
                </Typography>
                <Cards>
                    <CardItem
                        icon="./1st.png"
                        color="rgba(255, 157, 0, 0.3)"
                        borderColor="rgba(239, 177, 0, 0.5)"
                        title="Перше місце"
                        text="Безкоштовний курс програмування"
                    />
                    <CardItem
                        icon="./2st.png"
                        color="rgba(181, 205, 210, 0.3)"
                        borderColor="rgba(230, 240, 240, 0.5)"
                        title="Друге місце"
                        text="Робокіт-іграшка + мерч"
                    />
                    <CardItem
                        icon="./3st.png"
                        color="rgba(255, 104, 32, 0.3)"
                        borderColor="rgba(255, 121, 57, 0.5)"
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
    gap: 24px;
    width: 100%;
`;

function CardItem({ icon, title, color, borderColor, text }: any) {
    return (
        <Card
            sx={{
                flexGrow: 1,
                borderRadius: "24px",
                border: `1px ${borderColor} solid`,
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.3rem",
                    background: color,

                    borderRadius: 3,
                }}
            >
                <img src={icon} style={{ height: "40px" }} alt="icon" />
                <Typography variant="h4" textAlign="center">
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="rgba(255, 255, 255, 0.65)"
                    textAlign="center"
                >
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
}
