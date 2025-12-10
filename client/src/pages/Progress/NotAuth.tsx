import styled from "@emotion/styled";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    alpha,
    useTheme,
} from "@mui/material";

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
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.2
                            ),
                            border: `1px solid ${alpha(
                                theme.palette.primary.main,
                                0.3
                            )}`,
                        }}
                    >
                        <CardContent
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <img src="./robot.png" height="90px" alt="" />
                            <Typography variant="h3">
                                Робокотик-помічник
                            </Typography>
                            <Typography variant="body1" color="secondary">
                                Наші робокотики допомагають Санті! Приєднуйся до
                                команди рятувальників!
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Wrapper>
            <Box
                sx={{
                    p: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                >
                    Зареєструватися
                </Button>
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
