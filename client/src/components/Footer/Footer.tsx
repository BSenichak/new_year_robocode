import { styled, Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <Wrapper>
            <Hr />
            <Container>
                <Typography variant="body1">
                    ТОВ "Робокод Плюс". Всі права захищені
                </Typography>
                <Typography variant="body2">
                    <Link to="http://robocode.ua">Robocode.ua</Link>
                </Typography>
            </Container>
        </Wrapper>
    );
}

const Wrapper = styled(Box)`
    text-align: center;
    display: flex;
    flex-direction: column;
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

const Hr = styled(Box)`
    width: 100%;
    height: 0.6rem;
    background-color: ${({ theme }) => theme.palette.text.secondary};
`;

