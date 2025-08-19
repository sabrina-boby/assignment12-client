import axios from "axios";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";
import AddBooks from "../pages/AddBooks";
import AllUsers from "../pages/AllUsers";
import AvailableBooks from "../pages/AvailableBooks";
import Dashboard from "../pages/Dashboard";
import DetailsPage from "../pages/DetailsPage";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyBooks from "../pages/MyBooks";
import Register from "../pages/Register";
import DonationRequests from "../pages/Blood-requests/DonationRequests";
import Blog from "../pages/Bloge/Blog";
import Reed_More from "../pages/Bloge/Reed_More";
import PrivateRoute from "./PrivateRoute";
import DonorSearch from "../pages/DonorSearch/DonorSearch";
import AddBloge from "../pages/Bloge/AddBloge";
import DonationRequestDetails from "../pages/Blood-requests/DonationRequestDetails";
import CreateDonation from "../pages/Blood-requests/CreateDonation";
import MyDonationRequests from "../pages/MyDonationRequests";
import ProfilePage from "../components/ProfilePage";
import AllBloodDonationRequest from "../pages/AllBloodDonationRequest";
import ContentManagementPage from "../pages/ContentManagementPage";
import FundingPage from "../pages/FundingPage";
import StripeWrapper from "../pages/StripeWrapper";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>
      },
      {
        path: "/reed_more/:id",
        element: <Reed_More />
      },
      {
        path: "/donation_Requests",
        element: <DonationRequests></DonationRequests>

      },
      {
        path: "/donation-requests/:id",
        element: <PrivateRoute><DonationRequestDetails /></PrivateRoute>
      }
      ,
      {
        path: "/donation_Requests",
        element: <DonationRequests></DonationRequests>
      },
      {
        path: "/donor_Search",
        element: <DonorSearch></DonorSearch>
      },

      {
        path: "/available-books",
        element: <PrivateRoute><AvailableBooks /></PrivateRoute>,
      },
      {
        path: "/give_funding",
        element: <StripeWrapper></StripeWrapper>,
      },
      {
        path: "/details/:bookId",
        element: <DetailsPage />,
        loader: async ({ params }) => {
          const { data } = await axios.get(
            `https://project-server1.vercel.app/details/${params.bookId}`
          );
          return data;
        },
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
          {
            index: true,
            element: <PrivateRoute><Dashboard /></PrivateRoute>,
          },
          {
            path: "/dashboard/MyDonationRequests",
            element: <MyDonationRequests></MyDonationRequests>,
          }, {
            path: "/dashboard/DonationRequests",
            element: <DonationRequests></DonationRequests>,
          },
          {
            path: "/dashboard/ContentManagementPage",
            element: <ContentManagementPage></ContentManagementPage>,
          },
          {
            path: "/dashboard/content-management/add-blog",
            element: <AddBloge></AddBloge>
          },
          {
            path: "/dashboard/content-management",
            element: <ContentManagementPage></ContentManagementPage>
          },
          {
            path: "/dashboard/create-donation-request",
            element: <CreateDonation></CreateDonation>

          },
          {
            path: "/dashboard/funding-money",
            element: <PrivateRoute><FundingPage/></PrivateRoute>

          },
          {
            path: "/dashboard/profile",
            element: (
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/AllDonationRequests",
            element: <AllBloodDonationRequest></AllBloodDonationRequest>,
          },
          {
            path: "/dashboard/AllUsers",
            element: <AllUsers />,
          },
          {
            path: "my-books",
            element: <MyBooks />,
          },
          {
            path: "my-requests",
            element: <MyBooks />,
          },
        ],
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Register></Register>,
      },
      {

      },
    ],
  },
]);

export default mainRoutes;
