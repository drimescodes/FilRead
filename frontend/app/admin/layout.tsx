import Navbar from "@/components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-filwhite min-h-screen lg:p-4">
      <Navbar />
      <div className="mx-auto mt-6 ">
        {children}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
}