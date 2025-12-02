import { Box, styled, Typography } from "@mui/material";

export default function Home() {
    return (
        <Wrapper>
            <Typography variant="body1" textAlign="center">
                Злі хакери взламали комп’ютер Санта Клауса та зашифрували його
                файли. У цих файлах знаходиться інформація про дітей, які вели
                себе чемно в цьому році, та обіцяні для них подарунки.
                Допоможіть Санта Клаусу розшифрувати файли, щоб відновити список
                дітей. Кожен розшифрований файл - це врятоване Різдво для тисяч
                сімей!
                <Typography variant="body1" textAlign="center" color="secondary">Допомогти Санта Клаусу!</Typography>
            </Typography>
            <Iframe
                src="https://www.youtube.com/embed/8DTz2C2r7H0?si=lehMGHhFiw_eRz8F"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></Iframe>
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

const Iframe = styled("iframe")`
    width: 100%;
    aspect-ratio: 16 / 9;
`;
