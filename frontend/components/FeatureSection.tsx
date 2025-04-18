import sandglass from "@/public/sandglass.png"
import book from "@/public/book.png"
import typewriter from "@/public/typewriter.png"
import stone from "@/public/stone.png"
import Image from "next/image";
export default function FeatureSection() {
    const features = [
      {
        icon: book,
        title: "Read Everything readable",
        description: "Start from the things that interests you"
      },
      {
        icon: sandglass,
        title: "A time well Spent",
        description: "A time spent both writing or reading is not a wasted one, write more, read more"
      },
      {
        icon: typewriter,
        title: "Just type it",
        description: "There's no telling how far your blog will go, lives it will touch, if only you let go"
      },
      {
        icon: stone,
        title: "Use one stone to kill two birds",
        description: "Get rewarded for reading, earn points while you read"
      }
    ];
  
    return (
      <div className="bg-gray-900 flex-grow  px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col justify-start items-center text-left">
              <div className="relative mb-4 w-[14rem]">
               
                    <Image src={feature.icon} alt={feature.title}  />
                
              </div>
              <h3 className="text-2xl font-bold mb-2 text-filwhite sm:w-[10rem] ">{feature.title}</h3>
              <p className="text-sm text-filwhite sm:w-[10rem] text-center sm:text-left">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }