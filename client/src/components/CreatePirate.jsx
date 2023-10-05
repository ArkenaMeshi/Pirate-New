import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreatePirate=(props)=>{
    const [name,setName]=useState("");
    const [image,setImage]=useState("");
    const [treasure,setTreasure]=useState("");
    const [phrase,setPhrase]=useState("");
    const [position,setPosition]=useState("");
    const [pegleg,setPegleg]=useState(true);
    const [eyepatch,setEyepatch]=useState(true);
    const [hookhand,setHookhand]=useState(true);
    const navigate = useNavigate();
    const[val,setValidation]=useState({});


    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios
        .post("http://localhost:8000/api/pirate",{
        name:name,
        image:image,
        treasure:treasure,
        phrase:phrase,
        position:position,
        pegleg:pegleg,
        eyepatch:eyepatch,
        hookhand:hookhand,
    })
    .then((res) => {
        console.log(res);
        console.log(res.data);
        // setValidation({})
        navigate("/pirate")
      })
      .catch(err=>{ console.log(err);err.response.data.errors? setValidation(err.response.data.errors): console.log(err)})
    }
    return (
        <form onSubmit={onSubmitHandler}>
         <div className="header-list">
          <h1> Add Pirates </h1>
          <button className="add" onClick={() => navigate(`/pirate`)}> Crew Board </button>
          </div>
          <div className="row">
            <div className="column">
          <p>
          {
            val.name ? <p>{val.name.message}</p> : ""
         }
            <label id="label">Name :</label>
            <br />
           
            <input className="my-input"
              type="text"
              id="text"
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p>
          {
            val.image ? <p>{val.image.message}</p> : ""
         }
            <label id="label">Image Url :</label>
            <br />
           
            <input
             className="my-input"
              type="text"
              id="text"
              onChange={(e) => setImage(e.target.value)}
            />
          </p>
          <p>
          {
            val.treasure ? <p>{val.treasure.message}</p> : ""
         }
            <label id="label"> Treasure Chests :</label>
            <br />
           
            <input  className="treasure-input"
              type="number"
              id="text"
              onChange={(e) => setTreasure(e.target.value)}
            />
          </p>
          <p>
          {
            val.phrase ? <p>{val.phrase.message}</p> : ""
         }
            <label id="label">Pirate Catch Phrase :</label>
            <br />
            
            <input  className="my-input"
              type="text"
              id="text"
              onChange={(e) => setPhrase(e.target.value)}
            />
          </p>
          </div>
          <div className="column">
        
          <p>
          { val.position? <p>{val.position.message}</p> : "" }
            <label id="label">Crew Position:</label>
            <br/>
           
            <select 
              style={{ width: "150px", height: "30px", marginRight: "8px" }}
              name=""
              id=""
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value={""}>Select</option>
                <option value="captain">Captain</option>
              <option value="first mate">First Mate</option>
              <option value="quarter master"> Quarter Master</option>
              <option value="boatswain">Boatswain</option>
              <option value="powder monkey">Powder Monkey</option>
    
            </select>
          </p>
    
          <div className="checkbox-list">
            <label >Peg Leg</label>
            <input className="checkbox"
              type="checkbox"
              defaultChecked={pegleg}
              
              onChange={(e) =>setPegleg(e.target.checked)}
            />
          <br/>
         
            <label > Eye Patch </label>
            <input className="checkbox"
              type="checkbox"
              defaultChecked={eyepatch}
              
              onChange={(e) =>setEyepatch(e.target.checked)}
            />
         
          <br/>
          
            <label > Hook Hand </label>
            <input className="checkbox"
              type="checkbox"
              defaultChecked={hookhand}
              onChange={(e) =>setHookhand(e.target.checked)}
            />
          </div>
            <button  className="add-button" type="submit">Add Pirate </button>
            </div>
            </div>
        </form>
      );
    };
    export default CreatePirate;
    