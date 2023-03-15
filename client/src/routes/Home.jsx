import React from "react";
import OrderList from "../components/OrderList";
import HomeUserLists from "../components/HomeUsersLists";
function Home() {
  return (
    <div>
      <h1 className="text-center display-3">
        <u>All Active Components in the Concrete Trucking Database</u>
      </h1>
      <HomeUserLists />
      <OrderList />
    </div>
  );
}

export default Home;
