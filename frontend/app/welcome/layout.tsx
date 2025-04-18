import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-filwhite text-filblack min-h-svh">
      <Navbar />
      
      {children}

      <Footer />

    </section>
  );
};

export default BlogLayout;