import { AppBar, CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getVariants } from "../http/functions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ListWells } from "../components/well/listWells";
import { ListReports } from "../components/reports/listReports";
import { AppBarMenuItems } from "../components/menu/appBarMenuItems";
import {
  StyledToolBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledTypography,
  StyledContainerDiv,
} from "./variantPageStyles";
import { IVariant } from "../interfaces/IVariant";
import { useQuery } from "@tanstack/react-query";

function VariantPage() {
  const { isLoading, data } = useQuery<IVariant[], Error>({
    queryKey: ["projects"],
    queryFn: getVariants,
    refetchInterval: Infinity,
  });
  const [selectedProject, setSelectedProject] = useState<IVariant | null>(null);

  useEffect(() => {
    if (data) {
      setSelectedProject(data![0]);
    }
  }, [data]);

  const handleClick = (project: IVariant) => {
    setSelectedProject(project);
  };

  if (isLoading || selectedProject === null) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ margin: 0 }}>
      <AppBar position="static">
        <StyledToolBar>
          <AppBarMenuItems menuItems={data!} handleClick={handleClick} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </StyledToolBar>
      </AppBar>

      <StyledTypography variant="h6">
        {selectedProject.projectName}
      </StyledTypography>
      <StyledContainerDiv>
        <ListWells {...selectedProject}></ListWells>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar sx={{ marginLeft: "auto" }} />
        </LocalizationProvider>
      </StyledContainerDiv>

      <StyledTypography variant="h6">Отчёты</StyledTypography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ListReports {...selectedProject} />
      </Box>
    </div>
  );
}

export default VariantPage;
