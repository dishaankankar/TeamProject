
import React from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration:1000
});  
function Landingscreen ()  {
    return (
        <div className='row landing justify-content-center'>
            <div className='col-md-9 my-auto text-center'style={{borderRight:'8px solid white'}}>
                <h2 data-aos='zoom in' style={{color:'white',fontSize:'130px'}}>Tripify</h2>
                <h1 data-aos='zoom-out' style={{color:'white'}}>Make your Booking easier with Tripify</h1>
                <Link to="/home">
                <button className='btn landing-btn' style={{color:'black',backgroundColor:'white'}}>Get Started</button>
                </Link>

            </div>
            
        </div>
    );
};

export default Landingscreen;



// import React from 'react';
// // import AOS from 'aos'
// const Landingscreen = () => {
//     return (
//         <div className='row landing justify-content-center'>
//             <div className='col-md-9 my-auto text-center'style={{borderRight:'8px solid white'}}>
//                 <h2 data-aos='zoom in' style={{color:'white',fontSize:'130px'}}>Tripify</h2>
//                 <h1 data-aos='zoom-out' style={{color:'white'}}>There is only one boss The Guest.</h1>
//                 <Link to='/home'>
//                 <button className='btn landing-btn' style={{color:'black',backgroundColor:'white'}}>Get Started</button>
//                 </Link>

//             </div>
            
//         </div>
//     );
// };

// export default Landingscreen;







//**********index.css*****

//
// .landing
// {
//     background-color:black !important
// height:100vh;
// padding-top:100px


// }
//remove important tag from h2 and also font-weight in the index.css
//remove important tag from btn in the index.css
// .landing-btn{
// background-color:white !important
// color:black 1important
// margin-top:20px
// }

// .landing .col-md-12
// {
//    border-right:5px solid white ! important 
// }




//npm i aos
//import 'aos/dist/aos.css
// AOS.init(duration:2000)

//also import in Room component


// put data-aos="fade-up" in div whose class is row-bs


//Bookingscreen

{
    // put data-aos="flip-left" whose class is m-5 
}