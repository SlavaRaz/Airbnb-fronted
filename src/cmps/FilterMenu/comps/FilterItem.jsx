// import "bootstrap-icons/font/bootstrap-icons.css";

// export default function FilterItem(props){

//     return(
//       <div className="FilterItemComponnet">
//           <i className={props.src}></i>
//           <span>{props.title}</span>
//       </div>
//     )
//   }

// import "bootstrap-icons/font/bootstrap-icons.css";

export default function FilterItem(props) {

  function onclickHandler(e){
    props.setFilters(props.title );
  }

  return (
    <div className="FilterItemComponnet" onClick={onclickHandler}>
      <img 
        src={props.src} 
        alt={props.title} 
        style={{ width: "25px", height: "25px", objectFit: "cover" }} 
      />
      <span>{props.title}</span>
    </div>
  );
}

 