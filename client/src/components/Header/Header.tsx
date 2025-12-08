import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
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
            sx={{ backgroundColor: "background.default", zIndex: 100 }}
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
                            {!open ? <Menu /> : <Close />}
                        </IconButton>
                    </>
                )}
            </Wrapper>
            <Drawer
                open={open}
                anchor="top"
                variant="temporary" // або "temporary" якщо треба анімацію
                onClose={() => setOpen(false)}
                ModalProps={{
                    BackdropProps: {
                        style: {
                            backdropFilter: "blur(5px)",
                        },
                    },
                }}
                sx={{
                    "& .MuiDrawer-paper": {
                        zIndex: (theme) => theme.zIndex.appBar - 1, // під хедером
                    },
                }}
            >
                <List sx={{bgcolor: (theme) => theme.palette.background.paper}}>
                    <ListItem
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Logo
                            onClick={() => navigate("/")}
                            src="/logo white.png"
                            alt="logo"
                        />
                        <IconButton
                            color="inherit"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <Menu /> : <Close />}
                        </IconButton>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpen(false)}>
                        <NavLink text="Головна сторінка" path="/" fullWidth />
                    </ListItem>
                    <ListItem onClick={() => setOpen(false)}>
                        <NavLink
                            text="Розшифрувати файл"
                            path="/decode"
                            fullWidth
                        />
                    </ListItem>
                    <ListItem onClick={() => setOpen(false)}>
                        <NavLink
                            text="Ваш прогрес"
                            path="/progress"
                            fullWidth
                        />
                    </ListItem>
                    <ListItem onClick={() => setOpen(false)}>
                        <NavLink
                            text="Таблиця лідерів"
                            path="/leader_board"
                            fullWidth
                        />
                    </ListItem>
                    <ListItem>
                        <LoginButton fullWidth />
                    </ListItem>
                </List>
            </Drawer>
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

    return (
        <Button
            variant={active ? "contained" : "text"}
            onClick={() => {
                navigate(path || "/");
                window.scrollTo(0, 0);
            }}
            color={active ? "primary" : "secondary"}
            sx={{ fontWeight: "100", justifyContent: "start" }}
            fullWidth={fullWidth}
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
    @media (max-width: 639px) {
        padding: 1rem;
    }
`;
