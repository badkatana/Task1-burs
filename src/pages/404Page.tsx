import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCatFact } from "../http/functions";

function RuPage() {
  const [testa, setTesta] = useState({ fact: "Random Fact", length: 0 });
  useEffect(() => {
    getCatFact().then((data) => {
      setTesta(data);
    });
  }, []);

  return (
    <div className="firstcomp">
      <Typography variant="h1" component="h2">
        そんなページはない
      </Typography>
      <div>{testa.fact}</div>

      <Button>
        <Typography>
          <NavLink to={"/"} style={{ textDecoration: "none" }}>
            about Page
          </NavLink>
        </Typography>
      </Button>
    </div>
  );
}

export default RuPage;
