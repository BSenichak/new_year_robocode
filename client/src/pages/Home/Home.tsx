import { Box, styled } from "@mui/material";
import Poster from "./Poster";

export default function Home() {
    return (
        <Wrapper>
            <Poster />
        </Wrapper>
    );
}

const Wrapper = styled(Box)``;
