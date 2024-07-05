import React, { useState, useEffect } from 'react';
import '../../assets/styles/redemptionshop.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

{/* shop */}
      <div className='shop'>
        <h1>Shop:</h1>
        <Grid container spacing={2} justifyContent="center" className="products">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Paper 
                sx={{ 
                  padding: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  height: '100%',
                  boxShadow: 'none',  // Remove box shadow
                  border: 'none',  // Remove border
                  marginBottom: '10px',  // Adjust margin bottom as needed
                }}
                className="product-item"
              >
                <h2>{product.prodName}</h2>
                <Box
                  component="img"
                  src={`http://localhost:3001/eco/product-images/${product.prodimg}`}
                  alt={product.prodName}
                  sx={{ 
                    width: '250px', 
                    height: '250px',
                    maxWidth: '100%',
                    border: '5px solid #14772B',  // Adding border style
                    marginBottom: '10px'  // Adjust margin bottom as needed
                  }}
                />
                <p><b>{product.leaves}</b> Leaves</p>
                <Link to={`/redeemform/${product.id}`} state={{ product }} className='redeembutton'>Redeem</Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
