import {
  Box,
  CardBody,
  CardFooter,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { GoStopwatch } from "react-icons/go";
import { Recipe } from "../hooks/useRecipes";
import { normalizeImage } from "../services/normalizeImage";
import { colorPalette } from "../assets/StyleVariables";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useBackEndPrivate from "../hooks/useBackEndPrivate";
import { useToast } from "@chakra-ui/react";
import RecipeCardWrapper from "./Wrappers/RecipeCardWrapper";
import FavIcon from "./FavIcon";
import CardHeading from "./Wrappers/CardHeading";

function RecipeCard(recipe: Recipe) {
  const { id, image, imageType, readyInMinutes, sourceUrl, title } = recipe;
  const { auth, setAuth } = useAuth();
  const isAuth = Object.keys(auth).length !== 0;
  const [isFavourite, setFavourite] = useState(
    isAuth && auth.favouriteList.includes(id)
  );
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const backEndPrivate = useBackEndPrivate();
  const toast = useToast();

  useEffect(() => {
    if (isFavourite && !isAuth) {
      console.log("state set");
      setFavourite(false);
    }
  }, [isAuth]);

  const sendFavourite = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    backEndPrivate
      .post("/users", { favourite: id })
      .then((res) => {
        setFavourite(res.data.state);
        setAuth({
          ...auth,
          favouriteList: res.data.favouriteList,
        });
      })
      .catch((err) => {
        if (!err?.response) {
          toast({
            title: "Unable to connect to server.",
            description: "Please try again later.",
            status: "error",
            duration: 3000,
            variant: "subtle",
          });
          return;
        } else if (err.response.status === 403) {
          navigate("/login");
          console.log(err);
        } else {
          toast({
            title: "Server error.",
            description: "Server could not handle the request.",
            status: "error",
            duration: 3000,
            variant: "subtle",
          });
        }
      });
  };

  return (
    <RecipeCardWrapper>
      <Box
        onClick={() => (window.location.href = sourceUrl)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box overflow="hidden">
          {(hover || isFavourite) && (
            <FavIcon
              isFavourite={isFavourite}
              onClick={sendFavourite}
            ></FavIcon>
          )}

          <Image className="img" src={normalizeImage(image, imageType)} />
        </Box>

        <CardFooter paddingY="0" marginTop="1.25rem">
          {readyInMinutes != null && (
            <HStack color={colorPalette.accent} gap="0.2rem">
              <Icon boxSize="17px" as={GoStopwatch} />
              <Text fontSize="1rem" letterSpacing="-1px" margin="0">
                {readyInMinutes} mins
              </Text>
            </HStack>
          )}
        </CardFooter>

        <CardBody minH="100px">
          <CardHeading>{title}</CardHeading>
        </CardBody>
      </Box>
    </RecipeCardWrapper>
  );
}

export default RecipeCard;
