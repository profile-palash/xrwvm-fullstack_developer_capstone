
import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  // let [state, setState] = useState("")
  let [states, setStates] = useState([])

 
  const dealer_url ="https://albertocarb1-3030.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/fetchDealers";
//   const dealer_url = "https://albertocarb1-3030.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/fetchDealers";
                  
  
  const dealer_url_by_state = "https://albertocarb1-3030.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/fetchDealers";
//   const dealer_url_by_state =  "https://albertocarb1-3030.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/fetchDealers";
 
  const filterDealers = async (state) => {
    console.log('mycalling');  //************ my test - debugging- Vrifying if "filterDealers" is being invoked by "Onchange" functiion.
    
    var dealer_by_state = dealer_url_by_state+"/"+state;
    const res = await fetch(dealer_by_state, {
      method: "GET"
    });
    console.log('filter status', res.status)
    const retobj = await res.json();
        if('filter', res.status === 200) {
      let state_dealers = Array.from(retobj)
      setDealersList(state_dealers)
    }
  }

  const get_dealers = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    console.log('status', res.status);  //************ my test - debugging

    if(res.status === 200) {
       
      
    //Immutable Data Structures: In React, it's a good practice to treat state as immutable. Creating a new array ensures that state updates do not mutate existing state directly, which helps in maintaining predictable component behavior and improving performance.
      let all_dealers = Array.from(retobj)  //Take a shallow copy of the original Dealers array to ensure that any changes to the new array do not affect the original array.
      let states = [];
      all_dealers.forEach((dealer)=>{
        states.push(dealer.state)
      });

      setStates(Array.from(new Set(states)))  //To update the states list.
      setDealersList(all_dealers)  //***************changed for mine
    } else {
        console.error("Failed to fetch dealers");
    }
  }
  useEffect(() => {
    get_dealers();
  },[]);  


let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;



return(
  <div>
      <Header/>

     <table className='table'>
      <tr>
      <th>ID.</th>
      <th>Dealer Name</th>
      <th>City</th>
      <th>Address</th>
      <th>Zip</th>
      <th>
      <select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
      <option value="" selected disabled hidden>State</option>
      <option value="All">All States</option>
      {states.map(state => (
          <option value={state}>{state}</option>
      ))}
      </select>        

      </th>
      {isLoggedIn ? (
          <th>Review Dealer</th>
         ):<></>
      }
      </tr>
     {dealersList.map(dealer => (
        <tr>
          <td>{dealer['id']}</td>
          <td><a href={'/dealer/'+dealer['id']}>{dealer['full_name']}</a></td>
          <td>{dealer['city']}</td>
          <td>{dealer['address']}</td>
          <td>{dealer['zip']}</td>
          <td>{dealer['state']}</td>
          {isLoggedIn ? (
            <td><a href={`/postreview/${dealer['id']}`}><img src={review_icon} className="review_icon" alt="Post Review"/></a></td>
           ):<></>
          }
        </tr>
      ))}
     </table>
  </div>
)
}

export default Dealers
