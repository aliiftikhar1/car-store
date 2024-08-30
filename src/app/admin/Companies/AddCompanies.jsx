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
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Box,
  Typography,
  TextField,
  IconButton,
  Grid,
  Backdrop,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import JoditEditor from "jodit-react";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "axios";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";

export const getApiBaseUrl = () => {
  return process.env.BASE_URL;
};

const AddCompanies = () => {
  const editor = useRef(null);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [model, setModel] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSubmit, setSnackbarSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [deleteSuccessSnackbar, setDeleteSuccessSnackbar] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    id: null,
  });

  const handleDelete = (row) => {
    if (row && row.id) {
      setDeleteConfirmation({ open: true, id: row.id });
    } else {
      console.error("Invalid Company for deletion");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `/api/company/${deleteConfirmation.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setDeleteSuccessSnackbar(true);
        setTimeout(() => {
          setDeleteSuccessSnackbar(false);
        }, 5000);

        const updatedCompanies = companies.filter(
          (company) => company.id !== deleteConfirmation.id
        );
        setCompanies(updatedCompanies);
      } else {
        console.error("Failed to delete company");
      }
    } catch (error) {
      console.error("Error deleting company:", error.message);
    } finally {
      setDeleteConfirmation({ open: false, id: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ open: false, id: null });
  };

  const modelClose = () => {
    setModel(false);
    setFormData({
      id: "",
      com_title: "",
      comp_logo: "",
      comp_category: "",
      comp_description: "",
      comp_phone: "",
      comp_email: "",
      comp_website: "",
      comp_rating: "",
      com_details: "",
      company_details: "", // Resetting the new fields
      other_details: "",   // Resetting the new fields
    });
  };

  const [formData, setFormData] = useState({
    id: "",
    com_title: "",
    comp_logo: "",
    comp_category: "",
    comp_description: "",
    comp_phone: "",
    comp_email: "",
    comp_website: "",
    comp_rating: "",
    com_details: "",
    company_details: "", // New field for company details
    other_details: "",   // New field for other details
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (editingCompany) {
      setEditingCompany({
        ...editingCompany,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const uploadImageToExternalAPI = async (imageBase64) => {
    try {
      const response = await fetch('https://couponri.com/uploadImage.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageBase64 }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload image');
      }

      return result.image_url; // Assuming the API returns the image URL in this field
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed");
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        reject(new Error("Provided value is not a file or blob"));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setLoading(true); // Show loading overlay

    if (!formData.com_title || !formData.comp_logo || !formData.comp_category) {
      setSnackbarSubmit(true);
      setTimeout(() => {
        setSnackbarSubmit(false);
      }, 5000);
      setLoad(false);
      setLoading(false); // Hide loading overlay
      return;
    }

    try {
      const imageBase64 = await convertToBase64(formData.comp_logo);
      const uploadedImageUrl = await uploadImageToExternalAPI(imageBase64);

      const companyToSubmit = {
        ...formData,
        comp_logo: uploadedImageUrl,
      };

      await axios.post(`/api/company`, companyToSubmit);
      toast.success("Company has been added successfully!");
      setLoad(false);
      setLoading(false); // Hide loading overlay
      modelClose();
      window.location.reload();
    } catch (error) {
      console.error("Error occurred during submission", error);
      setLoad(false);
      setLoading(false); // Hide loading overlay
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setLoading(true); // Show loading overlay

    try {
      let uploadedImageUrl = editingCompany.comp_logo;

      if (editingCompany.comp_logo instanceof File) {
        const imageBase64 = await convertToBase64(editingCompany.comp_logo);
        uploadedImageUrl = await uploadImageToExternalAPI(imageBase64);
      }

      const companyToUpdate = {
        ...editingCompany,
        comp_logo: uploadedImageUrl,
      };

      await axios.put(`/api/company/${editingCompany.id}`, companyToUpdate);
      toast.success("Company has been updated successfully!");
      setLoad(false);
      setLoading(false); // Hide loading overlay
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error occurred while updating the data:", error);
      toast.error("Failed to update the company");
      setLoad(false);
      setLoading(false); // Hide loading overlay
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (editingCompany) {
        setEditingCompany({
          ...editingCompany,
          comp_logo: file, // Ensure this is a File object
        });
      } else {
        setFormData({
          ...formData,
          comp_logo: file, // Ensure this is a File object
        });
      }
    }
  };

  const handleOpen = (company) => {
    setEditingCompany(company);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCompany(null);
  };

  useEffect(() => {
    const fetchCategoriesAndCompanies = async () => {
      try {
        const [categoriesResponse, companiesResponse] = await Promise.all([
          fetch(`/api/category`),
          fetch(`/api/company`),
        ]);

        if (!categoriesResponse.ok || !companiesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData = await categoriesResponse.json();
        const companiesData = await companiesResponse.json();

        setCategories(categoriesData);
        setCompanies(companiesData);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };
    fetchCategoriesAndCompanies();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Company Name",
        accessor: "com_title",
      },
      {
        Header: "Category",
        accessor: "comp_category",
        Cell: ({ value }) => {
          const category = categories.find((c) => c.id === value);
          return category ? category.category_name : "Unknown";
        },
      },
      {
        Header: "Logo",
        accessor: "comp_logo",
        Cell: ({ value }) => (
          <img
            src={`https://couponri.com/uploads/${value.trim()}`}
            alt="Company Logo"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />
        ),
      },
      {
        Header: "Description",
        accessor: "comp_description",
      },
      {
        Header: "Phone",
        accessor: "comp_phone",
      },
      {
        Header: "Email",
        accessor: "comp_email",
      },
      {
        Header: "Website",
        accessor: "comp_website",
      },
      {
        Header: "Action",
        accessor: "updateButton",
        Cell: ({ row }) => (
          <div className="flex gap-6">
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
    [categories]
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
      data: companies,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <Box sx={{ padding: 3 }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading} // Show backdrop when loading is true
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Toolbar>
          <TextField
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            placeholder="Search"
            variant="outlined"
            size="small"
          />
        </Toolbar>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModel(true)}
          sx={{
            backgroundColor: "#E3B505",
            color: "black",
            ":hover": {
              backgroundColor: "#d3a004",
            },
          }}
        >
          ADD New
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      borderBottom: "2px solid #E3B505",
                    }}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id} {...cell.getCellProps()}>
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
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: companies.length }]}
        colSpan={5}
        count={companies.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        showLastButton
        showFirstButton
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      {/* Add Company Dialog */}
      <Dialog
        open={model}
        onClose={modelClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          <Typography variant="h6">New Company</Typography>
          <IconButton
            aria-label="close"
            onClick={modelClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Company Name"
                  name="com_title"
                  value={formData.com_title}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="comp_category"
                    value={formData.comp_category}
                    onChange={handleInputChange}
                    label="Category"
                  >
                    <MenuItem value="">
                      <em>Select Category</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="comp_description"
                  value={formData.comp_description}
                  fullWidth
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  name="comp_phone"
                  value={formData.comp_phone}
                  fullWidth
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="comp_email"
                  value={formData.comp_email}
                  fullWidth
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Website"
                  name="comp_website"
                  value={formData.comp_website}
                  fullWidth
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Rating"
                  name="comp_rating"
                  value={formData.comp_rating}
                  fullWidth
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <h3 style={{ marginBottom: "10px", color: "#333" }}>
                  Company Details
                </h3>
                <JoditEditor
                  ref={editor}
                  value={formData.company_details}
                  tabIndex={1}
                  onBlur={(newContent) =>
                    setFormData({
                      ...formData,
                      company_details: newContent,
                    })
                  }
                  onChange={(newContent) =>
                    setFormData({
                      ...formData,
                      company_details: newContent,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <h3 style={{ marginBottom: "10px", color: "#333" }}>
                  Other Details
                </h3>
                <JoditEditor
                  ref={editor}
                  value={formData.other_details}
                  tabIndex={1}
                  onBlur={(newContent) =>
                    setFormData({
                      ...formData,
                      other_details: newContent,
                    })
                  }
                  onChange={(newContent) =>
                    setFormData({
                      ...formData,
                      other_details: newContent,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Upload Image:
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  name="imgurl"
                  onChange={handleImageChange}
                  style={{ display: "block", marginTop: "10px" }}
                />
                {formData.comp_logo && (
                  <img
                    src={URL.createObjectURL(formData.comp_logo)}
                    alt="Uploaded"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      marginTop: "10px",
                    }}
                  />
                )}
              </Grid>
            </Grid>
            <DialogActions>
              <Button
                type="submit"
                disabled={load}
                variant="contained"
                sx={{
                  backgroundColor: "#E3B505",
                  color: "black",
                  ":hover": {
                    backgroundColor: "#d3a004",
                  },
                }}
              >
                {`${load ? "Loading...." : "Save"}`}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Company Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          <Typography variant="h6">Edit Company Data</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {editingCompany && (
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Company Name"
                    name="com_title"
                    value={editingCompany.com_title}
                    fullWidth
                    onChange={(e) =>
                      setEditingCompany({
                        ...editingCompany,
                        com_title: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="comp_category"
                      value={editingCompany.comp_category}
                      onChange={(e) =>
                        setEditingCompany({
                          ...editingCompany,
                          comp_category: e.target.value,
                        })
                      }
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>Select Category</em>
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="comp_description"
                    value={editingCompany.comp_description}
                    fullWidth
                    onChange={(e) =>
                      setEditingCompany({
                        ...editingCompany,
                        comp_description: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    name="comp_phone"
                    value={editingCompany.comp_phone}
                    fullWidth
                    onChange={(e) =>
                      setEditingCompany({
                        ...editingCompany,
                        comp_phone: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="comp_email"
                    value={editingCompany.comp_email}
                    fullWidth
                    onChange={(e) =>
                      setEditingCompany({
                        ...editingCompany,
                        comp_email: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Website"
                    name="comp_website"
                    value={editingCompany.comp_website}
                    fullWidth
                    onChange={(e) =>
                      setEditingCompany({
                        ...editingCompany,
                        comp_website: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Rating"
                    name="comp_rating"
                    value={editingCompany.comp_rating}
                    fullWidth
                    onChange={(e) =>
                      setEditingCompany({
                        ...editingCompany,
                        comp_rating: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <h3 style={{ marginBottom: "10px", color: "#333" }}>
                    Company Details
                  </h3>
                  <JoditEditor
                    ref={editor}
                    value={editingCompany ? editingCompany.company_details : formData.company_details}
                    tabIndex={1}
                    onBlur={(newContent) =>
                      editingCompany
                        ? setEditingCompany({
                            ...editingCompany,
                            company_details: newContent,
                          })
                        : setFormData({
                            ...formData,
                            company_details: newContent,
                          })
                    }
                    onChange={(newContent) =>
                      editingCompany
                        ? setEditingCompany({
                            ...editingCompany,
                            company_details: newContent,
                          })
                        : setFormData({
                            ...formData,
                            company_details: newContent,
                          })
                    }
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <h3 style={{ marginBottom: "10px", color: "#333" }}>
                    Other Details
                  </h3>
                  <JoditEditor
                    ref={editor}
                    value={editingCompany ? editingCompany.other_details : formData.other_details}
                    tabIndex={1}
                    onBlur={(newContent) =>
                      editingCompany
                        ? setEditingCompany({
                            ...editingCompany,
                            other_details: newContent,
                          })
                        : setFormData({
                            ...formData,
                            other_details: newContent,
                          })
                    }
                    onChange={(newContent) =>
                      editingCompany
                        ? setEditingCompany({
                            ...editingCompany,
                            other_details: newContent,
                          })
                        : setFormData({
                            ...formData,
                            other_details: newContent,
                          })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    Upload Image:
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    name="imgurl"
                    onChange={handleImageChange}
                    style={{ display: "block", marginTop: "10px" }}
                  />
                  {editingCompany.comp_logo && (
                    <img
                      src={
                        editingCompany.comp_logo instanceof File
                          ? URL.createObjectURL(editingCompany.comp_logo)
                          : `https://couponri.com/uploads/${editingCompany.comp_logo}`
                      }
                      alt="Uploaded"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </Grid>
              </Grid>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  disabled={loading}
                  sx={{
                    backgroundColor: "#E3B505",
                    color: "black",
                    ":hover": {
                      backgroundColor: "#d3a004",
                    },
                    mt: 2,
                    width: "100%",
                  }}
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
        <Alert severity="success">Company saved successfully!</Alert>
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
        <Alert severity="warning">Company successfully deleted!</Alert>
      </Snackbar>

      <Dialog
        open={deleteConfirmation.open}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <DialogTitle id="delete-confirmation-title">
          <Typography variant="h6">Confirm Deletion</Typography>
        </DialogTitle>
        <DialogContent>
          {deleteConfirmation.id && (
            <Typography variant="body1">
              Are you sure you want to delete the company with ID{" "}
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
    </Box>
  );
};

export default AddCompanies;
