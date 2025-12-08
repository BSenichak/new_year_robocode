import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export default function Contacts() {
    return (
        <Box>
            <Typography variant="h3">Контакти</Typography>
            <Wrapper>
                <Typography variant="body2">+38 (093) 170-64-42</Typography>
                <Typography variant="body2">
                    ПРАВИЛА КОНФІДЕНЦІЙНОСТІ
                </Typography>
                <Typography variant="body2">INFO@ROBOCODE.UA</Typography>
                <Typography variant="body2">ДОГОВІР ОФЕРТИ</Typography>
                <Typography variant="body2">ПАРТНЕРСТВО</Typography>
                <Typography variant="body2">
                    ROBOCODE.PARTNERS@GMAIL.COM
                </Typography>
            </Wrapper>
        </Box>
    );
}

let Wrapper = styled(Box)`
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0.5rem 1rem;
    @media (max-width: 1199px) {
        grid-template-columns: 1fr;
    }
`;
