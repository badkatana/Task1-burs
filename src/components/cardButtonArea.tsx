import { useEffect, useState } from "react";
import { IEvent } from "../pages/lib/VariantInterface";
import { getEvents } from "../http/functions";
import { Button, CardActions, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

type CardButtons = {
  wellId: string;
};

const StyledButtonEvent = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const useQueryParamUpdater = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(location.search);

    if (params.has(key)) {
      const existingValues = params.getAll(key);
      existingValues.push(value);
      params.delete(key);
      params.append(key, existingValues.join(","));
    } else {
      params.append(key, value);
    }

    console.log(`${location.pathname}?${params.toString()}`);

    navigate(`${location.pathname}?${params.toString()}`);
  };

  return { updateQueryParam };
};
const CardButtonArea = (props: CardButtons) => {
  const [buttonItem, setButtonItem] = useState<IEvent[]>([]);
  const { updateQueryParam } = useQueryParamUpdater();
  const navigate = useNavigate();
  const handleAddValue = (value: string) => {
    updateQueryParam("field", value);
  };

  const handleResetParams = () => {
    navigate(`/${props.wellId}`);
  };

  useEffect(() => {
    getEvents(props.wellId).then((data) => {
      setButtonItem(data.filter((item) => item.eventCode !== null));
    });
  }, [props.wellId]);

  return (
    <div>
      <CardActions>
        {buttonItem.map((item) => (
          <StyledButtonEvent
            size="small"
            key={item.eventId}
            variant="outlined"
            onClick={() => handleAddValue(item.eventCode)}
          >
            {item.eventCode}
          </StyledButtonEvent>
        ))}
      </CardActions>
      <CardActions>
        <Button size="small">План</Button>
        <Button size="small" onClick={() => handleResetParams()}>
          Все отчёты
        </Button>
      </CardActions>
    </div>
  );
};

export default CardButtonArea;
function updateQueryParam(arg0: string, newValue: string) {
  throw new Error("Function not implemented.");
}
