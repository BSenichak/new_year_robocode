import { Box, Container, styled } from "@mui/material";
import "./styles/generalStyles.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Decode from "./pages/Decode/Decode";
import Progress from "./pages/Progress/Progress";
import { ThemeProvider } from "./styles/ThemeProvider";

export default function App() {
    return (
        <ThemeProvider>
            <Wrapper>
                <Header />
                <Content>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/decode" element={<Decode />} />
                        <Route path="/progress" element={<Progress />} />
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
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
`;

let Content = styled(Container)`
    flex: 1;
    display: flex;
    flex-direction: column;
`;
