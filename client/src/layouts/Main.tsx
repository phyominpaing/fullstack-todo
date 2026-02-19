import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Main = () => {
  return (
    <section className="max-w-4xl mx-auto">
      <Header />
      <Outlet />
    </section>
  );
};

export default Main;
