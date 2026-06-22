
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import {Button, Card, CloseButton} from "@heroui/react";
import Image from "next/image";
import { Bs5Square } from "react-icons/bs";


export default function Home() {
  return (
    <div>
 {/* <div className="absolute inset-0 bg-[#1d1c1c] overflow-hidden">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-radial from-yellow-500/10 via-transparent to-transparent blur-4 pointer-events-none"></div>
</div> */}
<HeroBanner />
    </div>
  );
}
