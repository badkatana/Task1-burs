import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardButtonArea from "./cardButtonArea";
import { IWells } from "../../interfaces/IWell";

export const CardWell = (props: IWells) => {
  const navigate = useNavigate();
  const chooseWell = (wellId?: string) => {
    navigate(`/${wellId}`);
  };

  const checkActiveWell = (): boolean => {
    if (window.location.pathname.includes(props.wellId)) {
      return true;
    }
    return false;
  };

  return (
    <div style={{ display: "inline-block", margin: 10 }}>
      <Card raised={checkActiveWell()}>
        <div onClick={() => chooseWell(props.wellId)}>
          <CardContent
            sx={{
              maxWidth: 275,
              maxHeight: 275,
              cursor: "pointer",
            }}
          >
            <Typography color="text.secondary">
              Куст {props.siteName}
            </Typography>
            <Typography variant="h5">
              Скважина {props.wellCommonName}
            </Typography>
            <Typography color="text.secondary">
              Дата забуривания:{" "}
              {props.spudDate == null
                ? "No data"
                : props.spudDate.split("T")[0]}
            </Typography>
            <Typography color="text.secondary">
              {props.reason == null ? "No data" : props.reason}
            </Typography>
          </CardContent>
        </div>
        <CardButtonArea {...props} />
      </Card>
    </div>
  );
};
