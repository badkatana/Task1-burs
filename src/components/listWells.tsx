import { Box, Grid } from "@mui/material";
import { CardWell } from "./cardWell";
import { useEffect, useState } from "react";
import { getSites, getWells } from "../http/functions";
import { IWells } from "../pages/lib/VariantInterface";

type ListWellsProps = {
  projectId: string;
};

export const ListWells = (props: ListWellsProps) => {
  const [wells, setWells] = useState<IWells[]>([]);

  useEffect(() => {
    getSites(props.projectId).then((data) => {
      const fieldsString = data.map((item) => item.siteId).join(", ");
      getWells(fieldsString).then((well) => {
        well.map((item) => {
          item.siteName = data.find(
            (el) => (el.siteId = item.siteId)
          )?.siteName;
        });
        setWells(well);
      });
    });
  }, [props.projectId]);

  return (
    <Box
      sx={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        flex: 1,
      }}
    >
      {wells.map((well) => (
        <CardWell
          wellCommonName={well.wellCommonName}
          siteName={well.siteName}
          reason={well.reason}
          spudDate={well.spudDate}
        />
      ))}
    </Box>
  );
};
