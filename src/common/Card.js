import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid } from "@mui/material";
import Link from "@mui/material/Link";
import {
  useDeleteItemMutation,
  useUserEmailByIdMutation,
} from "../redux/services/apiSlice";
import { toast } from "react-toastify";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ItemCard = ({ item, isDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [itemUserEmail, setItemUserEmail] = useState("");
  const [deleteItem, { isLoading, isError }] = useDeleteItemMutation();
  const [getUserEmail, { isEmailLoading, isEmailError }] =
    useUserEmailByIdMutation();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      // Call the deleteItem mutation function with the item ID as an argument
      const response = await deleteItem(item.id);
      toast.success("Item deleted successfully:", response, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleGetUserByEmail = async () => {
    try {
      const response = await getUserEmail(item.userDetails.id);
      setItemUserEmail(response.data.email);
      console.log("User email: " + JSON.stringify(response));
    } catch (error) {
      console.log("User by id does not exist: ", error);
    }
  };

  let itemPostCreatedDate = moment(item.createdAt).format("MMMM Do YYYY");
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="user-image"
              src={item.userDetails.imageUrl}
            ></Avatar>
          }
          title={item.userDetails.name}
          subheader={itemPostCreatedDate}
        />
        <CardMedia
          component="img"
          image={
            item.uploads.length > 0
              ? `data:image/jpeg;base64,${item.uploads[0].image}`
              : ""
          }
          alt="test"
          sx={{
            objectFit: "cover",
            aspectRatio: "1",
            width: "100%",
          }}
        />
        <CardContent>
          <Typography variant="body2">{item.description}</Typography>
          <Typography component="div">
            <Box sx={{ fontWeight: "bold", m: 1 }}>${item.price}</Box>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <SendIcon onClick={handleGetUserByEmail} />
            <Link href={`mailto:${itemUserEmail}`}>{item.email}</Link>
          </IconButton>
          {isDelete ? (
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          ) : null}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that
              don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default ItemCard;

//TODO:
//1. Display delete button to only logged in users on Myitems page
