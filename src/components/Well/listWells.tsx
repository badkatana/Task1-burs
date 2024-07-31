import { Box } from "@mui/material";
import { CardWell } from "./cardWell";
import { useEffect, useState } from "react";
import { getSites, getWells } from "../../http/functions";
import { useNavigate } from "react-router-dom";
import { ISites, IWells } from "../../interfaces/IWell";
import { IVariant } from "../../interfaces/IVariant";
import { useQuery } from "@tanstack/react-query";

export const ListWells = (props: IVariant) => {
  const navigate = useNavigate();

  const { data: sitesData = [], error: sitesError } = useQuery<ISites[], Error>(
    {
      queryKey: ["sites", props.projectId],
      queryFn: () => getSites(props.projectId),
    }
  );

  const { data: wellsData = [], error: wellsError } = useQuery<IWells[], Error>(
    {
      queryKey: ["wells", sitesData],
      queryFn: () => {
        const fieldsString = sitesData.map((item) => item.siteId).join(", ");
        return getWells(fieldsString);
      },
    }
  );

  useEffect(() => {
    if (wellsData && wellsData.length > 0) {
      const currentPath = window.location.pathname.substring(1);
      const currentWell = wellsData.find((well) =>
        well.wellId.includes(currentPath)
      );

      if (!currentPath || !currentWell) {
        navigate(`/${wellsData[0].wellId}`);
      }

      wellsData.forEach((item) => {
        item.siteName =
          sitesData.find((site) => site.siteId === item.siteId)?.siteName || "";
      });
    }
  }, [wellsData, sitesData, navigate]);

  if (sitesError || wellsError) {
    return (
      <div>Произошла ошибка: {sitesError?.message || wellsError?.message}</div>
    );
  }

  return (
    <Box
      sx={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        flex: 1,
      }}
    >
      {wellsData?.map((well) => (
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
