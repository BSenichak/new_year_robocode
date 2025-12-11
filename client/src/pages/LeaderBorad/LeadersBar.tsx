import styled from "@emotion/styled";
import {
    Box,
    Card,
    CardContent,
    Typography,
    useTheme,
    alpha,
    useMediaQuery,
    CircularProgress,
} from "@mui/material";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function LeadersBar() {
    const theme = useTheme();
    let leaders = useSelector<RootState, RootState["leaderboard"]["leaders"]>(
        (state) => state.leaderboard.leaders
    );
    let loading = useSelector<RootState, RootState["leaderboard"]["loading"]>(
        (state) => state.leaderboard.loading
    );
    if (loading || !leaders)
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
        <Wrapper>
            <Cards>
                <CardItem
                    icon="./1st.png"
                    color={theme.palette.warning.light}
                    name={(leaders[0] && leaders[0].name) || "-"}
                    score={(leaders[0] && leaders[0].points) || "-"}
                    count={(leaders[0] && leaders[0].filesDecoded) || "-"}
                />
                <CardItem
                    icon="./2st.png"
                    color={theme.palette.grey[500]}
                    name={(leaders[1] && leaders[1].name) || "-"}
                    score={(leaders[1] && leaders[1].points) || "-"}
                    count={(leaders[1] && leaders[1].filesDecoded) || "-"}
                />
                <CardItem
                    icon="./3st.png"
                    color={theme.palette.warning.dark}
                    name={(leaders[2] && leaders[2].name) || "-"}
                    score={(leaders[2] && leaders[2].points) || "-"}
                    count={(leaders[2] && leaders[2].filesDecoded) || "-"}
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
    let small = useMediaQuery("(max-width: 639px)");
    return (
        <Card sx={islast && small ? { gridColumn: "1/-1" } : {}}>
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
