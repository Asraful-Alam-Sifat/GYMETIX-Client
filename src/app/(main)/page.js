import HeroBanner from "@/components/Home/HeroBanner/HeroBanner";
import FeaturedClasses from "@/components/Home/FeaturedClasses";
import HowItWorks from "@/components/Home/HowItWorks";
import WhyGymetix from "@/components/Home/WhyGymetix";
import PlatformFeatures from "@/components/Home/PlatformFeatures";
import JoinNow from "@/components/Home/JoinNow";
import FeaturedTrainers from "@/components/Home/FeaturedTrainers";
import MembershipPlans from "@/components/Home/MembershipPlan/MembershipPlan";



export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedClasses />
      <HowItWorks/>
      <WhyGymetix/>
      <PlatformFeatures/>
      <JoinNow /> 
      <MembershipPlans/>
      <FeaturedTrainers/>
    </div>
  );
}
