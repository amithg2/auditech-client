import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>
          <b>Committer</b>
        </TableCell>
        <TableCell align="center">
          <b>Date</b>
        </TableCell>
        <TableCell align="center">
          <b>Message</b>
        </TableCell>
        <TableCell align="center">
          <b>Email</b>
        </TableCell>
        <TableCell align="center">
          <b>Files Added</b>
        </TableCell>
        <TableCell align="center">
          <b>Files Removed</b>
        </TableCell>
        <TableCell align="center">
          <b>Files Modified</b>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
