import FilterButton from "./comps/FilterButton";
import FilterItemList from "./comps/FilterItemList";
import "./styles/style.css";



export default function FilterMenu(props){

    return(
        <div className="FilterMenuComponent">
          
        
             <FilterItemList setFilters={props.setFilters}/> 
            
   
        </div>
    )
  
}



