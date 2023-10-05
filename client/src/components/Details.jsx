import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Details= (props) => {
  const [pirate, setPirate] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();
 

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pirate/${id}`)
      .then((res) => {
        console.log(res);
        setPirate(res.data);



      })
      .catch((err) => console.log(err));
  }, []);
  const handleClick= (changes)=>{
    console.log(pirate)
    axios.patch('http://localhost:8000/api/pirate/' + id, {
       
        ...pirate,...changes
            
    })
        .then(res => {
            console.log(res);
           
            
        })
        .catch(err => console.log(err))

}

  return (
    <div className="te-dhenat">
     
      <h1>{pirate.name}</h1>
      <div className="row-details">
        <div className="col-1">
        <img src={pirate.image} alt="imazhi"  className="detail-imzh"/>
        <div className="treasure">
            <p> "{pirate.phrase}" </p>
            </div>

        </div>
        <div className="col-2">
            
       
            <h2>About</h2>
            <p>Position : {pirate.position}</p>
           
            <p>Treasures: {pirate.treasure}</p>
           
            <div className="button-check">
            <p>Pegleg :</p>
            <p>{JSON.stringify(pirate.pegleg)} </p>
        
            <button className={`pegleg ${pirate.pegleg ? "button-yes" : "button-no"}`}
            onClick={(e) => {
              setPirate({ ...pirate, pegleg: !pirate.pegleg });
              handleClick({ pegleg: !pirate.pegleg });
            }}
            > {pirate.pegleg ? "No" : "Yes"}</button>
            </div>
            <div className="button-check">
            <p>Eye Patch:  </p>
            <p>{JSON.stringify(pirate.eyepatch)}</p>
            <button className={`pegleg ${pirate.eyepatch ? "button-yes" : "button-no"}`} onClick={(e) => {
                setPirate({ ...pirate, eyepatch: !pirate.eyepatch });
                handleClick({ eyepatch: !pirate.eyepatch });
              }} > {pirate.eyepatch ? "No" : "Yes"} </button><br/>
            </div>

            <div className="button-check">
            <p> Hook Hand :  </p>
           <p>{JSON.stringify(pirate.hookhand)}</p>
            <button className={`pegleg ${pirate.hookhand ? "button-yes" : "button-no"}`} onClick={(e) => {
                setPirate({ ...pirate, hookhand: !pirate.hookhand });
                handleClick({ hookhand: !pirate.hookhand });
              }}> {pirate.hookhand ? "No" : "Yes"} </button>
            </div>

          
          



        </div>
      </div>
      
    
    </div>
  );
};
export default Details;
