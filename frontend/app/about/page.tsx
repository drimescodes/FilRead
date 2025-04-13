"use client";
import Navbar from "@/components/Navbar";
import { LucideHeart } from "lucide-react";

const AboutPage = () => {
  return (
    <section className="bg-readreblack-1 text-white min-h-svh flex flex-col items-center ">
      <Navbar />
      <div className="max-w-3xl w-full px-4 py-16">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8 animate-fadeIn">
          About This Project
        </h1>

        {/* Background Section */}
        <div className="mb-12 animate-fadeIn delay-200">
          <h2 className="text-2xl font-semibold mb-4">Background</h2>
          <p className="text-readreblack-6 leading-relaxed">
            This project began as a personal hobby to explore backend
            development and strengthen my frontend skills. It provided an
            opportunity to go deeper into both frontend and backend
            technologies, helping me grow significantly as a developer. The main
            goal is to be a Software Engineer.
          </p>
        </div>

        {/* What I Learned Section */}
        <div className="mb-12 animate-fadeIn delay-300">
          <h2 className="text-2xl font-semibold mb-4">What I Learned</h2>
          <div className="space-y-6">
            {/* Frontend */}
            <div>
              <h3 className="text-xl font-semibold text-readrepurple-5">
                Frontend Development
              </h3>
              <ul className="list-disc list-inside text-readreblack-6">
                <li>
                  Enhanced UI/UX design skills by implementing responsive
                  layouts, animations, and modern design principles.
                </li>
                <li>Improved state management using libraries like Zustand.</li>
                <li>Leveraged Next.js features for SSR and CSR.</li>
                <li>Got better using Nextjs, I learnt a lot.</li>
                <li>Implemented using Cloudinary for file uploads.</li>
              </ul>
            </div>
            {/* Backend */}
            <div>
              <h3 className="text-xl font-semibold text-readrepurple-5">
                Backend Development
              </h3>
              <ul className="list-disc list-inside text-readreblack-6">
                <li>
                  Gained experience with FastAPI for API creation and database
                  integration.
                </li>
                <li>
                  Integrated Google OAuth for authentication and optimized image
                  handling with Cloudinary.
                </li>
                <li>
                  Focused on performance optimization, data handling, and API
                  security best practices.
                </li>
                <li>
                  Learnt hosting using vercel and supabase for the database.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features to Be Added Section */}
        <div className="mb-12 animate-fadeIn delay-400">
          <h2 className="text-2xl font-semibold mb-4">Features to Be Added</h2>
          <ul className="list-disc list-inside text-readreblack-6">
            <li>
              <strong>AI-Powered Text Prediction:</strong> Implementing text
              prediction to enhance user writing experience.
            </li>
            <li>
              <strong>Enhanced Mobile Support:</strong> Improving compatibility
              and experience for iOS/macOS users.
            </li>
            <li>
              <strong>Profile Enhancements:</strong> Adding more user
              customization options and a better draft management system.
            </li>
          </ul>
        </div>

        {/* Bugs and Issues Section */}
        <div className="mb-12 animate-fadeIn delay-500">
          <h2 className="text-2xl font-semibold mb-4">
            Current Bugs and Issues
          </h2>
          <ul className="list-disc list-inside text-readreblack-6">
            <li>
              <strong>iOS/macOS Compatibility:</strong> The site currently faces
              issues due to third-party cookies, affecting authentication on
              Safari, still researching on how to solve this.
            </li>
          </ul>
        </div>

        {/* Acknowledgements Section */}
        <div className="mb-12 animate-fadeIn delay-600 text-center">
          <h2 className="text-2xl font-semibold mb-4">Acknowledgements</h2>
          <p className="text-readreblack-6 leading-relaxed">
            {`I'm genuinely grateful to everyone who contributed to this project.
            Special thanks to llms, my friends who provided valuable feedback
            and support throughout the process and lastly to the hundreds of
            songs that got me through this. This project wouldn't be where it is
            without them.`}
          </p>
          <div className="mt-4 flex justify-center items-center gap-1 text-readrepurple-5">
            <span>Made with</span>
            <LucideHeart className="w-5 h-5 animate-pulse" />
            <span>by drimes</span>
          </div>
        </div>
      </div>

      {/* Global Animations */}
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
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default AboutPage;
