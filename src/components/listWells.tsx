import { Box } from "@mui/material";
import { CardWell } from "./cardWell";
import { useEffect, useState } from "react";
import { getSites, getWells } from "../http/functions";
import { IWells } from "../pages/lib/VariantInterface";
import { useNavigate } from "react-router-dom";

type ListWellsProps = {
  projectId: string;
};

export const ListWells = (props: ListWellsProps) => {
  const [wells, setWells] = useState<IWells[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSites(props.projectId).then((data) => {
      const fieldsString = data.map((item) => item.siteId).join(", ");
      getWells(fieldsString).then((well) => {
        if (well) {
          if (
            window.location.pathname.substring(1) == "" ||
            !well.find((w) =>
              w.wellId.includes(window.location.pathname.substring(1))
            )
          ) {
            navigate(`/${well[0].wellId}`);
          }
          well?.map((item) => {
            item.siteName = data?.find(
              (el) => (el.siteId = item.siteId)
            )?.siteName;
          });
          setWells(well);
        }
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
      {wells?.map((well) => (
        <div style={{ display: "inline-block" }} key={well.wellId}>
          <CardWell
            active={well.active}
            wellCommonName={well.wellCommonName}
            siteName={well.siteName}
            reason={well.reason}
            wellId={well.wellId}
            spudDate={well.spudDate}
          />
        </div>
      ))}
    </Box>
  );
};
