'use client';
import { useEffect, useRef } from 'react';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { emojiAvatarForAddress } from '@/lib/emojiAvatarForAddress';
import { useRouter } from 'next/navigation';
import Loading from "./Spinner"
import { FaWallet } from 'react-icons/fa';

export const ConnectBtn = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(address ?? '');
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Redirect to /welcome when connected
  useEffect(() => {
    if (isConnected && address && isMounted.current) {
      router.push('/welcome');
    }
  }, [isConnected, address, router]);

  if (!isConnected) {
    return (
      <button
        className="font-bold text-[1.1rem] leading-[22px] rounded-[48px] text-white items-center gap-2 flex bg-readrepurple-5 h-[64px] mt-12 w-[298px] px-[41px] mb-8 cursor-pointer"
        onClick={async () => {
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <span>Connecting...</span>
            <Loading />
          </>
        ) : (
          <>
            <FaWallet size={30} />
            <span>Connect Wallet</span>
          </>
        )}
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button
        className="font-bold text-[1.1rem] leading-[22px] rounded-[48px] text-white items-center gap-2 flex bg-readrepurple-5 h-[64px] mt-12 w-[298px] px-[41px] mb-8 cursor-pointer"
        onClick={openChainModal}
      >
        Wrong Network
      </button>
    );
  }

  return (
    <div className="max-w-5xl w-full flex items-center justify-between">
      <div
        className="flex justify-center items-center px-4 py-2 border border-neutral-700 bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer"
        onClick={async () => openAccountModal?.()}
      >
        <div
          role="button"
          tabIndex={1}
          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{
            backgroundColor,
            boxShadow: '0px 2px 2px 0px rgba(81, 98, 255, 0.20)',
          }}
        >
          {emoji}
        </div>
        <p>Account</p>
      </div>
      <button
        className="font-bold text-[1.1rem] leading-[22px] rounded-[48px] text-white items-center gap-2 flex bg-readrepurple-5 h-[64px] mt-12 w-[298px] px-[41px] mb-8 cursor-pointer"
        onClick={openChainModal}
      >
        Switch Networks
      </button>
    </div>
  );
};