import React ,{ useEffect } from "react";
import "./styles/style.css"
import srcStartIcon from "./asset/star.png";

function OrderSummary({title="Empty" , price=0 , nights=0 , stars=4.5 , reviews=0 , serviceFee=0, src=""}){

    useEffect(()=>{},[])

    return (
        <div className="OrderSummaryComponent flex radius10">
            <div className="flex perH40 borderBottom2Gray radius2">
                <div className="flex fCenter perW40">
                    <img  className="radius10" width={110} src={src} alt="" />
                </div>
                <div className="perW60">
                    <h6 className="noMarginBottom">Apartment</h6>
                    <h2 className="noMarginTop">{title}</h2>

                    <div className="relative top25">
                        <img width={13} src={srcStartIcon} /> &nbsp; {stars}  ({reviews} reviews)
                    </div>
                </div>
            </div>
            <div className="perH40 borderBottom2Gray radius2">
                <h3>Price Details:</h3>
                <div className="flex spaceBtweeen marginBottom10px">
                    <span className="underline">{price}$ X {nights} nights </span>
                    <span>{price*nights}$</span>
                </div>
                <div className="flex spaceBtweeen">
                    <span className="underline">service fee</span>
                    <span>{serviceFee}$</span>
                </div>
            </div>
            <div className="perH20">
                <div className="flex spaceBtweeen marginTop10px">
                    <span className="underline bold">Total:</span>
                    <span>{serviceFee + (price*nights)}$</span>
                </div>
            </div>
           
        </div>
    );
}




export default OrderSummary;


    {/* OrderSummaryComponent  <br/>
    props title = {title}  <br/>
    props price = {price}$  <br/>
    props nights = {nights}  <br/>
    props stars = {stars}
    props reviews = {reviews}  <br/> */}