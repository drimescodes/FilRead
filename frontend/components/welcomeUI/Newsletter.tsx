import { MdEmail } from "react-icons/md"
const Newsletter = () => {
  return (
    <section className="text-white">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md sm:text-center">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold ">Sign up for our newsletter</h2>
          <p className="mx-auto mb-8 max-w-2xl font-light  md:mb-12 sm:text-xl">Stay up to date with the readre, {"and don't"} miss any latest posts from us.</p>
          <form action="#">
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div className="relative w-full">
                      <label htmlFor="email" className="hidden mb-2 text-sm font-medium ">Email address</label>
                      <div className="flex absolute inset-y-0 left-0 items-center text-readreblack-6 px-3 pointer-events-none">
                            <MdEmail size={30}/>
                      </div>
                      <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:outline-readrepurple-5 focus:ring-readrepurple-5 focus:border-readrepurple-5" placeholder="Enter your email" type="email" id="email" required />
                  </div>
                  <div>
                      <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center rounded-lg border cursor-pointer bg-readrepurple-5 border-readrepurple-5 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-readrepurple-5 ">Subscribe</button>
                  </div>
              </div>
          </form>
      </div>
  </div>
</section>
  )
}

export default Newsletter