import { Box, Card, CardContent, styled } from "@mui/material";

export default function InfoBar() {
    return (
        <Wrapper>
            <Card sx={{ width: "100%" }}>
                <CardContent>asdas</CardContent>
            </Card>
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-self: stretch;
    @media (max-width: 1099px) {
        grid-row: 1/3;
        grid-column: 1;
    }
    @media (max-width: 639px) {
        grid-column: 1;
        grid-row: 3;
    }
`;
