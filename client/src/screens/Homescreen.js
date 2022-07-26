// import React,{ useEffect, useState } from 'react'
// import axios from "axios";
// function Homescreen(){
// const[rooms,setrooms]=useState([])
// //const[loading,setloading]=useState()
// //const[error,seterror]=useState()
//         useEffect(async()=>{
//             try{
//                 // setloading(true)
//                 const data=(await axios.get('/api/rooms/getallrooms')).data

//                 setrooms(data)
//                 // setloading(false)
//             }catch(error){
//                 // seterror(true)
//                 console.log(error)
//                 // setloading(false)
//             }
//         },[])
//         return()=>{
//             <div>
//                 <h1>there are {rooms.length}</h1>
//                 {/* {loading ? (<h1>loading...</h1>): error ?(<h1>Error</h1>) :(rooms.map(room=>{
//                     return <h1>{room.name}</h1>
//                 }))} */}
//             </div>
//         };

//     }

//     export default Homescreen;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import 'antd/dist/antd.css';
import Error from "../components/Error";
import moment from 'moment'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

function Homescreen() {
  const [loading, setLoading] = useState(false);
  const [rooms, setrooms] = useState([]);
  const [error, seterror] = useState();
  const[duplicaterooms,setduplicaterooms]=useState([])
  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()

  const [searchkey, setsearchkey] = useState('');

  const [type, settype] = useState('all');

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        setrooms(response.data);
        setduplicaterooms(response)
        setLoading(false);
      } catch (error) {
        seterror(true);
        setLoading(false);
      }
    };
    loadPost();
  }, []);
 
  function filterbysearch() {
    const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms);
  }

  function filterbyType(e) {

    settype(e);

    if (e !== 'all') {

      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
      setrooms(temprooms);
    }
    else {
      setrooms(duplicaterooms)
    }


  }
  function filterByDate(dates) {

    setfromdate(moment(dates[0]).format('DD-MM-YYYY'));
    settodate(moment(dates[1]).format('DD-MM-YYYY'))


  

    var temprooms=[];
    var availability=false;

    for( var room of duplicaterooms)
    {
         if(room.currentbookings.length>0)
        {

            for(const booking of room.currentbookings)
            {
              if(
                
                 ! moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(
                  booking.fromdate,booking.todate
                  )
              && 
              ! (moment(moment(dates[1].format('DD-MM-YYYY')).isBetween(
                booking.fromdate,
                booking.todate))
              
              ))
              {
                if(
                  moment(dates[0]).format('DD-MM-YYYY') !==booking.fromdate &&
                  moment(dates[0]).format('DD-MM-YYYY') !==booking.todate &&
                  moment(dates[1]).format('DD-MM-YYYY') !==booking.fromdate &&
                  moment(dates[1]).format('DD-MM-YYYY') !==booking.todate 
                )
                {
                  availability =true;

                }

              }
              
            }

        }
        if(availability==true || room.currentbookings.length==0)
        {
          temprooms.push(room)
        }
        setrooms(temprooms)

    }
  }


  return (
    <div className="container">
     <div className="row mr-5 bs">
        <div className="col-md-3">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>

        </div>
        <div className="col -md-5">
        <input type="text" className="form-control" placeholder="search rooms" value={searchkey} onChange={(e) => {
            setsearchkey(e.target.value)
          }} onKeyUp={filterbysearch} />
          

        </div>
        <div className="col-md-3">
        <select className="form-control" value={type} onChange={(e) => {
            filterbyType(e.target.value);
          }}>
            <option value='all'>All</option>
            <option value='deluxe'>Deluxe</option>
            <option value='non-deluxe'>Non-deluxe</option>

          </select>

        </div>
        

     </div>
      <div className="row justify-content-center mt-5 ">
        {loading ? (
          <Loader/>
        ) : (
          rooms.map((item) => {
            return(
               <div className="col-md-9 mt-3">
                <Room room={item} fromdate={fromdate} todate={todate}/>
            </div>
          );
          })
          
          //   <h4>{item.name}</h4>)
        )}
      </div>
    </div>
  );
}

export default Homescreen;
