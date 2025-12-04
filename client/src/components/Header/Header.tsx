import {
    AppBar,
    Box,
    Button,
    Container,
    styled,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Home as HomeIcon,
    LockOpen,
    ShowChart,
    MilitaryTech,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { useEffect } from "react";
import { fetchMe } from "../../store/authReducer";

export default function Header() {
    let dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchMe());
    }, []);
    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: "background.default" }}
        >
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Logo src="/logo_ny.svg" alt="logo" />
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Врятуй свято з Robocode
                    </Typography>
                </Box>

                <Nav>
                    <NavLink
                        text="Головна сторінка"
                        icon={<HomeIcon />}
                        path="/"
                    />
                    <NavLink
                        text="Розшифрувати файл"
                        icon={<LockOpen />}
                        path="/decode"
                    />
                    <NavLink
                        text="Ваш прогрес"
                        icon={<ShowChart />}
                        path="/progress"
                    />
                    <NavLink
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
function NavLink({
    text,
    icon,
    path,
}: {
    text: string;
    icon: React.ReactNode;
    path?: string;
}) {
    const navigate = useNavigate();
    const location = useLocation();
    let isTablet = useMediaQuery("(max-width: 600px)");

    const active = location.pathname === path;

    return (
        <NavButton
            variant={active ? "outlined" : "contained"}
            color="secondary"
            startIcon={icon}
            isActive={active}
            onClick={() => navigate(path || "/")}
        >
            {!isTablet && text}
        </NavButton>
    );
}

const Nav = styled(Box)`
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
`;

const NavButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
    flex-grow: 1;

    ${({ isActive, theme }) =>
        isActive &&
        `
      background-color: ${theme.palette.action.selected};
    `}
    ${({ theme }) => `
    ${theme.breakpoints.down("sm")} {
      & .MuiButton-startIcon {
        margin: 0;
      }
      padding-left: ${theme.spacing(1)};
      padding-right: ${theme.spacing(1)};
      min-width: auto; 
    }
  `}
`;

const Hr = styled(Box)`
    width: 100%;
    height: 0.6rem;
    background-color: ${({ theme }) => theme.palette.text.secondary};
`;

const Logo = styled("img")`
    height: 3rem;
    filter: drop-shadow(1px 1px 2px rgba(255, 255, 255, 0.5));
`;
