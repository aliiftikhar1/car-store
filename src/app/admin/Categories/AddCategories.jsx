"use client";
import React, { useState, useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "axios";

export const getApiBaseUrl = () => {
  return process.env.BASE_URL;
};

const AddCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
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
      console.error("Invalid Category for deletion");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/category/${deleteConfirmation.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setDeleteSuccessSnackbar(true);
        setTimeout(() => {
          setDeleteSuccessSnackbar(false);
        }, 5000);

        const updatedCategories = categories.filter(
          (category) => category.id !== deleteConfirmation.id
        );
        setCategories(updatedCategories);
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error.message);
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
      category_name: "",
      category_description: "",
      category_status: "",
      category_image: "",
    });
  };

  const [formData, setFormData] = useState({
    id: "",
    category_name: "",
    category_description: "",
    category_status: "",
    category_image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (editingCategory) {
      setEditingCategory({
        ...editingCategory,
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
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setLoading(true); // Show loading overlay
  
    if (!formData.category_name || !formData.category_image || !formData.category_status) {
      setSnackbarSubmit(true);
      setTimeout(() => {
        setSnackbarSubmit(false);
      }, 5000);
      setLoad(false);
      setLoading(false); // Hide loading overlay
      return;
    }
  
    try {
      console.log("Converting image to Base64...");
      const imageBase64 = await convertToBase64(formData.category_image);
      console.log("Image converted to Base64:", imageBase64);
  
      console.log("Uploading image...");
      const uploadedImageUrl = await uploadImageToExternalAPI(imageBase64);
      console.log("Image uploaded. URL:", uploadedImageUrl);
  
      const categoryToSubmit = {
        category_name: formData.category_name,
        category_description: formData.category_description,
        category_status: formData.category_status,
        category_image: uploadedImageUrl,
      };
  
      console.log("Submitting category:", categoryToSubmit);
      await axios.post(`http://localhost:3000/api/category`, categoryToSubmit);
      toast.success("Category has been added successfully!");
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
      let uploadedImageUrl = editingCategory.category_image;
  
      // Check if the image is a File object (newly uploaded), otherwise, use the existing URL.
      if (editingCategory.category_image instanceof File) {
        const imageBase64 = await convertToBase64(editingCategory.category_image);
        uploadedImageUrl = await uploadImageToExternalAPI(imageBase64);
      }
  
      const categoryToUpdate = {
        category_name: editingCategory.category_name,
        category_description: editingCategory.category_description,
        category_status: editingCategory.category_status,
        category_image: uploadedImageUrl,
      };
  
      await axios.put(
        `/api/category/${editingCategory.id}`,
        categoryToUpdate
      );
  
      toast.success("Category has been updated successfully!");
      setLoad(false);
      setLoading(false); // Hide loading overlay
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error occurred while updating the data:", error);
      toast.error("Failed to update the category");
      setLoad(false);
      setLoading(false); // Hide loading overlay
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
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingCategory({
        ...editingCategory,
        category_image: file, // Ensure this is a File object
      });
    }
  };

  const handleOpen = (category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/category`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError("Error fetching categories: " + error.message);
      }
    };
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Category Name",
        accessor: "category_name",
      },
      {
        Header: "Description",
        accessor: "category_description",
      },
      {
        Header: "Status",
        accessor: "category_status",
      },
      {
        Header: "Image",
        accessor: "category_image",
        Cell: ({ value }) => {
          return (
            <img
              src={`https://couponri.com/uploads/${value.trim()}`}
              alt="Category Image"
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
          );
        },
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
    []
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
      data: categories,
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
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: categories.length }]}
        colSpan={5}
        count={categories.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        showLastButton
        showFirstButton
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      {/* Add Category Dialog */}
      <Dialog
        open={model}
        onClose={modelClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          <Typography variant="h6">New Category</Typography>
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
                  label="Category Name"
                  type="text"
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Category Description"
                  type="text"
                  name="category_description"
                  value={formData.category_description}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="category_status"
                    value={formData.category_status}
                    onChange={handleInputChange}
                    label="Status"
                  >
                    <MenuItem value="Top">Top</MenuItem>
                    <MenuItem value="Best Selling">Best Selling</MenuItem>
                    <MenuItem value="Normal">Normal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Upload Image:
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  name="imgurl"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category_image: e.target.files[0], // Store File object
                    })
                  }
                  style={{ display: "block", marginTop: "10px" }}
                />
                {formData.category_image && (
                  <img
                    src={URL.createObjectURL(formData.category_image)}
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

      {/* Edit Category Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          <Typography variant="h6">Edit Category Data</Typography>
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
          {editingCategory && (
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Category Name"
                    name="category_name"
                    value={editingCategory.category_name}
                    fullWidth
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        category_name: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Category Description"
                    name="category_description"
                    value={editingCategory.category_description}
                    fullWidth
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        category_description: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="category_status"
                      value={editingCategory.category_status}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          category_status: e.target.value,
                        })
                      }
                      label="Status"
                    >
                      <MenuItem value="Top">Top</MenuItem>
                      <MenuItem value="Best Selling">Best Selling</MenuItem>
                      <MenuItem value="Normal">Normal</MenuItem>
                    </Select>
                  </FormControl>
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
                  {editingCategory.category_image && (
                    <img
                      src={
                        editingCategory.category_image instanceof File
                          ? URL.createObjectURL(editingCategory.category_image)
                          : `https://m3xtrader.com/uploads/${editingCategory.category_image}`
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
        <Alert severity="success">Category saved successfully!</Alert>
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
        <Alert severity="warning">Category successfully deleted!</Alert>
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
              Are you sure you want to delete the category with ID{" "}
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

export default AddCategories;
