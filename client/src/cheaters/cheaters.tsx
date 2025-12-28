import type { FC } from 'react';
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Cheaters: FC = () => {
    return (
        <Page>
            <Container>
                <Image
                    src="/santa-image.png"
                    alt="Санта і система листів"
                    loading="eager"
                />

                <Title variant="h3">
                    О ні! Хакери увірвались до таємної системи листів Санти!
                </Title>

                <Text variant="body1">
                    Застосували скрипти і «штучно» розшифрували всі листи, чим ще більше
                    переплутали вміст листів!
                </Text>

                <Text variant="body1">
                    Санта в розпачі, система показує нереальні цифри, але хто як не ми
                    зможе навести порядок і врятувати магію Різдва?
                </Text>

                <Text variant="body1">
                    Всіх хакерів буде анульовано і відправлено до Грінча
                </Text>

                <TextStrong variant="body1">
                    Тимчасово розшифровка файлів на паузі. Санта і його помічники мають до
                    завтра відновити порядок та повернути математичний спосіб розшифровки
                    листів-файлів
                </TextStrong>
            </Container>
        </Page>
    );
};

const Page = styled(Box)`
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  display: flex;
  justify-content: center;
  padding: 48px 16px;

  @media (max-width: 600px) {
    padding: 28px 14px;
  }
`;

const Container = styled(Box)`
  width: 100%;
  max-width: 860px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Image = styled("img")`
  width: min(320px, 100%);
  height: auto;
  display: block;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    margin-bottom: 16px;
  }
`;

const Title = styled(Typography)`
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    font-size: 1.65rem; /* примерно h4 */
  }
`;

const Text = styled(Typography)`
  max-width: 760px;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 12px;

  @media (max-width: 600px) {
    font-size: 1rem;
    line-height: 1.55;
  }
`;

const TextStrong = styled(Text)`
  font-weight: 700;
  margin-top: 6px;
`;

export { Cheaters };
