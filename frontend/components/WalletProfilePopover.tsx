import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress";
import { useChainModal } from "@rainbow-me/rainbowkit";

const WalletProfilePopover = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { openChainModal } = useChainModal();
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(address ?? "");

  const shortenAddress = (addr: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-full border-filblue border-2 p-0 w-10 h-10">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor }}
          >
            {emoji}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 rounded-md shadow-md bg-filblue text-white mt-1 mr-3 border-[.1rem] border-readreblack-4">
        <div className="flex flex-col items-center mb-4">
          <div
            className="h-12 w-12 rounded-full flex items-center justify-center mb-2"
            style={{ backgroundColor }}
          >
            {emoji}
          </div>
          <span className="font-mono text-sm">{shortenAddress(address)}</span>
        </div>
        <nav className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => router.push("/admin/manage-blogs")}
          >
            Manage Your Blogs
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => router.push("/admin/create_blog")}
          >
            Create New Blog
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => router.push("/blogs")}
          >
            All Blogs
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={openChainModal}
          >
            Switch Network
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
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