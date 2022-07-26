import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration:1000
}); 

function Bookingscreen({}) {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [rooms, setrooms] = useState();
  const [error, seterror] = useState();

  const roomid = params.roomid;
  const fromdate = moment(params.fromdate, "DD-MM-YYYY");
  const todate = moment(params.todate, "DD-MM-YYYY");
  const rentperday = params.rentperday;

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: params.roomid })
        ).data;

        settotalamount(data.rentperday * totaldays);
        setrooms(data);
        setLoading(false);
      } catch (error) {
        seterror(true);
        setLoading(false);
      }
    };
    loadPost();
  }, []);

  async function onToken(token) {
    console.log(token);
    console.log(JSON.parse(localStorage.getItem("currentUser"))._id);

    const bookingDetails =
    {
        rooms,
        userid: JSON.parse(localStorage.getItem("currentUser"))._id,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
    };
    try {
    console.log(bookingDetails);

      setLoading(true);
        const result = await (await axios.post("api/bookings/bookroom",{ bookingDetails:bookingDetails } )).data;
        setLoading(false);
        Swal.fire('congralution','room booked','success').then(result=>{
          window.location.href='/bookings'
        })
    } catch (error) {
    console.log(error);

      setLoading(false)
      Swal.fire('congralutaion','room booked','success')

    }

}

  async function bookRoom() {
    const bookingDetails = {
      rooms,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };
    try {
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
    } catch (error) {}
  }

  return (
    <div className="m-5 "data-aos="flip-left">
      {loading ? (
        <Loader />
      ) : rooms ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5">
              <h1>{rooms.name}</h1>
              <img src={rooms.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-5">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name:{JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date:{params.fromdate}</p>
                  <p>To Date:{params.todate}</p>
                  <p>Max Count:{rooms.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days:{totaldays}</p>
                  <p>Rent per day: {rooms.rentperday}</p>
                  <p>Total Amount: {totalamount}</p>
                </b>
              </div>

              {/* payment gateway */}
              <div style={{ float: "right" }}>
                <StripeCheckout
                  token={onToken}
                  amount={totalamount * 100}
                  currency="INR"
                  stripeKey="pk_test_51LPgEoSFiKJze7tpIV6rQ0INdOLKbq7AG6ILasTVVK0LlnHLSkcDeJk3L3aE360a4jb5biB6DEBYpzhifNML6qyK00wGP9lkfQ"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>


              {/* <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>
                  Pay now
                </button>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
