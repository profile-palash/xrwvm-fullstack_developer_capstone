import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png"
import neutral_icon from "../assets/neutral.png"
import negative_icon from "../assets/negative.png"
import review_icon from "../assets/reviewbutton.png"
import Header from '../Header/Header';

const Dealer = () => {


  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>)


  //Original version
  let curr_url= window.location.href;  //App main URL
  let root_url = curr_url.substring(0,curr_url.indexOf("dealer")); //Extract before "dealer"  generated in the main URL.
  console.log("Root URL", root_url)
//   let params = useParams();
//   let id =params.id;
//   let dealer_url = root_url+`djangoapp/dealer/${id}`;
//   let reviews_url = root_url+`djangoapp/reviews/dealer/${id}`;
//   let post_review = root_url+`postreview/${id}`;
  
//   const get_dealer = async ()=>{
//     const res = await fetch(dealer_url, {
//       method: "GET"
//     });
//     const retobj = await res.json();
    
//     if(retobj.status === 200) {
//       let dealerobjs = Array.from(retobj.dealer)
//       setDealer(dealerobjs[0])
//     }
//   }

//   const get_reviews = async ()=>{
//     const res = await fetch(reviews_url, {
//       method: "GET"
//     });
//     const retobj = await res.json();
    
//     if(retobj.status === 200) {
//       if(retobj.reviews.length > 0){
//         setReviews(retobj.reviews)
//       } else {
//         setUnreviewed(true);
//       }
//     }
//   }
// End Origial version.


// My version:

// let curr_url2 = "https://palashpol71-3030.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai"  //**Before
  
  let params = useParams();
  let id =params.id;
 
//   let dealer_url = curr_url2+`/fetchDealer/${id}`;   //**Before, my version.
  let dealer_url = root_url+`dealerdetail/${id}`; //Fetch an object called "dealer".
  console.log("myDealer_Detail", dealer_url)

//   let reviews_url = curr_url2+`/fetchReviews/dealer/${id}`; //**Before, my version.
  let reviews_url = root_url+`reviews/dealer/${id}`; //Fetch an object called "dealer".

  let post_review = root_url +`postreview/${id}`;
  
  
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });

    const retobj = await res.json();

    console.log("Fetching the array from object called dealer", retobj.dealer) //*******debugging. See in browser tools
    
    if(res.status === 200) {
      console.log("Fetching name", retobj.dealer[0].full_name) //*******debugging   
      let dealerobjs = Array.from(retobj.dealer)   //Copyin from original array
      setDealer(dealerobjs[0])
    }
  }

  const get_reviews = async ()=>{
    const res = await fetch(reviews_url, {
      method: "GET"
    });
    const retobj = await res.json();

    console.log("Fetching object called reviews", retobj) //*******debugging
    
    if(res.status === 200) {
        console.log("Yes review st 200")
      if(retobj.reviews[0].review.length > 0){
        console.log("Yes review > 0") //******Debugging
        setReviews(retobj.reviews)
      } else {
        setUnreviewed(true);
      }
    }
  }


  //

  const senti_icon = (sentiment)=>{
    let icon = sentiment === "positive"?positive_icon:sentiment==="negative"?negative_icon:neutral_icon;
    return icon;
  }

  useEffect(() => {
    get_dealer();
    get_reviews();
    if(sessionStorage.getItem("username")) {
      setPostReview(<a href={post_review}><img src={review_icon} style={{width:'10%',marginLeft:'10px',marginTop:'10px'}} alt='Post Review'/></a>)

      
    }
  },[]);  


return(
  <div style={{margin:"20px"}}>
      <Header/>
      <div style={{marginTop:"10px"}}>
      <h1 style={{color:"grey"}}>{dealer.full_name}{postReview}</h1>
      <h4  style={{color:"grey"}}>{dealer['city']},{dealer['address']}, Zip - {dealer['zip']}, {dealer['state']} </h4>
      </div>
      <div class="reviews_panel">
      {reviews.length === 0 && unreviewed === false ? (  //***DEBUG THIS
        <text>Loading Reviews....</text>
      ):  unreviewed === true? <div>No reviews yet! </div> :
      reviews.map(review => (
        <div className='review_panel'>
          <img src={senti_icon(review.sentiment)} className="emotion_icon" alt='Sentiment'/>
          <div className='review'>{review.review}</div>
          <div className="reviewer">{review.name} {review.car_make} {review.car_model} {review.car_year}</div>
        </div>
      ))}
    </div>  
  </div>
)
}

export default Dealer
