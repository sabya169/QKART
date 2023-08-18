import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card" sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={product.category}
        height="220px"
        image={product.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2">
          <h2>${product.cost}</h2>
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleAddToCart}><AddShoppingCartOutlined />ADD TO CART</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
