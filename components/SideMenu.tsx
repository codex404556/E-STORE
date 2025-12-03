import Logo from "./Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: Props) => {
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/80 shadow-xl text-white ${isOpen ? "translate-x-0" : "-translate-x-full"} hoverEffect`}
    >
      <div
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-shop_dark_yellow flex flex-col gap-6 "
      >
        <div className="flex item-center justify-between">
          <Logo className="text-white" />
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-5 font-semibold traking-wide">
          {headerData?.map((item) => (
            <Link
              className=""
              onClick={() => onClose()}
              href={item?.href}
              key={item?.title}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
