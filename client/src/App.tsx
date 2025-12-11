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
import Rules from "./pages/Rules/Rules";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import { getProgress } from "./store/resultsSlice";
import LeaderBoard from "./pages/LeaderBorad/LeaderBoard";

export default function App() {
    let dispatch = useDispatch<AppDispatch>();
    let user = useSelector<RootState, RootState["auth"]["user"]>((state) => state.auth.user);
    useEffect(() => {
        if (user) dispatch(getProgress());
    }, [user]);
    return (
        <ThemeProvider>
            <Wrapper>
                <Header />
                <Content>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/decode" element={<Decode />} />
                        <Route path="/progress" element={<Progress />} />
                        <Route path="/rules" element={<Rules />} />
                        <Route path="/leader_board" element={<LeaderBoard />} />
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
