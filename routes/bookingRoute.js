const express=require("express");
const router=express.Router();
const Booking =require("../models/booking");
const Room=require("../models/room");
const moment=require("moment");

const { v4: uuidv4 } = require("uuid");

const stripe = require('stripe')("pk_test_51LPgEoSFiKJze7tpIV6rQ0INdOLKbq7AG6ILasTVVK0LlnHLSkcDeJk3L3aE360a4jb5biB6DEBYpzhifNML6qyK00wGP9lkfQ");


router.post("/bookroom", async(req, res) => {
    const {
        room,userid, fromdate, todate, totalamount, totaldays, token
        } = req.body;


        try {
             const customer = await stripe.customers.create(
                    {
                        email: token.email,
                        source: token.id,
                    }
            );
            const payment = await stripe.charges.create({
                amount: totalamount * 100,
                customer: customer.id,
                currency: 'inr',
                receipt_email: token.email,

            },{
                
                idempotencyKey: uuidv4(),
            }
        );
        if(payment)
        {
            try{
                const newbooking = new Booking({
                    room: room.name,
                    roomid: room._id,
                    userid,
                    fromdate: moment(fromdate).format("DD-MM-YYYY"),
                    todate: moment(todate).format("DD-MM-YYYY"),
                    totalamount,
                    totaldays,
                    transactionId: '1234'
                    
                                        
            });
            const booking = await newbooking.save();
            const roomtemp = await Room.findOne({ _id: room._id });

                roomtemp.currentbookings.push(
                    {
                        bookingId: booking._id,
                        fromdate: moment(fromdate).format("DD-MM-YYYY"),
                        todate: moment(todate).format("DD-MM-YYYY"),
                        userid: userid,
                        status: booking.status
                    });
                    await roomtemp.save()

                    res.send("room booked ");
                }catch(error){
                    return res.status(400).json({error});

                }
                    

        }




        
        res.send('payment successfull', 'your room is booked');



       }catch(error){
        return res.status(400).json({error});

       }   
    });
    module.exports=router;


    














// router.post("/bookroom", async (req, res) => {
//     const {
//         room,
//         userid, fromdate, todate, totalamount, totaldays, token

//     } = req.body

//     try {
//         const customer = await stripe.customers.create(
//             {
//                 email: token.email,
//                 source: token.id
//             }
//         )

//         const payment = await stripe.charges.create(
//             {
//                 amount: totalamount * 100,
//                 customer: customer.id,
//                 currency: 'inr',
//                 receipt_email: token.email,
//             }, {
//             idempotencykey: uuidv4()
//         }
//          )

//         if (payment) {

//             try {
//                 const newbooking = new Booking(
//                     {
//                         room: room.name,
//                         roomid: room._id,
//                         userid,
//                         fromdate: moment(fromdate).format("DD-MM-YYYY"),
//                         todate: moment(todate).format("DD-MM-YYYY"),
//                         totalamount,
//                         totaldays,
//                         transactionId: '1234'
//                     }
//                 )
//                 const booking = newbooking.save();
//                 const roomtemp = await Room.findOne({ _id: room._id });

//                 roomtemp.currentbookings.push(
//                     {
//                         bookingId: booking._id,
//                         fromdate: moment(fromdate).format("DD-MM-YYYY"),
//                         todate: moment(todate).format("DD-MM-YYYY"),
//                         userid: userid,
//                         status: booking.status
//                     }
//                 ); 
//                      await roomtemp.save()

//                      res.send("room booked ");

             

//             }catch(error){
//                 return res.status(400).json({error});
//             }
           
//         }
//         res.send('payment successfull', 'your room is booked');

//     } catch (error) {
//         return res.status(400).json({error});


//         // res.send(error);

//     }

// })




// router.post("/bookroom",async(req,res)=>{
//     const  {
//             rooms,
//             userid,
//             fromdate,
//             todate,
//             totalamount,
//             totaldays}=req.body

//             try{
//                 const newbooking=new Booking({
//                     room:rooms.name,
//                     roomid:rooms._id,
//                     userid,
//                     fromdate: moment(fromdate).format('DD-MM-YYYY'),
//                     todate: moment(todate).format('DD-MM-YYYY'),
//                     totalamount,
//                     totaldays,
//                     transactionId:'1234'
//                 })
//                 const booking=await newbooking.save()

//                 const roomtemp=await Room.findOne({_id:rooms._id})
//                 roomtemp.currentbookings.push({
//                     bookingid: booking._id,
//                 fromdate:moment(fromdate).format("DD-MM-YYYY"),
//                 todate: moment(todate).format("DD-MM-YYYY"),
//                 userid:userid,
//                 status:booking.status
//             });
//             await roomtemp.save()
//                 res.send('Room Booked Successfully')



//             }catch(error){
//                 return res.status(400).json({error});
//             }

// });
// module.exports=router

 //Router.post("/getBookingsbyiduserid",(req,res)=?
// {
//     const userid=req.body.userid;

//     try {
//       const booking=await Booking.find({userid:userid});  
//     } catch (error) {
//         return res.status(500).json({error})

//     }

// })


// Router.post("/canclebooking", (req, res) => {
//     const { bookingid, roomid } = req.body;

//     try {

//         const bookingitem = await Booking.findOne({ _id: bookingid });
//         bookingitem.status = 'canclled';

//         await booking.save();
//         const room = await Room.findOne({ _id: roomid });

//         const bookings = room.currentbookings

//         const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
//         room.currentbookings = temp;

//         await room.save();

//         res.send("Your Booking cancelled Successfully")


//     } catch (error) {
//         return res.status(400).json({ error });

//     }
// })