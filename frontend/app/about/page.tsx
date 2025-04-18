"use client";
import Navbar from "@/components/Navbar";
import  Image from "next/image";
import team_pic from "@/public/team_pic.png";
const AboutPage = () => {
  const teamMembers = [
    { name: "Drimes", role: "Lead & Front-end", twitter: "https://twitter.com/drimesbot" },
    { name: "AY", role: "Smart Contract Dev", twitter: "https://twitter.com/Ayomisco_s" },
    { name: "Simon", role: "Smart Contract Dev", twitter: "https://twitter.com/OgbuOkwa" },
    { name: "Myles", role: "Design", twitter: "https://twitter.com/collinsndibe" }
  ];
  return (
    <section className="bg-filwhite text-filblack min-h-svh flex flex-col items-center ">
      <Navbar />
      <div className=" py-12 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-">
        <div className="md:w-3/5">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-filblack">ABOUT </span>
            <span className="text-filblue">FILRead</span>
          </h2>
          
          <div className="space-y-6 text-filblack">
            <p className="text-lg">
              This project is a product of the FIL Builders orbit 
              Bootcamp Africa 2025 @the hacker house Lagos 
              Nigeria.
            </p>
            
            <p className="text-lg">
              During the Bootcamp our team of 4 brainstormed 
              on Ideas of how we can bring the writing economy 
              into the blockchain and onboard them into the 
              decentralized World through FVM, Shout out to the 
              entire team including our Lead {' '}
              <a href={teamMembers[0].twitter} target="_blank" rel="noopener noreferrer" className="text-filblue hover:text-filblue hover:text-opacity-95 cursor-pointer">
                {teamMembers[0].name}
              </a> {' '}
              who is the master mind behind the project and the front-end 
              guy, also two of our smart contract devs {' '}
              <a href={teamMembers[1].twitter} target="_blank" rel="noopener noreferrer" className="text-filblue hover:text-filblue hover:text-opacity-95 cursor-pointer">
                {teamMembers[1].name}
              </a> {' '}
              and {' '}
              <a href={teamMembers[2].twitter} target="_blank" rel="noopener noreferrer" className="text-filblue hover:text-filblue hover:text-opacity-95 cursor-pointer">
                {teamMembers[2].name}
              </a>
              , and lastly {' '}
              <a href={teamMembers[3].twitter} target="_blank" rel="noopener noreferrer" className="text-filblue hover:text-filblue hover:text-opacity-95 cursor-pointer">
                {teamMembers[3].name}
              </a> {' '}
              the design guy.
            </p>
            
            <p className="text-lg">
              The back-end of this project is implemented on the 
              blockchain and built on the FVM
            </p>
            
            <p className="text-lg">
              The FILRead App follow a very design centered 
              Approach, We want to make it as easy as possible for 
              people to read and publish blogs on the blockchain
            </p>
            
            <div className="flex gap-4 mt-8">
              <a href="#" className="bg-filblue text-white px-6 py-3 text-sm font-medium uppercase tracking-wide hover:bg-blue-600 transition-colors">
                SEE PITCH DECK
              </a>
              <a href="#" className="bg-filblack text-white px-6 py-3 text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors">
                HIRE TEAM
              </a>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/5 mt-8 md:mt-0">
          <div className="relative">
            {/* <div className="w-full aspect-square bg-purple-600 rounded-full flex items-center justify-center"> */}
             
                <img 
                  src={team_pic.src}
                  alt="The CADS Team" 
                  className="w-full h-full object-cover"
                />
            
            {/* </div> */}
            
          </div>
        </div>
      </div>
    </div>
    
    </section>
  );
};

export default AboutPage;
