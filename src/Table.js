import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHeader from "./TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import spiningGif from "./spinning-loading.gif";

function BasicTable() {
  const [rowsData, setRowsData] = useState();
  const makeDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://auditech-server.herokuapp.com/commits/all"
      );
      const rows = data.commits.map((e) => {
        return {
          committer: e.committer,
          date: makeDate(e.date),
          message: e.message,
          email: e.email,
          isAuthor: e.isAuthor,
          filesAdded: e.filesAdded,
          filesRemoved: e.filesRemoved,
          filesModified: e.filesModified,
        };
      });
      setRowsData(rows);
    };
    fetchData();
  }, []);

  const makeFiles = (files, action) => {
    if (files && files.length) {
      const newArr = files.map((e, i) => {
        return (
          <div key={`${action}-${i}`}>
            <p>
              <b>Name: </b>
              <a href={e.fileUrl} target={"_blank"}>
                {e.fileName}
              </a>
            </p>
          </div>
        );
      });
      return newArr;
    } else {
      return <p>No files {action ? action : ""}</p>;
    }
  };

  if (rowsData) {
    return (
      <div className="table">
        <TableContainer component={Paper}>
          <Table>
            <TableHeader />
            <TableBody>
              {rowsData?.map((row, i) => (
                <TableRow
                  key={`rows-${i}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{i+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.isAuthor ? (
                      <b> {row.committer} </b>
                    ) : (
                      <>{row.committer}</>
                    )}
                  </TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.message}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {makeFiles(row.filesAdded, "Added")}
                  </TableCell>
                  <TableCell align="center">
                    {makeFiles(row.filesRemoved, "Removed")}
                  </TableCell>
                  <TableCell align="center">
                    {makeFiles(row.filesModified, "Modified")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <img src={spiningGif} />;
  }
}

export default BasicTable;
