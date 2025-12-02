import {
    Box,
    Button,
    CardContent,
    styled,
    Typography,
    Card,
} from "@mui/material";

export default function NotFound() {
    return (
        <Wrapper>
            <Card>
                <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
                    <Typography variant="h5" textAlign="center" sx={{maxWidth: "400px"}}>
                        Вибачте! Трапилась помилка під час завантаження
                        сторінки.
                    </Typography>
                    <Button variant="contained" href="/">
                        На головну
                    </Button>
                </CardContent>
            </Card>
        </Wrapper>
    );
}

const Wrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    gap: 2rem;
`;
