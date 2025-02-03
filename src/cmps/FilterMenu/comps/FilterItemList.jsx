import React, {useState}  from "react"
import FilterItem from "./FilterItem"
export default function FilterItemList(props){

    let [data, setData] = useState([
      {id:"1" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Cabins.png" , text:"Cabins"},
      {id:"2" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Amazing-views.png" , text:"Amazing views"},
      {id:"3" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Amazing-views.png" , text:"Beach"},
      {id:"4" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Islands.png" , text:"Islands"},
      {id:"5" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Lakefront.png" , text:"Lakefront"},
      {id:"6" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Beachfront.png" , text:"Beachfront"},
      {id:"7" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Design.png" , text:"Design"},
      {id:"8" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/National-parks.png" , text:"National parks"},
      {id:"9" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Campers.png" , text:"Campers"},
      {id:"10" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Surfing.png" , text:"Campers"},
      {id:"11" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Amazing-views.png" , text:"Amazing views"},
      {id:"12" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Beach.png" , text:"Beach"},
      {id:"13" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Castles.png" , text:"Castles"},
      {id:"14" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Islands.png" , text:"Islands"},
      {id:"15" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Caves.png" , text:"Caves"},
      {id:"16" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/omg.png" , text:"OMG!"},
      {id:"17" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Lakefront.png" , text:"Lakefront"},
      {id:"18" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Beachfront.png" , text:"Beachfront"},
      {id:"19" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Design.png" , text:"Design"},
      {id:"20" , imgSrc:"https://res.cloudinary.com/dgzyxjapv/image/upload/v1669918322/stayby/labels/Cabins.png" , text:"Cabins"},
    ])

    

    let [min , setMin] = useState(0);
    let [maximum, setMaximum] = useState(12); 
    
    function onclickbtn1() {
      if (min > 0) {
        setMin(min - 1);
        setMaximum(maximum - 1);
      }
    }
    
    function onclickbtn2() {
      if (min < data.length - 13) { 
        setMin(min + 1);
        setMaximum(maximum + 1);
      }
    }
    
    return(
      <>
        <button className="btn1" onClick={onclickbtn1}> {'<'} </button>
        <div className="FilterItemListComponent" >
            {
              data.map(
                (item , index)=>{
                      if(index>=min && index <= maximum)
                        return <FilterItem setFilters={props.setFilters} key={item.id} src={item.imgSrc} title={item.text} />
                }
              )
            }
        </div>
        <button className="btn2" onClick={onclickbtn2}> {'>'} </button>
      </>
    )
}

