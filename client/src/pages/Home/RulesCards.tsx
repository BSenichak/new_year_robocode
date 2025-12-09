import {
    Box,
    Card,
    CardContent,
    styled,
    Typography,
    alpha,
    useTheme,
} from "@mui/material";

export default function RulesCards() {
    const theme = useTheme();
    return (
        <Wrapper>
            <Typography variant="h2" textAlign="center" sx={{my: 3}}>
                Як врятувати{" "}
                <Typography component="span" variant="h2" color="warning">
                    Різдво
                </Typography>
                ?
            </Typography>
            <Cards>
                <CardItem
                    icon="./lock.png"
                    color={theme.palette.error.light}
                    number="01"
                    title="Обери рівень"
                    text="Easy (1 бал), Medium (2 бали) або Hard (3 бали)"
                />
                <CardItem
                    icon="./puzzle.png"
                    color={theme.palette.primary.dark}
                    number="02"
                    title="Розв'яжи судоку"
                    text="Заповни клітинки цифрами від 1 до 9 за правилами"
                />
                <CardItem
                    icon="./folder.png"
                    color={theme.palette.warning.main}
                    number="03"
                    title="Розшифруй файл"
                    text="Кожне вирішене судоку розшифровує 1 файл та повертає свято ще одній сім’ї"
                />
                <CardItem
                    icon="./Trophy.png"
                    color={theme.palette.info.light}
                    number="04"
                    title="Змагайся"
                    text="Потрап у топ-3 та отримай приз від Robocode!"
                />
            </Cards>
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    padding: 4rem 0;
`;

let Cards = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;

    @media (max-width: 639px) {
        grid-template-columns: 1fr 1fr;
    }
`;

let IconBox = styled(Card)`
    padding: 0.5rem;
    height: 20;
    display: flex;
    align-items: center;
    justify-content: center;
`;

function CardItem({ icon, color, number, title, text }: any) {
    return (
        <Card>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                }}
            >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconBox
                        sx={{
                            bgcolor: alpha(color, 0.3),
                        }}
                    >
                        <img src={icon} style={{ height: "20px" }} alt="icon" />
                    </IconBox>
                    <Typography variant="h3" color="textDisabled">
                        {number}
                    </Typography>
                </Box>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body2" color="info.light">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
}
