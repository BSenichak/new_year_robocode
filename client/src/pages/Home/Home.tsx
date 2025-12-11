import { Box, styled, Button } from "@mui/material";
import Poster from "./Poster";
import Progress from "./Progress";
import RulesCards from "./RulesCards";
import LeaderBar from "./LeaderBar";
import { useNavigate } from "react-router-dom";

export default function Home() {
    let navigate = useNavigate();
    return (
        <Wrapper>
            <Poster />
            <Progress />
            <RulesCards />
            <LeaderBar />
            <Button
                startIcon={<img src="Union.svg" alt="arrow" height={18} />}
                variant="contained"
                size="large"
                sx={{
                    alignSelf: "center",
                    my: 6,
                    py: 2,
                    textTransform: "uppercase",
                    fontSize: 16,
                    animation: "glowingBlue 2s ease-in-out infinite",
                }}
                onClick={() => navigate("/decode")}
            >
                Почати місію
            </Button>
        </Wrapper>
    );
}

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
`;
