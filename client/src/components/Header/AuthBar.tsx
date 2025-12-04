import type { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Typography } from "@mui/material";
import { openLoginModal } from "../../store/modalSlice";
import { Google, Logout } from "@mui/icons-material";
import { Box, styled, useMediaQuery } from "@mui/system";
import { logout } from "../../store/authReducer";

export default function AuthBar() {
    let dispatch = useDispatch<AppDispatch>();
    let user: any = useSelector<RootState, RootState["auth"]["user"]>(
        (state) => state.auth.user
    );
    let isTable = useMediaQuery("(max-width: 600px)");
    return (
        <>
            {user ? (
                <Wrapper>
                    {!isTable && (
                        <>
                            <Avatar
                                src={user.photos[0].value}
                                alt="avatar"
                                sx={{ width: 30, height: 30 }}
                            />
                            <Typography variant="body1">
                                {user.displayName}
                            </Typography>
                        </>
                    )}

                    <Button
                        variant="contained"
                        onClick={() => dispatch(logout())}
                        endIcon={<Logout sx={{ m: 0 }} />}
                        sx={{
                            minWidth: "auto",
                            ...(isTable && {
                                "& .MuiButton-endIcon": { margin: 0 },
                                px: 1,
                            }),
                        }}
                    >
                        {!isTable && "Вихід"}
                    </Button>
                </Wrapper>
            ) : (
                <Button
                    variant="contained"
                    onClick={() => dispatch(openLoginModal())}
                    endIcon={<Google sx={{ m: 0 }} />}
                    sx={{
                        minWidth: "auto",
                        ...(isTable && {
                            "& .MuiButton-endIcon": { margin: 0 },
                            px: 1,
                        }),
                    }}
                >
                    {!isTable && "Увійти"}
                </Button>
            )}
        </>
    );
}
let Wrapper = styled(Box)`
    display: flex;
    gap: 1rem;
    align-items: center;
`;
