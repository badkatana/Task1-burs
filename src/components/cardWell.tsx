import {
  Button,
  Card,
  CardActions,
  CardContent,
  styled,
  Typography,
} from "@mui/material";
import { IWells } from "../pages/lib/VariantInterface";

const StyledButtonEvent = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

export const CardWell = (props: IWells) => {
  return (
    <Card sx={{ display: "inline-block", margin: 2 }}>
      <CardContent sx={{ maxWidth: 275, maxHeight: 275 }}>
        <Typography color="text.secondary">Куст {props.siteName}</Typography>
        <Typography variant="h5">Скважина {props.wellCommonName}</Typography>
        <Typography color="text.secondary">
          Дата забуривания:{" "}
          {props.spudDate == null ? "No data" : props.spudDate.split("T")[0]}
        </Typography>
        <Typography color="text.secondary">
          {props.reason == null ? "No data" : props.reason}
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
