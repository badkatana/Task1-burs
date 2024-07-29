import { TableContainer } from "@mui/material";
import { useEffect } from "react";
import { getEvents } from "../http/functions";

type ListEvents = {
  wellId: string;
};
export const ListEvents = (props: ListEvents) => {
  useEffect(() => {
    getEvents(props.wellId).then((data) => console.log(data));
  }, []);
  return (
    <TableContainer>
      <div></div>
    </TableContainer>
  );
};
