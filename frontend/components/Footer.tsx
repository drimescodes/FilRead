import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <footer className="">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          
          <Link href="#" className=" mb-6 md:mb-0" prefetch={false}>
          
          <p className="text-2xl font-semibold">Readre<span className="font-bold text-3xl text-[#9333ea] whitespace-nowrap">.</span> </p>
        </Link>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase">
                Main
              </h2>
              <ul className="text-readreblack-6  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li className="mb-4"> 
                  <a href="#" className="hover:underline">
                    All Articles
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Follow us
              </h2>
              <ul className="text-readreblack-6 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/drimescodes"
                    className="hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://discord.gg/_drimes"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>

                <li >
                  <a
                    href="https://twitter.com/drimesbot"
                    className="hover:underline"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase">
                Legal
              </h2>
              <ul className="text-readreblack-6  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-readreblack-6  sm:text-center">
            © 2024{' '}
            <a href="https://flowbite.com/" className="hover:underline">
              Readre™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-readreblack-6  hover:text-gray-900 me-5">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-readreblack-6  hover:text-gray-900 me-5">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="text-readreblack-6  hover:text-gray-900 me-5">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-readreblack-6  hover:text-gray-900 me-5">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .198A9.827 9.827 0 0 0 0 10.198a9.826 9.826 0 0 0 10 9.804 9.693 9.693 0 0 0 4.618-1.13c.33-.157.54-.36.54-.676 0-.205-.009-.889-.012-1.615-1.84.336-2.364-.428-2.514-.82-.075-.192-.4-.82-.682-.984-.233-.125-.566-.433-.009-.442.526-.009.902.484 1.027.683.601 1.018 1.557.73 1.941.554.058-.435.233-.73.423-.898-1.63-.184-3.338-.813-3.338-3.61 0-.798.294-1.448.77-1.96-.075-.184-.336-.942.07-1.958 0 0 .617-.192 2.023.75a7.028 7.028 0 0 1 1.844-.245c.625 0 1.254.082 1.843.245 1.407-.942 2.024-.75 2.024-.75.405 1.016.144 1.774.07 1.958.479.512.769 1.162.769 1.96 0 2.805-1.714 3.426-3.346 3.61.24.21.466.61.466 1.239 0 .895-.012 1.623-.012 1.843 0 .315.21.675.547.676A9.696 9.696 0 0 0 20 10.198 9.827 9.827 0 0 0 10 .198Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="#" className="text-readreblack-6  hover:text-gray-900">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a10 10 0 0 0-3.16 19.49c.5.091.682-.217.682-.483 0-.24-.012-1.037-.012-1.882-2.487.456-3.178-.61-3.378-1.172-.112-.29-.6-1.17-1.026-1.405-.35-.19-.85-.656-.012-.668.79-.012 1.354.726 1.542 1.028.905 1.526 2.35 1.09 2.925.826.091-.654.354-1.09.642-1.34-2.22-.252-4.555-1.113-4.555-4.947 0-1.09.388-1.99 1.027-2.69-.102-.253-.446-1.27.099-2.65 0 0 .841-.268 2.755 1.025a9.455 9.455 0 0 1 2.508-.337 9.46 9.46 0 0 1 2.507.337c1.915-1.293 2.755-1.025 2.755-1.025.546 1.379.203 2.396.1 2.65.64.7 1.027 1.6 1.027 2.69 0 3.842-2.34 4.695-4.566 4.94.362.31.687.91.687 1.837 0 1.326-.012 2.395-.012 2.725 0 .266.18.575.687.483A10 10 0 0 0 10 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
