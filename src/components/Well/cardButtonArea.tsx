import { useEffect, useState } from "react";
import { getEvents } from "../../http/functions";
import { Button, CardActions, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { REPORT_TYPE } from "../../constants/strings";
import { IEvent, IWells } from "../../interfaces/IWell";
import { StyledButtonEvent } from "./cardWellStyle";

const useQueryParamUpdater = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(location.search);

    if (params.has(key)) {
      let existingValues = params.getAll(key);
      existingValues = existingValues.filter(
        (existingValue) =>
          !REPORT_TYPE.some((report) => report.alias === existingValue)
      );

      if (!existingValues.includes(value)) {
        existingValues.push(value);
      }

      params.delete(key);
      params.append(key, existingValues.join(","));
    } else {
      params.append(key, value);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return { updateQueryParam };
};
const CardButtonArea = (props: IWells) => {
  const [buttonItem, setButtonItem] = useState<IEvent[]>([]);
  const { updateQueryParam } = useQueryParamUpdater();
  const navigate = useNavigate();
  const handleAddValue = (value: string) => {
    updateQueryParam("field", value);
  };

  const handleResetParams = () => {
    navigate(`/${props.wellId}`);
  };

  const handlePlanSorting = (planType: string) => {
    navigate(`/${props.wellId}?field=${planType}`);
  };

  useEffect(() => {
    getEvents(props.wellId).then((data) => {
      const dataWithoutNullNames = data.filter(
        (item) => item.eventCode !== null
      );
      setButtonItem(dataWithoutNullNames);
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
        <Button size="small" onClick={() => handlePlanSorting("GEN_PLAN")}>
          План
        </Button>
        <Button size="small" onClick={() => handleResetParams()}>
          Все отчёты
        </Button>
      </CardActions>
    </div>
  );
};

export default CardButtonArea;
