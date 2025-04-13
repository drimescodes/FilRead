"use client";

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { Pen } from "lucide-react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import WalletProfilePopover from "@/components/WalletProfilePopover";
import logo from "@/public/logo.svg"
import Image from "next/image";

const Navbar = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  return (
    <header className="w-full bg-filwhite text-black sticky top-0 z-50 border-b border-b-readreblack-4">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/welcome" className="flex items-center gap-2" prefetch={false}>
          {/* <p className="text-2xl font-semibold">
            Readre<span className="font-bold text-3xl text-[#9333ea]">.</span>
          </p> */}
          <Image src={logo} alt="logo" width={50} />
        </Link>

        <nav className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-black">
            <Link
              href="/"
              className="text-sm font-medium hover:text-filblue transition-colors"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className="text-sm font-medium hover:text-filblue transition-colors"
              prefetch={false}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-filblue transition-colors"
              prefetch={false}
            >
              About
            </Link>
            {!isConnected && (
              <button
                onClick={openConnectModal}
                className="text-sm bg-filblue bg-opacity-80 hover:bg-filblue font-bold rounded-md py-1 px-4 transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {/* Write Button (visible when connected) */}
          {isConnected && (
            <Link
              href="/admin/create_blog"
              className="text-[1.1rem] font-medium hover:text-filblue transition-colors"
              prefetch={false}
            >
              <Pen className="inline-flex w-5 mr-[.1rem]" /> Write
            </Link>
          )}

          {/* Profile or Hamburger Menu */}
          {isConnected ? (
            <WalletProfilePopover />
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-readreblack-1"
                >
                  <HiOutlineMenuAlt4 className="w-6 h-6 text-black bg-readreblack-1" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 bg-background p-4 bg-readreblack-1 text-black"
              >
                <nav className="grid gap-4">
                  <Link
                    href="/"
                    className="text-sm font-medium hover:text-filblue transition-colors"
                    prefetch={false}
                  >
                    Home
                  </Link>
                  <Link
                    href="/blogs"
                    className="text-sm font-medium hover:text-filblue transition-colors"
                    prefetch={false}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-medium hover:text-filblue transition-colors"
                    prefetch={false}
                  >
                    About
                  </Link>
                  <button
                    onClick={openConnectModal}
                    className="text-sm bg-filblue bg-opacity-80 hover:bg-filblue font-bold rounded-md py-1 px-4 transition-colors"
                  >
                    Connect Wallet
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;