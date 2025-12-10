import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getProgress } from "../../store/resultsSlice";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import LoginButton from "../../components/LoginButton";
import NotAuth from "./NotAuth";

export default function Progress() {
    let dispatch = useDispatch<AppDispatch>();
    let user: any = useSelector<RootState, RootState["auth"]["user"]>(
        (state) => state.auth.user
    );
    // let progress = useSelector<RootState, RootState["results"]["progress"]>(
    //     (state) => state.results.progress
    // );
    useEffect(() => {
        if (user) dispatch(getProgress());
    }, [user]);
    if (!user) return <NotAuth />;
    return (
        <Wrapper>
            <Typography variant="h4" textAlign="center">
                Авторизуйтеся на сайті, щоб зберегти та відсідковувати Ваш
                прогрес.
            </Typography>
            <LoginButton />
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    padding: 2rem 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;
