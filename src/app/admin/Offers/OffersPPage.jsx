"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Input,
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import dynamic from 'next/dynamic';

// Dynamically import the editor since it might use 'self' or 'window'
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const OffersPPage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [sizes, setSizes] = useState([]);
  const [companies, setCompanies] = useState([]);  // Add state to store companies
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [model, setModel] = React.useState(false);
  const handleModel = () => setModel(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSubmit, setSnackbarSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [deleteSuccessSnackbar, setDeleteSuccessSnackbar] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    id: null,
  });

  const handleCancelDelete = () => {
    setDeleteConfirmation({ open: false, id: null });
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `/api/offers/${deleteConfirmation.id}`,
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        setDeleteSuccessSnackbar(true);
        setTimeout(() => {
          setDeleteSuccessSnackbar(false);
        }, 5000);
  
        const updatedCategories = sizes.filter(
          (category) => category.id !== deleteConfirmation.id
        );
        setSizes(updatedCategories);
      } else {
        console.error("Failed to delete offer");
      }
    } catch (error) {
      console.error("Error deleting offer:", error.message);
    } finally {
      setDeleteConfirmation({ open: false, id: null });
    }
  };

  
  const modelClose = () => {
    setModel(false);
    setFormData({
      id: "",
      comp_id: "",
      offer_type: "",
      offer_title: "",
      offer_code: "",
      offer_description: "",
      offer_link1: "",
      offer_link2: "",
      offer_users: "",
      offer_expiry: "",
      offer_isverify: "",
      offer_details: ""
    });
  };
  
  const handleDelete = (row) => {
    if (row && row.id) {
      setDeleteConfirmation({ open: true, id: row.id });
    } else {
      console.error("Invalid Offer for deletion");
    }
  };

  useEffect(() => {
    fetchData();
    fetchCompanies();  // Fetch companies when the component loads
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/offers");
      setSizes(response.data);
    } catch (error) {
      console.error("Error fetching offers: ", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("/api/company");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies: ", error);
    }
  };

  const [formData, setFormData] = useState({
    id: "",
    comp_id: "",
    offer_type: "Code",  // Set a default value if needed
    offer_title: "",
    offer_code: "",
    offer_description: "",
    offer_link1: "",
    offer_link2: "",
    offer_users: "",
    offer_expiry: "",
    offer_isverify: "",
    offer_details:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    if (editingCategory) {
      setEditingCategory(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    const requiredFields = [
        'comp_id',
        'offer_type',
        'offer_title',
        'offer_code',
        'offer_description',
        'offer_link1',
        'offer_link2',
        'offer_users',
        'offer_expiry',
        'offer_isverify'
    ];

    const isFormValid = requiredFields.every(field => formData[field] && formData[field].trim() !== '');

    if (!isFormValid) {
        setSnackbarSubmit(true);
        setTimeout(() => {
            setSnackbarSubmit(false);
        }, 5000);
        setLoad(false);
        return;
    }

    try {
        const submitData = {
            ...formData,
            comp_id: parseInt(formData.comp_id),
        };

        const result = await axios.post("/api/offers", submitData);
        toast.success("Record Has Been added Successfully!");
        setLoad(false);
        modelClose();
        window.location.reload();
    } catch (error) {
        console.error("Error occurred while sending data to the API", error.response || error);
        setLoad(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoad(true);
  
    if (
      !editingCategory.comp_id ||
      !editingCategory.offer_type ||
      !editingCategory.offer_title ||
      !editingCategory.offer_code ||
      !editingCategory.offer_description ||
      !editingCategory.offer_link1 ||
      !editingCategory.offer_link2 ||
      !editingCategory.offer_users ||
      !editingCategory.offer_expiry ||
      !editingCategory.offer_isverify
    ) {
      setSnackbarSubmit(true);
      setTimeout(() => {
        setSnackbarSubmit(false);
      }, 5000);
      setLoad(false);
      return;
    }
  
    try {
      const submitData = {
        ...editingCategory,
        comp_id: parseInt(editingCategory.comp_id),
      };

      const result = await axios.put(
        `/api/offers/${editingCategory.id}`,
        submitData
      );
  
      toast.success("Record has been updated successfully!");
      setLoad(false);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error occurred while updating the data:", error.response || error);
      toast.error("Failed to update the record");
      setLoad(false);
    }
  };

  const handleOpen = (sizes) => {
    setEditingCategory(sizes);
    setFormData({
      id: sizes.id,
      comp_id: sizes.comp_id,
      offer_type: sizes.offer_type,
      offer_title: sizes.offer_title,
      offer_code: sizes.offer_code,
      offer_description: sizes.offer_description,
      offer_link1: sizes.offer_link1,
      offer_link2: sizes.offer_link2,
      offer_users: sizes.offer_users,
      offer_expiry: sizes.offer_expiry,
      offer_isverify: sizes.offer_isverify,
      offer_details: sizes.offer_details,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageFile(null);
    setEditingCategory(null);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Company",
        accessor: "comp_id",
        Cell: ({ value }) => {
          const company = companies.find(c => c.id === value);
          return company ? company.com_title : "Unknown";
        },
      },
      {
        Header: "Offer Title",
        accessor: "offer_title",
      },
      {
        Header: "Offer Type",
        accessor: "offer_type",
      },
      {
        Header: "Offer Code",
        accessor: "offer_code",
      },
      {
        Header: "Offer Expiry",
        accessor: "offer_expiry",
      },
      {
        Header: "Action",
        accessor: "updateButton",
        Cell: ({ row }) => (
          <div className=" flex gap-6">
            <FaUserEdit
              onClick={() => handleOpen(row.original)}
              style={{
                fontSize: "26px",
                color: "#006a5c",
                paddingRight: "6px",
                cursor: "pointer",
              }}
            />
            <MdDeleteForever
              onClick={() => handleDelete(row.original)}
              style={{ fontSize: "26px", color: "#b03f37", cursor: "pointer" }}
            />
          </div>
        ),
      },
    ],
    [companies]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: sizes,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Toolbar>
          <Input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            placeholder={`Search`}
          />
        </Toolbar>
        <Button
          className="font=[18px] px-3 py-2 font-normal"
          style={{
            height: "40px",
            backgroundColor: "#E3B505",
            color: "black",
          }}
          onClick={handleModel}
        >
          ADD New
        </Button>
      </div>

      <TableContainer component={Paper} {...getTableProps()}>
        <Table>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: sizes.length }]}
        colSpan={5}
        count={sizes.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        showLastButton={true}
        showFirstButton={true}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      <Dialog
        open={model}
        style={{ maxwidth: "width:720px" }}
        onClose={modelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="modal-modal-title">
          <Typography variant="h6" component="div">
            New Offer
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <h3 style={{ marginTop: "20px", width: "100%" }}>Select Company</h3>
            <select
              value={formData.comp_id}
              onChange={handleInputChange}
              name="comp_id"
              style={{ marginTop: "20px", width: "100%", padding: "10px" }}
            >
              <option key={0} value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.com_title}
                </option>
              ))}
            </select>

            <h3 style={{ marginTop: "20px", width: "100%" }}>Offer Type</h3>
            <select
              name="offer_type"
              value={formData.offer_type}  // Ensure this binds to formData.offer_type
              onChange={handleInputChange}
              style={{ marginTop: "10px", width: "100%", padding: "10px" }}
            >
              <option value="Code">Code</option>
              <option value="Offer">Offer</option>
            </select>

            <TextField
              label="Offer Title"
              type="text"
              name="offer_title"
              value={formData.offer_title}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />
            <TextField
              label="Offer Code"
              type="text"
              name="offer_code"
              value={formData.offer_code}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />
            <TextField
              label="Offer Description"
              name="offer_description"
              type="text"
              value={formData.offer_description}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />
            <TextField
              label="Offer Link 1"
              name="offer_link1"
              type="text"
              value={formData.offer_link1}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />
            <TextField
              label="Offer Link 2"
              name="offer_link2"
              type="text"
              value={formData.offer_link2}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />
            <TextField
              label="Offer Users"
              name="offer_users"
              type="text"
              value={formData.offer_users}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />
            <TextField
              label="Offer Expiry"
              name="offer_expiry"
              type="text"
              value={formData.offer_expiry}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />
            <h3 style={{ marginTop: "20px", width: "330px" }}>
              Is Verify
            </h3>
            <select
              name="offer_isverify"
              value={formData.offer_isverify}
              onChange={handleInputChange}
              style={{ marginTop: "20px", width: "100%", padding: "10px" }}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <JoditEditor
              ref={editor}
              value={formData.offer_details}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) =>
                setFormData({
                  ...formData,
                  offer_details: newContent,
                })
              } 
            />
            <DialogActions>
              <Button
                type="submit"
                disabled={load}
                variant="contained"
                className="font=[18px] flex content-center items-center justify-center px-8 py-2 font-normal"
                style={{
                  backgroundColor: "#E3B505",
                  color: "black",
                }}
              >
                {`${load ? "Loading...." : "Save"}`}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ width: "clamp(320px, 100%, 450px)", margin: "auto" }}
      >
        <DialogTitle id="modal-modal-title">
          <Typography variant="h6" component="div">
            Edit Offer Data
          </Typography>
        </DialogTitle>
        <DialogContent>
          {editingCategory && (
            <form>
              <TextField
                label="ID"
                value={editingCategory.id}
                fullWidth
                disabled
                style={{ marginTop: "20px", display: "none" }}
              />
              <select
                name="comp_id"
                value={editingCategory.comp_id}
                onChange={handleInputChange}
                fullWidth
                style={{ marginTop: "20px", padding: "10px" }}
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.com_title}
                  </option>
                ))}
              </select>
              <TextField
                label="Offer Type"
                name="offer_type"
                value={editingCategory.offer_type}
                fullWidth
                onChange={handleInputChange}
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Title"
                name="offer_title"
                value={editingCategory.offer_title}
                fullWidth
                onChange={handleInputChange}
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Code"
                name="offer_code"
                value={editingCategory.offer_code}
                fullWidth
                onChange={handleInputChange}
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Description"
                name="offer_description"
                value={editingCategory.offer_description}
                fullWidth
                onChange={handleInputChange}
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Link 1"
                name="offer_link1"
                value={editingCategory.offer_link1}
                fullWidth
                onChange={handleInputChange}
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Link 2"
                name="offer_link2"
                value={editingCategory.offer_link2}
                fullWidth
                onChange={handleInputChange}
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Users"
                name="offer_users"
                value={editingCategory.offer_users}
                fullWidth
                onChange={handleInputChange}
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Expiry"
                name="offer_expiry"
                value={editingCategory.offer_expiry}
                fullWidth
                onChange={handleInputChange}
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Is Verify"
                name="offer_isverify"
                value={editingCategory.offer_isverify}
                fullWidth
                onChange={handleInputChange}
                style={{ marginTop: "20px" }}
              />
              <JoditEditor
                ref={editor}
                value={editingCategory.offer_details}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) =>
                  setEditingCategory({
                    ...editingCategory,
                    offer_details: newContent,
                  })
                }
              />
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  disabled={loading}
                  style={{ marginTop: "20px", width: "100%" }}
                >
                  {`${loading ? "Loading...." : "Save"}`}
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success">Offer saved successfully!</Alert>
      </Snackbar>
      <Snackbar
        open={snackbarSubmit}
        autoHideDuration={5000}
        onClose={() => setSnackbarSubmit(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error">Please fill in all the required fields.</Alert>
      </Snackbar>
      <Snackbar
        open={deleteSuccessSnackbar}
        autoHideDuration={5000}
        onClose={() => setDeleteSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="warning">Offer successfully deleted!</Alert>
      </Snackbar>

      <Dialog
        open={deleteConfirmation.open}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <DialogTitle id="delete-confirmation-title">
          <Typography variant="h6" component="div">
            Confirm Deletion
          </Typography>
        </DialogTitle>
        <DialogContent>
          {deleteConfirmation.id && (
            <Typography variant="body1">
              Are you sure you want to delete the offer with ID{" "}
              {deleteConfirmation.id}?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OffersPPage;
