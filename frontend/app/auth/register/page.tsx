'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from './loading';
import { ConnectBtn } from '@/components/ConnectButton';

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <section className="w-full bg-readreblack-1 text-white h-svh sm:p-8 p-4">
      <p className="w-[121px] font-bold sm:text-[40px] text-[30px] leading-[48px] tracking-[-3%] h-[48px] mb-16">
        Readre<span className="font-bold text-6xl text-[#9333ea]">.</span>
      </p>
      <section className="flex flex-col items-center">
        <h1 className="font-bold sm:text-[48px] text-[50px] leading-[55px] tracking-[-3%] mb-8">
          Welcome to Readre<span className="font-bold text-6xl text-[#9333ea]">.</span>
        </h1>

        <ConnectBtn />

        <p className="text-center mt-4 text-readreblack-6">
          If you have an account, by connecting your wallet you will be automatically logged in.
        </p>
      </section>
    </section>
  );
};

export default Register;