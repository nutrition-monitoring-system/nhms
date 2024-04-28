import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { FaAngleDown as KeyboardArrowDownIcon } from "react-icons/fa";
import { FaAngleUp as KeyboardArrowUpIcon } from "react-icons/fa";
import { Chip, LinearProgress, Pagination } from "@mui/material";

export default function AdminTable(props) {
  const { rows, onSelect } = props;
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleClick = (row) => {
    setSelectedRow(row.id);
    onSelect(row);
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ minHeight: 400 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Username</TableCell>
              <TableCell align="right">Symptoms</TableCell>
              <TableCell align="right">Status</TableCell>
              {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.name}
                row={row}
                selected={selectedRow === row.id}
                onClick={() => handleClick(row)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-center mt-4">
        <Pagination count={10} color="primary" />
      </div>
    </>
  );
}

function Row(props) {
  const { row, onClick, selected } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}
        hover
        onClick={onClick}
        selected={selected}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.symptoms.length}</TableCell>
        <TableCell align="right">
          <button
            className={
              row.status === "Sick" ? "chip bg-rose-400" : "chip bg-emerald-400"
            }
          >
            {row.status}
          </button>
        </TableCell>
        {/* <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Symptom Name</TableCell>
                    <TableCell align="right">Intensity</TableCell>
                    {/* <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.symptoms.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell component="th" scope="row">
                        {item.date}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">
                        <div className="flex items-center justify-end gap-2">
                          <LinearProgress
                            className="flex-1"
                            color="primary"
                            variant="determinate"
                            value={Number(item.intensity) * 10}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="inline"
                          >
                            {item.intensity}
                          </Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
