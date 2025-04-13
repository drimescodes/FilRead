// import Spinner from "@/components/Spinner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <section className="bg-readreblack-1 text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        {/* <div className="flex flex-col items-center justify-center space-y-4">
          <Spinner size={48} className="text-readrepurple-5" />
          <p className="text-readreblack-4 text-lg">Loading blog post...</p>
        </div> */}
        
        {/* Skeleton layout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-3">
            <div className="w-full h-[400px] bg-readreblack-6 rounded-lg animate-pulse" />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <div className="space-y-4">
              <div className="h-6 bg-readreblack-6 rounded animate-pulse w-1/4" />
              <div className="h-10 bg-readreblack-6 rounded animate-pulse" />
              <div className="h-4 bg-readreblack-6 rounded animate-pulse w-1/2" />
              <div className="space-y-3 mt-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-readreblack-6 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
          
          <aside className="col-span-1 border-l pl-3">
            <div className="bg-readreblack-6 p-4 rounded-lg mb-6 animate-pulse h-48" />
            <div className="bg-readreblack-6 p-4 rounded-lg animate-pulse h-24" />
          </aside>
        </div>
      </div>
      <Footer />
    </section>
  );
}