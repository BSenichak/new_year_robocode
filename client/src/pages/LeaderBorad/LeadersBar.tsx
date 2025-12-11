import styled from "@emotion/styled";
import {
    Box,
    Card,
    CardContent,
    Typography,
    useTheme,
    alpha,
} from "@mui/material";

export default function LeadersBar() {
    const theme = useTheme();
    return (
        <Wrapper>
            <Cards>
                <CardItem
                    icon="./1st.png"
                    color={theme.palette.warning.light}
                    name="aboba"
                    score="1000"
                    count="1"
                />
                <CardItem
                    icon="./2st.png"
                    color={theme.palette.grey[500]}
                    name="aboba"
                    score="1000"
                    count="1"
                />
                <CardItem
                    icon="./3st.png"
                    color={theme.palette.warning.dark}
                    name="aboba"
                    score="1000"
                    count="1"
                    islast={true}
                />
            </Cards>
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
`;

let Cards = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    width: 100%;
    @media (max-width: 639px) {
        grid-template-columns: 1fr 1fr;
    }
`;

function CardItem({
    icon,
    score,
    color,
    name,
    count,
    islast = false,
}: {
    icon: string;
    score: string;
    color: string;
    name: string;
    count: string;
    islast?: boolean;
}) {
    return (
        <Card sx={islast ? {gridColumn: "1/-1" } : {}}>
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
                <Typography
                    variant="body2"
                    color="textPrimary"
                    textAlign="center"
                >
                    {name}
                </Typography>
                <Typography variant="h5" textAlign="center">
                    {score}
                </Typography>
                <Typography
                    variant="body2"
                    color="textDisabled"
                    textAlign="center"
                    sx={{ fontSize: 10 }}
                >
                    {count} файлів розшифровано
                </Typography>
            </CardContent>
        </Card>
    );
}
