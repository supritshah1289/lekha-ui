import React from "react";
import { Suspense } from "react";
import "./Home.css";
import { useGetItemsQuery } from "../redux/services/apiSlice";
import ItemsList from "../common/ItemList";
import { Container, Grid } from "@mui/material";

function Home() {
  const { data, isError, isLoading } = useGetItemsQuery();

  if (isError) return <div> An error has occured! </div>;

  if (isLoading) return <div>Loading....</div>;

  return (
    <Container>
      <Suspense>
        {data ? <ItemsList items={data} /> : "No Data Available"}
      </Suspense>
    </Container>
  );
}

export default Home;
