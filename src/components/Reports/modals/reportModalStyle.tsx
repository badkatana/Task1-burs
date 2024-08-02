import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  backgroundColor: "whitesmoke",
  boxShadow: "24",
  border: "2px solid grey",
  paddingLeft: "2%",
  paddingRight: "2%",
  paddingTop: "1%",
  paddingBottom: "1%",
  borderRadius: "2%",
  transform: "translate(-50%, -50%)",
  width: 500,
}));

// position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "white",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
export const StyledModalDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "3%",
}));

export const StyledModalEndDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

export const StyledModalButton = styled(Button)(({ theme }) => ({
  marginLeft: "auto",
}));
