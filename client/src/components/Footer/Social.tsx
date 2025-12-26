import { Box, styled } from "@mui/material";

export default function Social() {
    return (
        <Box>
            <Row>
                <Icon
                    src="./telegram.svg"
                    alt="telegram"
                    onClick={() => window.open("https://t.me/+su-ItwWzS0JhZjcy", "_blank")}
                    sx={{ cursor: "pointer" }}
                />
                <Icon
                    src="./youtube.svg"
                    alt="youtube"
                    onClick={() => window.open("https://www.youtube.com/@robocode_ua", "_blank")}
                    sx={{ cursor: "pointer" }}
                />
                <Icon
                    src="./instagram.svg"
                    alt="instagram"
                    onClick={() => window.open("https://www.instagram.com/robocode_ua?igshid=MzMyNGUyNmU2YQ==", "_blank")}
                    sx={{ cursor: "pointer" }}
                />
                <Icon
                    src="./facebook.svg"
                    alt="facebook"
                    onClick={() => window.open("https://www.facebook.com/robocode.embedded/", "_blank")}
                    sx={{ cursor: "pointer" }}
                />
                <Icon
                    src="./tiktok.svg"
                    alt="tiktok"
                    onClick={() => window.open("https://www.tiktok.com/@robocode_it?is_from_webapp=1&sender_device=pc", "_blank")}
                    sx={{ cursor: "pointer" }}
                />
            </Row>
            <br />
            <Row>
                <Icon
                    src="./mastercard.svg"
                    alt="mastercard"
                    style={{ height: "25px" }}
                />
                <Icon src="./visa.svg" alt="visa" style={{ height: "25px" }} />
            </Row>
        </Box>
    );
}

let Row = styled(Box)`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

let Icon = styled("img")`
    height: 34px;
`;
