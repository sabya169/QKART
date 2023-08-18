import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

//-----------------------------------cart item-----------------------------------------------
/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */

// from demo  cart data = [ {"productId":"BW0jAAeDJmlZCF8i","qty":1}, {"productId":"x4sLtEcMpzabRyfx","qty":1} ]

// and product data = [12 objects that got from fetching the performAPICall() in product.js]

// export const generateCartItemsFrom = (cartData, productsData) => {
//   let cartItemArray = [];
//   console.log("test", cartData, productsData);
//   // for (let i = 0; i < cartData.length; i++) {
//   //   let entry = productsData.filter(function (a) {
//   //     if (a._id === cartData[i].productId) {
//   //       a.qty = cartData[i].qty;
//   //       cartItemArray.push(a);
//   //     }
//   //   });
//   // }
//   for (let i = 0; i < cartData.length; i++) {
//     for (let j = 0; j < productsData.length; j++) {
//       if (productsData[j]._id === cartData[i].productId)
//         cartItemArray.push(productsData[j]);
//         // cartItemArray[i].qty = cartData[i].qty;
//     }
//     cartItemArray[i].qty = cartData[i].qty;
//   }

//   console.log(cartItemArray, "cartitem array");
//   return cartItemArray;
// };

// export const generateCartItemsFrom = (cartData, productsData) => {
//   let arr=[]
//   cartData?.forEach((cartItem) => {
//     let product = productsData.find((product)=> product._id === cartItem.productId)
//     if(product) {
//     product["qty"] = cartItem.qty
//     }
//     arr.push(product)
//   })
//   console.log("arr in gene",arr)
//   return arr
// };

export const generateCartItemsFrom = (cartData, productsData) => {
  if (!cartData) {
    return;
  }
  const nextCart = cartData.map((item) => ({
    ...item,
    ...productsData.find((product) => item.productId === product._id),
  }));
  console.log(nextCart);
  return nextCart;
};

//-------------{ Array.<CartItem> } items--- WE GOT FROM generateCartItemsFrom()-----------
/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */

// THIS IS CALLED DEFAULT PARAMETER, IF ITEMS DOES NOT PROVIDED BY AN VALUE, IT WILL TAKE EMPTY ARRAY BY DEFAULT
export const getTotalCartValue = (items = []) => {
  console.log("gettotal value", items);
  let num = 0;
  for (let i = 0; i < items.length; i++) {
    let single_item_price = items[i].cost * items[i].qty;
    num = num + single_item_price;
  }
  console.log("$" + num);
  return num;
};

// let arr=[{cost:200,qty:2},{cost:300,qty:1}]
// getTotalCartValue(arr)

//---------------------------------------------------------------------------

// TODO: CRIO_TASK_MODULE_CHECKOUT - Implement function to return total cart quantity
/**
 * Return the sum of quantities of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products in cart
 *
 * @returns { Number }
 *    Total quantity of products added to the cart
 *
 */
export const getTotalItems = (items = []) => {
  let no_of_items=0;
  items.forEach((item) => {
    no_of_items += parseInt(item.qty)
  })
  return no_of_items
};

//----------------------------------------------------------------------------

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 *
 */

const ItemQuantity = ({ value, handleAdd, handleDelete, isReadOnly }) => {
  if (!isReadOnly) {
    return (
      <Stack direction="row" alignItems="center">
        <IconButton size="small" color="primary" onClick={handleDelete}>
          <RemoveOutlined />
        </IconButton>
        <Box padding="0.5rem" data-testid="item-qty">
          {value}
        </Box>
        <IconButton size="small" color="primary" onClick={handleAdd}>
          <AddOutlined />
        </IconButton>
      </Stack>
    );
  } else {
    return (
      
        <Box padding="0.5rem" data-testid="item-qty">
         Qty: {value.qty}
        </Box>
      
    );
  }
};

/**
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 *
 */
const Cart = ({ products, items = [], handleQuantity, isReadOnly }) => {
  console.log("test 2--", items, isReadOnly);
  const history = useHistory();

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}

        {items.map((item) => {
          console.log(item);
          return (
            <Box display="flex" alignItems="flex-start" padding="1rem">
              <Box className="image-container">
                <img
                  src={item.image}
                  alt={item.name}
                  width="100%"
                  height="100%"
                />
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                padding="1rem"
              >
                <div>{item.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ItemQuantity
                    value={item.qty}
                    handleAdd={async () => {
                      await handleQuantity(
                        window.localStorage.getItem("token"),
                        items,
                        products,
                        item._id,
                        item.qty + 1
                      );
                    }}
                    handleDelete={async () => {
                      await handleQuantity(
                        window.localStorage.getItem("token"),
                        items,
                        products,
                        item._id,
                        item.qty + -1
                      );
                    }}
                    isReadOnly={isReadOnly ? true : false}
                  />

                  <Box>${item.cost}</Box>
                </Box>
              </Box>
            </Box>
          );
        })}

        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(generateCartItemsFrom(items, products))}
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          {isReadOnly ? (
            <></>
          ) : (
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={() => history.push("/checkout")}
            >
              Checkout
            </Button>
          )}
        </Box>
      </Box>

      <Box className="cart">
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            color="#3C3C3C"
            fontSize={"18px"}
            fontWeight={"bold"}
            alignSelf="center"
          >
            Order details
          </Box>
        </Box>
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" fontSize={"18px"} alignSelf="center">
            Products
          </Box>
          <Box color="#3C3C3C" fontSize={"18px"} alignSelf="center">
            {getTotalItems(items)}
          </Box>
        </Box>
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" fontSize={"18px"} alignSelf="center">
            Subtotal
          </Box>
          <Box color="#3C3C3C" fontSize={"18px"} alignSelf="center">
            {getTotalCartValue(items)}
          </Box>
        </Box>
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" fontSize={"18px"} alignSelf="center">
            Shipping Charges
          </Box>
          <Box color="#3C3C3C" fontSize={"18px"} alignSelf="center">
            0
          </Box>
        </Box>
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            color="#3C3C3C"
            fontSize={"22px"}
            fontWeight="bold"
            alignSelf="center"
          >
            Total
          </Box>
          <Box color="#3C3C3C" fontSize={"18px"} alignSelf="center">
            {getTotalCartValue(items)}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
