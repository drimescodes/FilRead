"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Hero from "@/public/illustrations.svg";
import Link from "next/link";
import { LucideHeart, Github, Twitter, Globe } from "lucide-react";
import FeatureSection from "@/components/FeatureSection";
import LpNewsletter from "@/components/LpNewsletter";

const page = () => {
  return (
    <section className="relative flex flex-col min-h-screen bg-filwhite text-black">
      <Navbar />

      {/* Main content */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Text Content */}
            <div className="flex-1 text-center lg:text-left animate-fadeIn">
              <p className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                A WORLD OF{" "}
                <span className="text-filblue">DECENTRALIZATION </span>
                BLOGGING HAS NEVER BEEN EASIER
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/auth/register"
                  className="px-8 py-3  bg-filblack hover:bg-filblack bg-opacity-90 text-filwhite font-semibold transition-all hover:scale-105"
                >
                  Start Writing
                </Link>
                <Link
                  href="/blogs"
                  className="px-8 py-3 text-filwhite border bg-filblue border-opacity-80 font-semibold hover:border-filblue/80 transition-all hover:scale-105"
                >
                  Start Reading
                </Link>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="flex-1 animate-fadeInRight">
              <Image
                src={Hero}
                alt="Hero illustration"
                className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>

      <FeatureSection />
      <LpNewsletter />

      {/* Background Circles */}

      {/* Footer */}
      <footer className="border-t border-filblack border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-filblack">
              <span>© 2025 Made with</span>
              <LucideHeart className="w-4 h-4 text-filblue animate-pulse" />
              <span>by the CADS</span>
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/drimescodes"
                target="_blank"
                className="text-filblack hover:text-filblue transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/drimesbot"
                target="_blank"
                className="text-filblack hover:text-filblue transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://drimes-portfolio.vercel.app/"
                target="_blank"
                className="text-filblack hover:text-filblue transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default page;
