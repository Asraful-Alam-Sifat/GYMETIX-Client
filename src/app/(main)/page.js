import HeroBanner from "@/components/Home/HeroBanner/HeroBanner";
import FeaturedClasses from "@/components/Home/FeaturedClasses/FeaturedClasses";
import HowItWorks from "@/components/Home/HowItWorks/HowItWorks";
import WhyGymetix from "@/components/Home/WhyGymetix/WhyGymetix";
import PlatformFeatures from "@/components/Home/PlatformFeatures/PlatformFeatures";


export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedClasses />
      <HowItWorks/>
      <WhyGymetix/>
      <PlatformFeatures/>
    </div>
  );
}
