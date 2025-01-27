import { useEffect, useState } from "react";
import FilterMenu from "./components/FilterMenu/FilterMenu"
import OrderSummary from "./components/OrderSummary/OrderSummary";

function App() {


  return (
    <div className="AppComponent">
        {/* <FilterMenu />  */}
        <OrderSummary  
          src =  "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg"
          title = "Titel hotel"
          stars =  {3/4}
          price = {50}
          nights = {3}
          reviews ={10}
          serviceFee ={25}
        />

    </div>
  );
}
export default App;



