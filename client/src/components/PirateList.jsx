import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css"




const PirateList=(props)=>{
    const[pirateslist,setPiratesList]=useState([])
    const navigate= useNavigate()
    const [updated,setUpdated]= useState(false)
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(()=>{
        axios.get("http://localhost:8000/api/pirate",{withCredentials:true})
        .then((res)=>{
       
        const sortedPirates = res.data.slice(); 
        if (sortOrder === "asc") {
          sortedPirates.sort((a, b) => a.name.localeCompare(b.name)); 
        } else {
          sortedPirates.sort((a, b) => b.name.localeCompare(a.name)); 
        }
        setPiratesList(sortedPirates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updated, sortOrder]);

    const deletePirate=(id) =>{
        axios.delete(`http://localhost:8000/api/pirate/${id}`,{withCredentials:true})
        .then( res => {
         
            console.log(res.data);
            setUpdated(!updated)
        })
        .catch( (err )=>{
             console.log(err)

          });
    }
    return (
        <div className="pirate-list-container">
          <div className="header-list">
          <h1>Pirate Crew</h1>
          <button className="add" onClick={() => navigate(`/`)}>Add Pirate</button>
          </div>
          {pirateslist &&
            pirateslist.map((pirate, index) => {
              return (
                
                <div className="user-item" key={index}>
            < div className="emri"> 
                  <img className="user-image" src={pirate.image}  />

                  
                 <p>{pirate.name}</p>
                 {pirate.position === "captain" ? <p className="captain">{pirate.position}</p> : ""}
                
                  </div>
                  <div className="buttonat">
                  <button className="view-more" onClick={() => navigate(`/pirate/${pirate._id}`)}>View Profile</button>
                  <button className="delete-btn" onClick={() => deletePirate(pirate._id)}>Walk the Plank </button>
                </div>
                </div>
              );
            })}
        </div>
      );
}



export default PirateList;