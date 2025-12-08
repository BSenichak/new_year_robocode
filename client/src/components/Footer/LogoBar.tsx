import { Box, Typography, styled } from "@mui/material";

export default function LogoBar() {
    return (
        <Wrapper>
            <Logo src="./logo blue.png" alt="logo" />
            <Typography variant="body2" color="textDisabled">
                Всі права застережено, {new Date().getFullYear()}
            </Typography>
        </Wrapper>
    );
}

let Logo = styled("img")`
    height: 20px;
`;

let Wrapper = styled(Box)`
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media (max-width: 639px) {
        align-items: start;
        align-self: flex-start;
    }
`;
