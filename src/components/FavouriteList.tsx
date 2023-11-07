import useAuth from "../hooks/useAuth";

const { auth } = useAuth();
console.log(auth);

const FavouriteList = () => {
  return <div>FavouriteList</div>;
};

export default FavouriteList;
