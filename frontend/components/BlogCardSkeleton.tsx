const BlogCardSkeleton = () => {
    return (
      <section className="w-[21rem] h-[23rem] sm:w-[22rem] sm:h-[24rem] lg:w-[26rem] lg:h-[26rem] bg-readreblack-2 p-3 rounded-md relative overflow-hidden animate-pulse space-y-4 ">
        <div className="bg-gray-300 rounded-md h-[300px]"></div> {/* Simulates the image */}
        <div className="pt-8 bg-gray-400 h-5 w-24 mb-4"></div> {/* Simulates the category */}
        <div className="bg-gray-400 h-6 w-40 mb-4"></div> {/* Simulates the title */}
        <div className="bg-gray-400 h-4 w-32 absolute bottom-4"></div> {/* Simulates the date and read time */}
      </section>
    );
  };
  
  export default BlogCardSkeleton;