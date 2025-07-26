import {
  ArrowRight,
  Video,
  Users,
  BarChart,
  Instagram
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  Button
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

// 🎯 Services Array
const SERVICES = [
  {
    id: "tournament",
    title: "Tournament Promotion",
    description:
      "From reels and content to campaigns and collaborations – we handle everything before, during, and after your tournament.",
    icon: <Video className="h-10 w-10 text-pickle" />,
    features: [
      "Pre, live & post-event coverage",
      "Reels & creative content",
      "Influencer & sponsor collabs",
      "Paid ad campaigns",
      "Full digital amplification"
    ],
    link: "/contact?service=tournament-promotion",
    popular: true
  },
  {
    id: "social",
    title: "Social Media for Brands",
    description:
      "A complete digital growth package — from posts and websites to ads and strategy — for your pickleball brand.",
    icon: <Instagram className="h-10 w-10 text-pickle" />,
    features: [
      "Content calendar & design",
      "Meta, Google & WhatsApp ads",
      "Website & landing pages",
      "Engagement & DMs handled",
      "Analytics & reporting"
    ],
    link: "/contact?service=social-brands",
    popular: false
  },
  {
    id: "athlete",
    title: "Athlete Social Management",
    description:
      "We build your athlete brand online — you focus on your game, we manage your digital identity.",
    icon: <Users className="h-10 w-10 text-pickle" />,
    features: [
      "Athlete portfolio site",
      "Social reels & highlights",
      "Match-day coverage",
      "Posters & graphic kits",
      "Online branding strategy"
    ],
    link: "/contact?service=athlete-social",
    popular: false
  },
  {
    id: "advertise",
    title: "Advertise with Pickleball Official",
    description:
      "Get your brand in front of Asia’s biggest pickleball community. Partner with us to grow your visibility.",
    icon: <BarChart className="h-10 w-10 text-pickle" />,
    features: [
      "Sponsored social posts",
      "Branded reels",
      "Story promotions",
      "Collaborations & giveaways",
      "Regional & global reach"
    ],
    link: "/contact?service=advertise",
    popular: false
  }
];

export function ServicesPreview() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
          for (let i = 0; i < SERVICES.length; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, i]);
            }, i * 200);
          }
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            Our Services
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-pickle rounded-full"></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            We offer comprehensive digital marketing solutions tailored exclusively for the pickleball community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <Card
              key={service.id}
              className={`transition-all duration-700 transform ${
                visibleItems.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              } hover:shadow-lg hover:shadow-pickle/10 hover:-translate-y-2 border-t-4 border-t-transparent hover:border-t-pickle`}
            >
              <CardHeader className="pb-2">
                <div className="mb-4 p-4 bg-pickle/10 rounded-full inline-block">
                  {service.icon}
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  {service.popular && (
                    <span className="text-xs bg-pickle text-white px-2 py-1 rounded-full font-semibold ml-2">
                      Popular
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  to={service.link}
                  className="text-pickle hover:text-pickle-dark text-sm font-medium inline-flex items-center group transition-all"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/services">
            <Button size="lg" className="bg-pickle hover:bg-pickle-dark btn-animated">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
