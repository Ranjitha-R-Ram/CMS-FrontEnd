import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  makeStyles,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import RawMaterialService from "../../ServiceLayer/RawMaterialService";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// //   search: {
// //     marginBottom: 16,
// //   },
// });

const ViewAllPage = () => {
  //const classes = useStyles();
  const [material, setMaterial] = useState([]);

  //   const [search, setSearch] = useState("");

  useEffect(() => {
    loadMaterial();
  }, []);

  const loadMaterial = async () => {
    await RawMaterialService.ViewAllMaterial().then((response) => {
      setMaterial(response.data);
    });
  };

  //   const handleDelete = async (id) => {
  //     console.log(id);
  //     await EventService.Deletevenue(id).then((response) => {
  //       setMaterial(response.data);
  //       alert("Deleted Successfully");
  //       loadMaterial();
  //     });
  //   };

  return (
    <Paper>
      {/* <div className={classes.search}>
        <Search search={search} setSearch={setSearch} name="search" />
      </div> */}
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Raw Material Id</TableCell>
              <TableCell>Package Type</TableCell>
              <TableCell>Square Feet</TableCell>
              <TableCell>Story Builder</TableCell>
              <TableCell> House Type</TableCell>
              <TableCell>Paint Brand</TableCell>
              <TableCell>Aggregates</TableCell>
              <TableCell>Cement</TableCell>
              <TableCell>Steel</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {material

              //  .filter((st) => st.name.toLowerCase().includes(search))
              .map((material) => (
                <TableRow>
                  <TableCell>{material.id}</TableCell>
                  <TableCell>{material.packageType}</TableCell>
                  <TableCell>{material.squareFeet}</TableCell>
                  <TableCell>{material.storyBuilder}</TableCell>
                  <TableCell>{material.houseType}</TableCell>
                  <TableCell>{material.paintBrand}</TableCell>
                  <TableCell>{material.aggregates}</TableCell>
                  <TableCell>{material.cement}</TableCell>
                  <TableCell>{material.steel}</TableCell>
                  <TableCell>{material.cost}</TableCell>
                  <TableCell>
                    <IconButton>
                      <Link to={`/view-material/${material.id}`}>
                        <FaEye />
                      </Link>
                    </IconButton>
                    <IconButton>
                      <Link to={`/edit-material/${material.id}`}>
                        <FaEdit />
                      </Link>
                    </IconButton>
                    {/* <IconButton onClick={(e) => handleDelete(material.id)}>
                      <FaTrashAlt />
                    </IconButton> */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={"/add-material"}
        style={{ marginTop: 16 }}>
        Add Venue
      </Button>
    </Paper>
  );
};

export default ViewAllPage;
