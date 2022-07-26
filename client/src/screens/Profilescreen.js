import React, { useEffect, useState } from 'react';
import Tabs from 'antd/package.json'
import { axios } from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Bookingscreen from './Bookingscreen';
import Room from '../components/Room';

const { TabPane } = Tabs;

function Profilescreen(name) {


    const user = JSON.parse(localStorage.getItem("currentuser"));

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';

        }
    })

    return (
        <div className='ml-3 mt-3'>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <h1>profile</h1>
                    <br />
                    <h1>Name : {user.name}</h1>
                    <h1> Email : {user.email}</h1>
                    <h1>isAdmin : {user.isAdmin ? "Yes" : "No"}</h1>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />

                </TabPane>

            </Tabs>

        </div>
    );
};

export default Profilescreen;

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentuser"));
    const [bookings, setbookings] = useState([]);
    const [loading,setLoading]=useState(true);
    const [error,seterror]=useState();


    useEffect(async () => {
        try {

            setLoading(true);
            const data = await (await axios.post('/api/bookings/getbookings/byuserid/', { userid: user._id })).data;
            console.log(data);
            setbookings(data);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            seterror(error);
        }

    }, [])
    return <div>
        <div className='row'>
            <div className='col-md-6'>

                {loading && (<Loader/>)}
                {bookings && (bookings.map(booking=>{
                    <div>

                        <h1> {booking.room}</h1>
                    </div>

                }))}


            </div>

            <h1>My Bookings</h1>
        </div>
    </div>
}



//inside the navbar add Route in which import <Profilescreen>

// before the logout button booking replace with profile