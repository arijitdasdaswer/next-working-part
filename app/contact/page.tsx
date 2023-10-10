"use client";
import Footer from "../../components/Footer";
//import Card from "../../components/Card";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm()
{

    const [buttonDisabled, setButtonDisabled ] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const showToastMessage = () => {
      toast.success('Success Notification !', {
          position: toast.POSITION.TOP_RIGHT
      });
  };
  const sendEmail = async () =>{
    try {
        setLoading(true);
        toast.success('Feedback sent Successfully!', {
        position: toast.POSITION.TOP_RIGHT});

    } catch (error: any) {
        console.log("feedback failed", error.message);
        toast.error(error.message);
    }
    finally
    {
        setLoading(false);
    }
     
  }

return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl text-slate-600"> About Us: Green Queen</h1><br></br>
      <p className="text-justify">The team at GreenQueen are all avid recyclers and want to help you better understand the complex system of recycling in Australia.
        Through providing easy to access information in one place we can give you the tools you need to recycle more effectively.
        Through influence,you too can help others to improve their recycling habits and reduce the amount of waste going to landfill.</p><br></br>
      <h1 className="text-xl text-slate-600">About Binfluence</h1><br></br>
      <p>We have designed an efficient, unique, digital solution to the problem.
        We can help Councils and recycling companies to better inform residents of changes to waste and
        recycling pick-up, bins, and items through the use of QR codes placed on bins or waste rooms.
        Through smart search look-up, we provide information to you, the individual about local places you can drop specialised recycling,
        or arrange a collection at home.
      </p><br></br>
     <h1 className="text-xl text-slate-600">Share your Feedback</h1>
     <hr/>
     <div>
  <label htmlFor="name">Name : </label>
  <input
    className="p-2 border border-gray-300 focus:outline-none focus-border-gray-700"
    id="name"
    type="text"
    style={{ width: '100%' }}
    // value={user.name}
    // onChange={(e) => setUser({ ...user, name: e.target.value })}
    placeholder="name"
    />
  </div>
        <hr/>
        <div>
  <label htmlFor="email">Email : </label>
  <input
    className="p-2 border border-gray-300 focus:outline-none focus-border-gray-700"
    id="email"
    type="text"
    style={{ width: '100%' }}
    // value={user.email}
    // onChange={(e) => setUser({ ...user, email: e.target.value })}
    placeholder="email"
  />
  </div>
  <hr />
<div>
  <label htmlFor="message">Message : </label>
  <textarea
    className="p-2 border border-gray-300 focus:outline-none focus-border-gray-700"
    id="message"
    rows={4} // Adjust the number of rows as needed
    style={{ width: '100%' }}
    // value={user.message}
    // onChange={(e) => setUser({ ...user, message: e.target.value })}
    placeholder="message"
  />
</div>
<hr />
<br />
       <button 
       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
       onClick={sendEmail}>Send Feedback</button>
      <ToastContainer />
      <h1 className="text-xl text-slate-600">Visit Us</h1>
      <Link  href="https://www.greenqueenaus.com.au/">
      <img src="/favicon.ico" alt="Visit Us" />
    </Link>
    <Footer parentHeight={0} />
     </div>
)
}

