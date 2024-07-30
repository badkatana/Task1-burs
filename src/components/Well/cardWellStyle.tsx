import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledButtonEvent = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));
