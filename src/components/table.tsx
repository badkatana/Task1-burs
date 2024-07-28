import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import React from "react";

type TableProps = {
  columnNames: Array<string>;
  data: {
    name: string;
    bio: string;
    profession: string;
    country: string;
  }[];
};

export const TableSakura = (props: TableProps) => {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  // fixme: functions for changing pages. almost nothing changes

  function handleChangePage() {
    setpg(0);
  }

  function handleChangeRowsPerPage() {
    setrpg(rpg + 5);
    setpg(0);
  }
  return (
    <Paper>
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              {props.columnNames.map((column) => (
                <TableCell>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.profession}</TableCell>
                <TableCell>{row.bio}</TableCell>
                <TableCell>{row.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.data.length}
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
