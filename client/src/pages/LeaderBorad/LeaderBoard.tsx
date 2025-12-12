import { Box, styled, Typography } from "@mui/material";
import { ProgressCard } from "../Home/Progress";
import LeadersBar from "./LeadersBar";
import LeaderTable from "./LeaderTable";

export default function LeaderBoard() {
    return (
        <Wrapper>
            <Typography variant="h2" textAlign="center">
                Таблиця лідерів
            </Typography>
            <Typography variant="body1" textAlign="center" color="text.secondary">
                Топ гравців, які врятували найбільше файлів Санти
            </Typography>
            <ProgressCard />
            <LeadersBar />
            <LeaderTable />
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    padding: 2rem 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
