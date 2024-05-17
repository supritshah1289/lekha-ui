import React from "react";
import { useGetCurrentUserItemsQuery } from "../../redux/services/apiSlice";
import ItemsList from "../../common/ItemList";

function MyItems(props) {
  const { currentUser } = props;
  const { data, isError, isLoading } = useGetCurrentUserItemsQuery(
    currentUser.id
  );

  if (isError) return <div> An error has occured! </div>;

  if (isLoading) return <div>Loading....</div>;

  return (
    <div>
      {data ? <ItemsList items={data} isDelete={true} /> : "No Data Available"}
    </div>
  );
}

export default MyItems;
