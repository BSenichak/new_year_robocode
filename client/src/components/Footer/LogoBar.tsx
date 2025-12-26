import { Box, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LogoBar() {
    let navigate = useNavigate();
    return (
        <Wrapper>
            <Logo src="./logo blue.png" alt="logo" onClick={()=>navigate("/")}/>
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
