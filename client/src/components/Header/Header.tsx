import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    styled,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchMe } from "../../store/authReducer";
import LoginButton from "../LoginButton";
import { Close, Menu } from "@mui/icons-material";

export default function Header() {
    let dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchMe());
    }, []);
    let navigate = useNavigate();
    let isPhone = useMediaQuery("(max-width: 639px)");
    let [open, setOpen] = useState(false);
    return (
        <AppBar
            position={open ? "fixed" : "static"}
            sx={{
                backgroundColor: "background.default",
                zIndex: 100,
                height: "62px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Wrapper>
                <Logo
                    onClick={() => navigate("/")}
                    src="/logo white.png"
                    alt="logo"
                />
                {!isPhone ? (
                    <>
                        {" "}
                        <Nav sx={{gap: "8px"}}>
                            <NavLink text="Головна сторінка" path="/" />
                            <NavLink text="Розшифрувати файл" path="/decode" />
                            <NavLink text="Ваш прогрес" path="/progress" />
                            <NavLink
                                text="Таблиця лідерів"
                                path="/leader_board"
                            />
                        </Nav>
                        <LoginButton />
                    </>
                ) : (
                    <>
                        <IconButton
                            color="inherit"
                            onClick={() => setOpen(!open)}
                        >
                            {!open ? <Menu /> : <Close />}
                        </IconButton>
                    </>
                )}
            </Wrapper>
{open && (
    <>
        {/* Backdrop */}
        <Box
            onClick={() => setOpen(false)}
            sx={{
                position: "fixed",
                top: "62px",
                left: 0,
                width: "100%",
                height: "calc(100vh - 62px)",
                backgroundColor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(5px)",
                zIndex: 90,
            }}
        />

        {/* Меню */}
        <Box
            sx={{
                position: "fixed",
                top: "62px",
                left: 0,
                width: "100%",
                height: "calc(100vh - 62px)",
                backgroundColor: (theme) => theme.palette.background.paper,
                zIndex: 91,
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
        >
            <List sx={{ background: "#191924"}} >
                <ListItem onClick={() => setOpen(false)} sx={{py: "4px"}}>
                    <NavLink text="Головна сторінка" path="/" fullWidth />
                </ListItem>
                <ListItem onClick={() => setOpen(false)} sx={{py: "4px"}}>
                    <NavLink text="Розшифрувати файл" path="/decode" fullWidth />
                </ListItem>
                <ListItem onClick={() => setOpen(false)} sx={{py: "4px"}}>
                    <NavLink text="Ваш прогрес" path="/progress" fullWidth />
                </ListItem>
                <ListItem onClick={() => setOpen(false)} sx={{py: "4px"}}>
                    <NavLink text="Таблиця лідерів" path="/leader_board" fullWidth />
                </ListItem>
                <ListItem  sx={{py: "4px"}}>
                    <LoginButton fullWidth style={{p: "12px 20px", justifyContent: "flex-start", fontSize: "16px"}}/>
                </ListItem>
            </List>
        </Box>
    </>
)}

        </AppBar>
    );
}
function NavLink({
    text,
    path,
    fullWidth = false,
}: {
    text: string;
    path?: string;
    fullWidth?: boolean;
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const active = location.pathname === path;
    let theme = useTheme();
    return (
        <Button
            variant={active ? "contained" : "text"}
            onClick={() => {
                navigate(path || "/");
                window.scrollTo(0, 0);
            }}
            sx={{
                fontWeight: "100",
                justifyContent: "start",
                p: !fullWidth?"6px 14px": "12px 20px",
                color: active
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                fontSize: fullWidth ? "16px" : "14px",
                
            }}
            fullWidth={fullWidth}
        >
            {text}
        </Button>
    );
}

const Nav = styled(Box)`
    display: flex;
    gap: "8px";
    align-items: center;
`;

const Logo = styled("img")`
    height: 30px;
`;

const Wrapper = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
