import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Header></Header>
      <main className=" pt-[69px] min-h-screen mx-auto ">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
