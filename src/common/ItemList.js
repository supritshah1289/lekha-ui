import React from "react";
import { Grid } from "@mui/material";
import ItemCard from "./Card";

const ItemsList = ({ items, isDelete }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} isDelete={isDelete} />
      ))}
    </Grid>
  );
};

export default ItemsList;
