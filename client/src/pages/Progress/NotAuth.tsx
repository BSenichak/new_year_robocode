import styled from "@emotion/styled";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography,
    useTheme,
} from "@mui/material";
import LoginButton from "../../components/LoginButton";

export default function NotAuth() {
    let theme = useTheme();
    return (
        <>
            <Wrapper>
                <Background />
                <Box
                    sx={{
                        zIndex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Card
                        sx={{
                            width: "100%",
                            maxWidth: 800,
                            background:
                                "linear-gradient(rgba(22, 70, 255, 0.2), rgba(169, 57, 255, 0.2))",
                            border: `1px solid rgba(255, 255, 255, 0.1)`,
                            position: "relative",
                            overflow: "visible",
                        }}
                    >
                        <img
                            src="./orange_blur.png"
                            alt="orange"
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: "256px",
                                height: "256px",
                                objectFit: "contain",
                                transform: "translate(70%, 50%)",
                            }}
                        />
                        <CardContent
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                position: "relative",
                            }}
                        >
                            <img src="./robot.png" height="90px" alt="" />
                            <Typography variant="h3">
                                Робокотик-помічник
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Наші робокотики допомагають Санті! Приєднуйся до
                                команди рятувальників!
                            </Typography>
                        </CardContent>
                        <Avatar
                            sx={{
                                bgcolor: theme.palette.warning.main,
                                zIndex: 1,
                                width: "50px",
                                height: "50px",
                                position: "absolute",
                                left: 0,
                                bottom: 0,
                                transform: "translate(-50%, 50%)",
                            }}
                        >
                            <img
                                src="./santa.png"
                                height="90px"
                                alt=""
                                style={{
                                    height: "38px",
                                }}
                            />
                        </Avatar>
                        <Avatar
                            sx={{
                                bgcolor: theme.palette.success.light,
                                zIndex: 1,
                                width: "50px",
                                height: "50px",
                                position: "absolute",
                                right: 0,
                                top: 0,
                                transform: "translate(50%, -50%)",
                            }}
                        >
                            <img
                                src="./gift.png"
                                height="90px"
                                alt=""
                                style={{
                                    height: "38px",
                                }}
                            />
                        </Avatar>
                    </Card>
                </Box>
            </Wrapper>
            <Box
                sx={{
                    py: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <LoginButton
                    color={"primary"}
                    style={{
                        padding: "12px 24px",
                        animation: "glowingBlue 2s ease-in-out infinite",
                    }}
                />
            </Box>
        </>
    );
}

let Wrapper = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    gap: 1rem;
    padding: 80px 0;
    align-items: stretch;
`;

let Background = styled(Box)`
    position: absolute;
    top: 0;
    bottom: 0;

    left: 50%;
    transform: translateX(-50%);

    width: 100vw;
    z-index: 0;
    background-color: ${({ theme }: any) => theme.palette.background.paper};
`;
