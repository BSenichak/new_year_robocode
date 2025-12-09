import {
    alpha,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionRules() {
    let questions = [
        {
            question: "Як грати?",
            answer: "Обери рівень складності та розв’яжи судоку. Заповни всі порожні клітинки цифрами від 1 до 9 так, щоб у кожному рядку, стовпці та квадраті 3x3 кожна цифра зустрічалась лише один раз.",
        },
        {
            question: "Як нараховуються очки?",
            answer: "За кожне вирішене судоку ти отримуєш очки залежно від рівня складності: Легкий – 1 бал, Середній – 2 бали, Складний – 3 бали.",
        },
        {
            question: "Хто може виграти призи?",
            answer: "Топ-3 гравців з найбільшою кількістю очок на момент закінчення змагання отримають призи від Robocode. Переможці будуть оголошені 25 грудня.",
        },
        {
            question: "Чи потрібна реєстрація?",
            answer: "Так, допомагати Санті можуть тільки авторизовані помічники.",
        },
        {
            question: "Скільки разів можна грати?",
            answer: "Необмежено! Чим більше судоку ти розв’яжеш, тим більше файлів Санти врятуєш та тим вище піднімешся у таблиці лідерів.",
        },
        {
            question: "Чи можна грати на телефоні?",
            answer: "Так, гра повністю адаптована для мобільних пристроїв. Ти можеш грати на телефоні чи планшеті.",
        },
    ];

    return (
        <>
            <Typography variant="h2" textAlign="center">
                Часті запитання
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {questions.map((item) => (
                    <MyAccordion
                        key={item.question}
                        title={item.question}
                        text={item.answer}
                    />
                ))}
            </Box>
        </>
    );
}

function MyAccordion({ title, text }: { title: string; text: string }) {
    return (
        <Accordion
            sx={(theme) => ({
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
                overflow: "hidden",

                // критично: підвищує специфічність (&&)
                "&&": {
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                },
            })}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon color="info" />}>
                <Typography component="span" variant="h6">{title}</Typography>
            </AccordionSummary>

            <AccordionDetails><Typography component="span" color="text.secondary">{text}</Typography></AccordionDetails>
        </Accordion>
    );
}
