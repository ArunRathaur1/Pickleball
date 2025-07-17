
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceCalculator } from "@/components/services/service-calculator";
import { Image, Video, Users, BarChart, Instagram, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServicesPreview = () => {
  const services = [
  {
    title: "Tournament Promotion",
    description:
      "From reels and content to campaigns and collaborations – we handle everything before, during, and after your tournament.",
    icon: <Video className="h-6 w-6" />,
    features: [
      "Pre, live & post-event coverage",
      "Reels & creative content",
      "Influencer & sponsor collabs",
      "Paid ad campaigns",
      "Full digital amplification"
    ],
    popular: true,
    link: "/contact?service=tournament-promotion",
    id: "tournament"
  },
  {
    title: "Social Media for Brands",
    description:
      "A complete digital growth package — from posts and websites to ads and strategy — for your pickleball brand.",
    icon: <Instagram className="h-6 w-6" />,
    features: [
      "Content calendar & design",
      "Meta, Google & WhatsApp ads",
      "Website & landing pages",
      "Engagement & DMs handled",
      "Analytics & reporting"
    ],
    popular: false,
    link: "/contact?service=social-brands",
    id: "social"
  },
  {
    title: "Athlete Social Management",
    description:
      "We build your athlete brand online — you focus on your game, we manage your digital identity.",
    icon: <Users className="h-6 w-6" />,
    features: [
      "Athlete portfolio site",
      "Social reels & highlights",
      "Match-day coverage",
      "Posters & graphic kits",
      "Online branding strategy"
    ],
    popular: false,
    link: "/contact?service=athlete-social",
    id: "athlete"
  },
  {
    title: "Advertise with Pickleball Official",
    description:
      "Get your brand in front of Asia’s biggest pickleball community. Partner with us to grow your visibility.",
    icon: <BarChart className="h-6 w-6" />,
    features: [
      "Sponsored social posts",
      "Branded reels",
      "Story promotions",
      "Collaborations & giveaways",
      "Regional & global reach"
    ],
    popular: false,
    link: "/contact?service=advertise",
    id: "advertise"
  }
];


  return (
    <div className="min-h-screen flex flex-col" style={{marginTop:"50px",marginBottom:"-90px"}}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Our Services</h1>
            <p className="text-muted-foreground">
              We offer comprehensive digital marketing solutions tailored exclusively for 
              the pickleball community. From social media management to tournament promotion, 
              we've got you covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <div key={index} id={service.id}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                  popular={service.popular}
                  link={service.link}
                />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default ServicesPreview;
