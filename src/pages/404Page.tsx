import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function RuPage() {
  return (
    <div className="firstcomp">
      <Typography variant="h1" component="h2">
        そんなページはない
      </Typography>

      <Button>
        <Typography>
          <NavLink to={"/"} style={{ textDecoration: "none" }}>
            main Page
          </NavLink>
        </Typography>
      </Button>
    </div>
  );
}

export default RuPage;
