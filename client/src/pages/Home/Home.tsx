import { Box, styled, Button, useTheme, alpha } from "@mui/material";
import Poster from "./Poster";
import Progress from "./Progress";
import RulesCards from "./RulesCards";
import LeaderBar from "./LeaderBar";
import { useNavigate } from "react-router-dom";

export default function Home() {
    let theme = useTheme();
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
                    boxShadow: `0px 0px 50px 20px ${alpha(
                        theme.palette.primary.main,
                        0.2
                    )}`,
                    textTransform: "uppercase",
                    fontSize: 16,
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
