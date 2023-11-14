import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";
import PageNotFound from "./components/PageNotFound";
import FavouriteList from "./components/FavouriteList";
import RequireAuth from "./components/RequireAuth";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route element={<RequireAuth />}>
          <Route path="/favourites" element={<FavouriteList />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;
