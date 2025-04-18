import { useState } from 'react';
import Image from 'next/image';
import speaker from "@/public/speaker.png";

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-28 py-14 ">
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Sign up for our Newsletter</h2>
          <p className="text-gray-700 mb-6">Get Informed, be the first to see our Updates</p>
          
          
        </div>
      <div className="flex flex-col md:flex-row items-center md:justify-center gap-8 ">
        <div className=''>
        <Image src={speaker} alt="speaker illustration"/>
        </div>

        <div className=" ">
        
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Input Email</h3>
          <form onSubmit={handleSubmit} className="flex ">
            <input
              type="email"
              placeholder="@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500  w-[13rem] sm:w-[48rem]"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}