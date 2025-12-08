import { styled, Box, Container } from "@mui/material";
import Contacts from "./Contacts";
import LogoBar from "./LogoBar";
import Social from "./Social";

export default function Footer() {
    return (
        <Wrapper>
            <Content>
                <Contacts />
                <Social />
                <LogoBar />
            </Content>
        </Wrapper>
    );
}

const Wrapper = styled(Box)`
    display: flex;

    background-color: ${({ theme }) => theme.palette.background.paper};
    color: ${({ theme }) => theme.palette.text.primary};
    padding: 4rem 0;
`;

const Content = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;   
    @media (max-width: 639px) {
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        gap: 1rem;
    }
`;
