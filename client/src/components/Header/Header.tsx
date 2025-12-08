import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    styled,
    useMediaQuery,
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
            position="static"
            sx={{ backgroundColor: "background.default" }}
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
                        <Nav>
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
                            {open ? <Menu /> : <Close />}
                        </IconButton>
                        <Drawer
                            open={open}
                            onClose={() => setOpen(false)}
                            anchor="top"
                        ></Drawer>
                    </>
                )}
            </Wrapper>
        </AppBar>
    );
}
function NavLink({ text, path }: { text: string; path?: string }) {
    const navigate = useNavigate();
    const location = useLocation();
    const active = location.pathname === path;

    return (
        <Button
            variant={active ? "contained" : "text"}
            onClick={() => navigate(path || "/")}
            color={active ? "primary" : "secondary"}
            sx={{ fontWeight: "100" }}
        >
            {text}
        </Button>
    );
}

const Nav = styled(Box)`
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
`;

const Logo = styled("img")`
    height: 30px;
`;

const Wrapper = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`;
