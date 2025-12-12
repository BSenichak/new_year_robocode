import styled from "@emotion/styled";
import {
    Box,
    Card,
    CardContent,
    Typography,
    useMediaQuery,
    CircularProgress,
} from "@mui/material";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function LeadersBar() {
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
                    color="linear-gradient(rgba(239, 177, 0, 0.3), rgba(255, 157, 0, 0.3))"
                    borderColor="rgba(239, 177, 0, 0.5)"
                    name={(leaders[0] && leaders[0].name) || "-"}
                    score={(leaders[0] && leaders[0].points) || "-"}
                    count={(leaders[0] && leaders[0].filesDecoded) || "-"}
                />
                <CardItem
                    icon="./2st.png"
                    color="linear-gradient(rgba(230, 240, 240, 0.3), rgba(181, 205, 210, 0.3))"
                    borderColor="rgba(230, 240, 240, 0.5)"
                    name={(leaders[1] && leaders[1].name) || "-"}
                    score={(leaders[1] && leaders[1].points) || "-"}
                    count={(leaders[1] && leaders[1].filesDecoded) || "-"}
                />
                <CardItem
                    icon="./3st.png"
                    color="linear-gradient(rgba(255, 121, 57, 0.3), rgba(255, 104, 32, 0.3))"
                    borderColor="rgba(255, 121, 57, 0.5)"
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
    islast: isLast = false,
    borderColor = "transparent",
}: {
    icon: string;
    score: string;
    color: string;
    name: string;
    count: string;
    islast?: boolean;
    borderColor?: string;
}) {
    let small = useMediaQuery("(max-width: 639px)");
    return (
        <Card sx={isLast && small ? { gridColumn: "1/-1" } : {}}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.3rem",
                    background: color,
                    border: `2px ${borderColor} solid`,
                    borderRadius: "24px",
                }}
            >
                <img src={icon} style={{ height: "72px" }} alt="icon" />
                <Typography
                    variant="body1"
                    color="textPrimary"
                    textAlign="center"
                >
                    {name}
                </Typography>
                <Typography variant="h2" textAlign="center">
                    {score}
                </Typography>
                <Typography
                    variant="body2"
                    color="textDisabled"
                    textAlign="center"
                    sx={{ fontSize: "16px" }}
                >
                    {count} файлів розшифровано
                </Typography>
            </CardContent>
        </Card>
    );
}
