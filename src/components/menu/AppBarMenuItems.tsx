import { Box, Button, Typography } from "@mui/material";
import { IVariant } from "../../interfaces/IVariant";

type AppBarMenuItemProps = {
  menuItems: IVariant[];
  handleClick: (value: IVariant) => void;
};

export const AppBarMenuItems = (props: AppBarMenuItemProps) => {
  return (
    <Box>
      {props.menuItems.map((item) => (
        <Button key={item.projectId} onClick={(e) => props.handleClick(item)}>
          <Typography textAlign="center" style={{ color: "white" }}>
            {item.projectName}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};
