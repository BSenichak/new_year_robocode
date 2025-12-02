import { styled, Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <Wrapper>
            <Container>
                <Typography variant="h6">
                    ТОВ "Робокод Плюс". Всі права захищені
                </Typography>
                <Typography variant="body1">
                    <Link to="http://robocode.ua">Robocode.ua</Link>
                </Typography>
            </Container>
        </Wrapper>
    );
}

const Wrapper = styled(Box)`
    text-align: center;
    display: flex;
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
    box-shadow: ${({ theme }) => theme.shadows[4]};
    & a {
        text-decoration: none;
        color: inherit;
        &:hover {
            text-decoration: underline;
        }
    }
`;
