import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useBalance, useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress";
import { useChainModal } from "@rainbow-me/rainbowkit";
import useSWR from 'swr';
import Image from 'next/image';

const WalletProfilePopover = () => {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { openChainModal } = useChainModal();
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(address ?? "");

  // Fetch profile data using SWR
  interface Profile {
    username?: string;
    profile_picture?: string;
  }

  const fetcher = (url: string): Promise<Profile> => fetch(url).then((res) => res.json());
  const { data: profile } = useSWR(address ? `/api/profile?address=${address}` : null, fetcher);
  console.log("Profile Data:", profile);
  // Fetch balance
  const { data: balanceData } = useBalance({
    address,
    chainId: chain?.id,
  });
  const balance = balanceData ? parseFloat(balanceData.formatted).toFixed(4) : "0.0000";
  const symbol = balanceData?.symbol || "ETH";

  const shortenAddress = (addr: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  // Determine display name and avatar
  const displayName = profile?.username || shortenAddress(address ?? "");
  const avatar = profile?.profile_picture ? (
    <Image
      src={profile.profile_picture}
      alt="Profile"
      width={32}
      height={32}
      className="h-8 w-8 rounded-full"
    />
  ) : (
    <div
      className="h-8 w-8 rounded-full flex items-center justify-center"
      style={{ backgroundColor }}
    >
      {emoji}
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-full border-filblue border-2 p-0 w-10 h-10">
          {avatar}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 rounded-md shadow-md bg-filblue text-white mt-1 mr-3 border-[.1rem] border-readreblack-4">
        <div className="flex flex-col items-center mb-4">
          {profile?.profile_picture ? (
            <Image
              src={profile.profile_picture}
              alt="Profile"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full mb-2"
            />
          ) : (
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor }}
            >
              {emoji}
            </div>
          )}
          <span className="font-mono text-sm">{displayName}</span>
          <span className="text-sm font-bold text-filblack">
            Balance: {balance} {symbol}
          </span>
        </div>
        <nav className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="justify-start hover:bg-filblack"
            onClick={() => router.push("/admin/manage-blogs")}
          >
            Manage Your Blogs
          </Button>
          <Button
            variant="ghost"
            className="justify-start hover:bg-filblack"
            onClick={() => router.push("/admin/create_blog")}
          >
            Create New Blog
          </Button>

          <Button
            variant="ghost"
            className="justify-start hover:bg-filblack"
            onClick={() => router.push("/settings")}
          >
            Settings
          </Button>
          <Button
            variant="ghost"
            className="justify-start hover:bg-filblack"
            onClick={() => router.push("/blogs")}
          >
            All Blogs
          </Button>
          <Button
            variant="ghost"
            className="justify-start hover:bg-filblack"
            onClick={openChainModal}
          >
            Switch Network
          </Button>
          <Button
            variant="ghost"
            className="justify-start hover:bg-filblack"
            onClick={() => {
              disconnect();
            }}
          >
            Disconnect
          </Button>
        </nav>
      </PopoverContent>
    </Popover>
  );
};

export default WalletProfilePopover;