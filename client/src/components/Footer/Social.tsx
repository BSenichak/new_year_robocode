
import { Box, styled } from "@mui/material";

export default function Social() {
  return (
    <Box>
        <Row>
            <Icon src="./telegram.svg" alt="telegram" />
            <Icon src="./youtube.svg" alt="youtube" />
            <Icon src="./instagram.svg" alt="instagram" />
            <Icon src="./facebook.svg" alt="facebook" />
            <Icon src="./tiktok.svg" alt="tiktok" />
        </Row>
        <br />
        <Row>
            <Icon src="./mastercard.svg" alt="mastercard" style={{height: "25px"}}/>
            <Icon src="./visa.svg" alt="visa" style={{height: "25px"}}/>
        </Row>
    </Box>
  )
}

let Row = styled(Box)`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

let Icon = styled("img")`
    height: 34px;
`;
