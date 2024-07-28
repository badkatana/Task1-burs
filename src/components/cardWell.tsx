import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  styled,
  Typography,
} from "@mui/material";

// TODO change props names
type WellProps = {
  wellsId: number;
  projectId: number;
  kustId: number;
};

const StyledButtonEvent = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

export const CardWell = (props: WellProps) => {
  return (
    <Card>
      <CardContent sx={{ maxWidth: 275 }}>
        <Typography sx={{ fontStyle: 14 }} color="text.secondary">
          Куст {props.kustId}
        </Typography>
        <Typography variant="h5">Скважина {props.wellsId}</Typography>
        <Typography sx={{ fontStyle: 14 }} color="text.secondary">
          Проект: {props.projectId}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          БУР
        </Button>
        <StyledButtonEvent size="small" variant="outlined">
          ВМР
        </StyledButtonEvent>
        <Button size="small" variant="outlined">
          ОСВ
        </Button>
      </CardActions>
      <CardActions>
        <Button size="small">План</Button>
        <Button size="small">Все отчёты</Button>
      </CardActions>
    </Card>
  );
};
