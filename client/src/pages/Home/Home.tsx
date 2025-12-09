import { Box, styled } from "@mui/material";
import Poster from "./Poster";
import Progress from "./Progress";
import RulesCards from "./RulesCards";

export default function Home() {
    return (
        <Wrapper>
            <Poster />
            <Progress />
            <RulesCards />
        </Wrapper>
    );
}

const Wrapper = styled(Box)``;
