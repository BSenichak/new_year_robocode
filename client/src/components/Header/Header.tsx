import {
    AppBar,
    Box,
    Button,
    Container,
    styled,
    Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Home as HomeIcon,
    LockOpen,
    ShowChart,
    MilitaryTech,
} from "@mui/icons-material";

export default function Header() {
    return (
        <AppBar position="static" sx={{ backgroundColor: "background.default" }}>
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Img src="/logo_ny.svg" alt="logo" />
                    <Typography variant="h4">
                        Врятуй свято з Robocode
                    </Typography>
                </Box>
                <Nav>
                    <Link
                        text="Головна сторінка"
                        icon={<HomeIcon />}
                        path="/"
                    />
                    <Link
                        text="Розшифрувати файл"
                        icon={<LockOpen />}
                        path="/decode"
                    />
                    <Link
                        text="Ваш прогрес"
                        icon={<ShowChart />}
                        path="/progress"
                    />
                    <Link
                        text="Таблиця лідерів"
                        icon={<MilitaryTech />}
                        path="/leader_board"
                    />
                </Nav>
            </Container>
            <Hr />
        </AppBar>
    );
}

function Link({
    text,
    icon,
    path,
}: {
    text: string;
    icon: any;
    path?: string;
}) {
    let navigate = useNavigate();
    let location = useLocation();
    return (
        <NavButton
            variant={location.pathname != path ? "contained" : "outlined"}
            onClick={() => navigate(path || "/")}
            color="secondary"
            startIcon={icon}
            isActive={location.pathname == path}
        >
            {text}
        </NavButton>
    );
}

const Nav = styled(Box)`
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
`;

const NavButton = styled(Button)<{ isActive: boolean }>`
    flex-grow: 1;
    ${({ isActive }) =>
        isActive &&
        `
        background-color: #e3f2fd;
    `}
`;

const Hr = styled(Box)`
    width: 100%;
    height: 0.6rem;
    background-color: ${({ theme }) => theme.palette.text.secondary};
`;

const Img = styled("img")`
    height: 3rem;
    filter: drop-shadow(1px 1px 2px rgba(255, 255, 255, 0.5));
`;
