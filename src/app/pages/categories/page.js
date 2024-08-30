'use client';
import React, { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import CustomerRootLayout from "@/app/user/layout";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
      const result = await response.json();
      console.log("Commpany: ",result);
        setCategories(result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    const category = parseInt(categoryId);
    router.push(`/pages/onecategory/${category}`);
  };

  return (
    <CustomerRootLayout>
      <div className="bg-white w-full h-screen ">
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" fontWeight="bold"  gutterBottom align="center" padding="5px">
            Choose a Category for Promo Code
          </Typography>
          <Typography variant="h6" gutterBottom align="center" padding="5px">
            50% off (Sitewide) Aug 2024
          </Typography>
          <Grid container spacing={3} className="px-32">
            {categories.map((category, key) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                <Card
                  onClick={() => handleCategoryClick(category.id)}
                  sx={{
                    cursor: "pointer",
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding:'5px',
                    justifyContent: 'space-between',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
                    borderRadius: '20px',  // More rounded corners
                    border: '2px solid transparent', // Initial border
                    margin: '5px', // Margin around the card
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                      borderColor: 'blue', // blue-900 on hover
                    },
                  }}
                >
                  <Box sx={{ height: 140, overflow: 'hidden', borderRadius: '18px 18px 0 0' }}>
                    <CardMedia
                      component="img"
                      alt={category.category_name}
                      image={`https://couponri.com/uploads/${category.category_image}`}
                      title={category.category_name}
                      sx={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover', // Ensures the image covers the entire container without distortion
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" align="center" sx={{ fontWeight: 'bold' }}>
                      {category.category_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </CustomerRootLayout>
  );
};

export default CategoryPage;
