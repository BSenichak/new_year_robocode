import {
    Box,
    Card,
    CardContent,
    styled,
    Typography,
    alpha,
} from "@mui/material";

export default function RulesCards() {
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
                    color="rgba(51, 249, 129, 0.2)"
                    number="01"
                    title="Обери рівень"
                    text="Easy (1 бал), Medium (2 бали) або Hard (3 бали)"
                />
                <CardItem
                    icon="./puzzle.png"
                    color="rgba(22, 70, 255, 0.2)"
                    number="02"
                    title="Розв'яжи судоку"
                    text="Заповни клітинки цифрами від 1 до 9 за правилами"
                />
                <CardItem
                    icon="./folder.png"
                    color="rgba(255, 121, 57, 0.2)"
                    number="03"
                    title="Розшифруй файл"
                    text="Кожне вирішене судоку розшифровує 1 файл та повертає свято ще одній сім’ї"
                />
                <CardItem
                    icon="./Trophy.png"
                    color="rgba(169, 57, 255, 0.2)"
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
        <Card sx={{
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            borderRadius: "22px",
            padding: "16px 8px",
            bgcolor: "rgba(255, 255, 255, 0.04)"
        }}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                }}
            >
                <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <IconBox
                        sx={{
                            bgcolor: alpha(color, 0.3),
                            borderRadius: "12px",
                            p: "10px"
                        }}
                    >
                        <img src={icon} style={{ height: "20px" }} alt="icon" />
                    </IconBox>
                    <Typography variant="h2" color="rgba(157, 157, 255, 0.3)">
                        {number}
                    </Typography>
                </Box>
                <Typography variant="h4">{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
}
