import { Box, Container, styled, ThemeProvider } from "@mui/material";
import Theme from "./styles/muiTheme";
import "./styles/generalStyles.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

export default function App() {
    return (
        <ThemeProvider theme={Theme}>
            <Wrapper>
                <Header />
                <Content>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Content>
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
    display: flex;
    flex-direction: column;
`;
