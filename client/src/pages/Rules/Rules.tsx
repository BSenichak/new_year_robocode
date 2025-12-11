import styled from "@emotion/styled";
import {
    Box,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    Typography,
} from "@mui/material";
import AccordionRules from "./AccordionRules";

export default function Rules() {
    return (
        <Wrapper>
            <Typography variant="h2" textAlign="center">
                Правила місії
            </Typography>
            <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
                sx={{ mt: -1, mb: 2 }}
            >
                Все, що потрібно знати про Різдвяну місію Robocode
            </Typography>
            <Card
                sx={{
                    width: "100%",
                    borderRadius: "24px",
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    background: "rgba(255, 255, 255, 0.04)",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <CardHead>
                        <img src="./goal.png" alt="" />
                        <Typography variant="h5">Мета місії</Typography>
                    </CardHead>
                    <Typography variant="body1" color="text.secondary">
                        Допомогти Санті розшифрувати файли з інформацією про
                        дітей та подарунки, які зашифрували злі грінч-хакери.
                        Кожне вирішене судоку – це один врятований файл
                    </Typography>
                </CardContent>
            </Card>
            <Card
                sx={{
                    width: "100%",
                    borderRadius: "24px",
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    background: "rgba(255, 255, 255, 0.04)",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <CardHead>
                        <img src="./puzzle.png" alt="" />
                        <Typography variant="h5">
                            Як розв’язувати судоку
                        </Typography>
                    </CardHead>
                    <Typography variant="body1" color="text.secondary">
                        Заповни порожні клітинки цифрами від 1 до 9 так, щоб у
                        кожному рядку, стовпці та малому квадраті 3×3 кожна
                        цифра зустрічалась лише один раз
                    </Typography>
                </CardContent>
            </Card>
            <Card
                sx={{
                    width: "100%",
                    borderRadius: "24px",
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    background: "rgba(255, 255, 255, 0.04)",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <CardHead>
                        <img src="./tools.png" alt="" />
                        <Typography variant="h5">Як це працює?</Typography>
                    </CardHead>
                    <List>
                        <ListItem sx={{ pt: 0 }}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <img src="./pin.png" height="20px" alt="" />
                            </ListItemIcon>
                            <Typography variant="body1" color="text.secondary">
                                Доступ до файлів мають лише авторизовані гравці
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <img src="./pin.png" height="20px" alt="" />
                            </ListItemIcon>
                            <Typography variant="body1" color="text.secondary">
                                Розв’язуй судоку – отримуй бали (1-2-3 залежно
                                від складності)
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <img src="./pin.png" height="20px" alt="" />
                            </ListItemIcon>
                            <Typography variant="body1" color="text.secondary">
                                Бали формують рейтинг гравця у загальному
                                лідерборді
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <img src="./pin.png" height="20px" alt="" />
                            </ListItemIcon>
                            <Typography variant="body1" color="text.secondary">
                                Топ-3 наприкінці отримають подарунки
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <img src="./pin.png" height="20px" alt="" />
                            </ListItemIcon>
                            <Typography variant="body1" color="text.secondary">
                                Чесна гра: один гравець = один акаунт
                            </Typography>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
            <Card
                sx={{
                    width: "100%",
                    borderRadius: "24px",
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    background: "rgba(255, 255, 255, 0.04)",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <CardHead>
                        <img src="./star.png" alt="" />
                        <Typography variant="h5">
                            Як розв’язувати судоку
                        </Typography>
                    </CardHead>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Card
                            sx={{
                                background:"rgba(51, 249, 129, 0.3)",
                                flexGrow: 1,
                                border: `1px solid rgba(51, 249, 129, 1)`,
                                p: 1,
                                borderRadius: "12px",
                            }}
                        >
                            <Typography
                                variant="h2"
                                color="rgba(51, 249, 129, 1)"
                                textAlign="center"
                            >
                                1
                            </Typography>
                            <Typography variant="body2" textAlign="center">
                                Легкий
                            </Typography>
                        </Card>
                        <Card
                            sx={{
                                background:"rgba(255, 121, 57, 0.3)",
                                flexGrow: 1,
                                border: `1px solid rgba(255, 121, 57, 1)`,
                                p: 1,
                                borderRadius: "12px",
                            }}
                        >
                            <Typography
                                variant="h2"
                                color="rgba(255, 121, 57, 1)"
                                textAlign="center"
                            >
                                2
                            </Typography>
                            <Typography variant="body2" textAlign="center">
                                Середній
                            </Typography>
                        </Card>
                        <Card
                            sx={{
                                background:"rgba(254, 57, 78, 0.3)",
                                flexGrow: 1,
                                border: `1px solid rgba(254, 57, 78, 1)`,
                                p: 1,
                                borderRadius: "12px",
                            }}
                        >
                            <Typography
                                variant="h2"
                                color="rgba(254, 57, 78, 1)"
                                textAlign="center"
                            >
                                3
                            </Typography>
                            <Typography variant="body2" textAlign="center">
                                Складний
                            </Typography>
                        </Card>
                    </Box>
                </CardContent>
            </Card>
            <Card
                sx={{
                    width: "100%",
                    borderRadius: "24px",
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    background: "rgba(255, 255, 255, 0.04)",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <CardHead>
                        <img src="./Trophy.png" alt="" />
                        <Typography variant="h5">Призи</Typography>
                    </CardHead>
                    <List>
                        <ListItem sx={{ pt: 0 }}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <img src="./1st.png" height="20px" alt="" />
                            </ListItemIcon>
                            <Typography variant="body1" color="text.secondary">
                                1 місце – Безкоштовний курс програмування
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <img src="./2st.png" height="20px" alt="" />
                            </ListItemIcon>
                            <Typography variant="body1" color="text.secondary">
                                2 місце – Робокіт-іграшка + мерч
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <img src="./3st.png" height="20px" alt="" />
                            </ListItemIcon>
                            <Typography variant="body1" color="text.secondary">
                                3 місце – Брендований мерч Robocode
                            </Typography>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
            <AccordionRules />
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 3rem 0;
    gap: 24px;
`;

let CardHead = styled(Box)`
    display: flex;
    gap: 1rem;
    align-items: center;
    & img {
        height: 30px;
    }
`;
