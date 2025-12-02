import { Box, Container, styled, ThemeProvider } from "@mui/material";
import Theme from "./styles/muiTheme";
import "./styles/generalStyles.scss";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { getUsers } from "./store/authReducer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    return (
        <ThemeProvider theme={Theme}>
            <Wrapper>
                <Header />
                <Content>sdfs</Content>
                <Footer />
            </Wrapper>
        </ThemeProvider>
    );
}

const Wrapper = styled(Box)`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.text.primary};
`;

let Content = styled(Container)`
    flex: 1;
`;
