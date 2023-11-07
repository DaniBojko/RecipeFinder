import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";
import PageNotFound from "./components/PageNotFound";
import FavouriteList from "./components/FavouriteList";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LogInForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
