import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getProgress } from "../../store/resultsSlice";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import GoogleLoginButton from "../../components/LoginButton";
import { logout } from "../../store/authReducer";

export default function Progress() {
    let dispatch = useDispatch<AppDispatch>();
    let user: any = useSelector<RootState, RootState["auth"]["user"]>(
        (state) => state.auth.user
    );
    let progress = useSelector<RootState, RootState["results"]["progress"]>(
        (state) => state.results.progress
    );
    useEffect(() => {
        if (user) dispatch(getProgress());
    }, [user]);
    return (
        <Wrapper>
            {user ? (
                <>
                    <Typography variant="h2">
                        Вітаю, {user.displayName}!
                    </Typography>
                    <Typography variant="h4">
                        Ви розшифрували {progress} пазл(ів)!
                    </Typography>
                    <Button variant="contained" color="secondary">
                        Поділитися результатом
                    </Button>
                    <Button variant="contained" color="error" onClick={() => dispatch(logout())}>
                        Вийти з облікового запису
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="h4" textAlign="center">
                        Авторизуйтеся на сайті, щоб зберегти та відсідковувати
                        Ваш прогрес.
                    </Typography>
                    <GoogleLoginButton />
                </>
            )}
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
    background-color: ${({ theme }: any) => theme.palette.primary.main};
    color: ${({ theme }: any) => theme.palette.text.primary};
`;
