import { Box, styled, Typography } from "@mui/material";
import LoginModal from "../../components/LoginModal/LoginModal";
import LogoutButton from "../../components/LoginModal/LogoutButton";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { openLoginModal } from "../../store/modalSlice";

export default function Home() {
    let dispatch = useDispatch<AppDispatch>();

    return (
        <Wrapper>
            <TextWrapper>
                <Typography variant="body1" textAlign="center">
                    Злі хакери взламали комп’ютер Санта Клауса та зашифрували його
                    файли. У цих файлах знаходиться інформація про дітей, які вели
                    себе чемно в цьому році, та обіцяні для них подарунки.
                    Допоможіть Санта Клаусу розшифрувати файли, щоб відновити список
                    дітей. Кожен розшифрований файл - це врятоване Різдво для тисяч
                    сімей!
                </Typography>
                <Box textAlign="center" color="secondary.main" mt={1}>
                    Допомогти Санта Клаусу!
                </Box>
            </TextWrapper>

            <Iframe
                src="https://www.youtube.com/embed/8DTz2C2r7H0?si=lehMGHhFiw_eRz8F"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />

            <LoginModal/>
            <button onClick={()=>dispatch(openLoginModal())}>sdfsd</button>
            <LogoutButton />
        </Wrapper>
    );
}

const Wrapper = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    flex-grow: 1;
    gap: 2rem;
`;

const TextWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Iframe = styled("iframe")`
    width: 100%;
    aspect-ratio: 16 / 9;
`;
