import { useState, useEffect } from "react";
import { Calculator, Camera, Video, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingItem {
  label: string;
  total: number;
}

export function ServiceCalculator() {
  const { toast } = useToast();
  const [eventType, setEventType] = useState("tournament");
  const [eventDuration, setEventDuration] = useState<number[]>([1]);
  const [photographers, setPhotographers] = useState(1);
  const [videographers, setVideographers] = useState(1);
  const [socialMediaPackage, setSocialMediaPackage] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [breakdown, setBreakdown] = useState<PricingItem[]>([]);

  const RATES = {
    photographer: { firstDay: 300, extraDay: 200 },
    videographer: { firstDay: 300, extraDay: 200 },
    socialMedia: { firstDay: 300, extraDay: 200 },
  };

  useEffect(() => {
    const days = eventDuration[0];
    const items: PricingItem[] = [];

    const calculateCost = (
      count: number,
      rate: { firstDay: number; extraDay: number }
    ) => count * (rate.firstDay + (days - 1) * rate.extraDay);

    if (photographers > 0) {
      const total = calculateCost(photographers, RATES.photographer);
      items.push({
        label: `${photographers} Photographer${
          photographers > 1 ? "s" : ""
        } for ${days} day${days > 1 ? "s" : ""}`,
        total,
      });
    }

    if (videographers > 0) {
      const total = calculateCost(videographers, RATES.videographer);
      items.push({
        label: `${videographers} Videographer${
          videographers > 1 ? "s" : ""
        } for ${days} day${days > 1 ? "s" : ""}`,
        total,
      });
    }

    if (socialMediaPackage) {
      const total =
        RATES.socialMedia.firstDay + (days - 1) * RATES.socialMedia.extraDay;
      items.push({
        label: `Social Media Package for ${days} day${days > 1 ? "s" : ""}`,
        total,
      });
    }

    const total = items.reduce((sum, item) => sum + item.total, 0);
    setBreakdown(items);
    setEstimatedCost(total);
  }, [
    eventDuration,
    photographers,
    videographers,
    socialMediaPackage,
  ]);

  const handleRequest = () => {
    toast({
      title: "Service Request Sent",
      description: "We'll get back to you shortly with a detailed quote.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-pickle" />
          <CardTitle>Service Cost Estimator</CardTitle>
        </div>
        <CardDescription>
          Calculate an estimate for your pickleball marketing needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="event-duration">Event Duration (Days)</Label>
            <span className="text-sm font-medium">
              {eventDuration[0]} day{eventDuration[0] > 1 ? "s" : ""}
            </span>
          </div>
          <Slider
            id="event-duration"
            defaultValue={[1]}
            max={7}
            step={1}
            onValueChange={setEventDuration}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photographer */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-pickle" />
              <Label htmlFor="photographers">Number of Photographers</Label>
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPhotographers(Math.max(0, photographers - 1))}
              >
                -
              </Button>
              <Input
                id="photographers"
                type="number"
                min={0}
                max={5}
                value={photographers}
                onChange={(e) => setPhotographers(Number(e.target.value))}
                className="w-16 text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPhotographers(Math.min(5, photographers + 1))}
              >
                +
              </Button>
            </div>
          </div>

          {/* Videographer */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-pickle" />
              <Label htmlFor="videographers">Number of Videographers</Label>
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setVideographers(Math.max(0, videographers - 1))}
              >
                -
              </Button>
              <Input
                id="videographers"
                type="number"
                min={0}
                max={5}
                value={videographers}
                onChange={(e) => setVideographers(Number(e.target.value))}
                className="w-16 text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setVideographers(Math.min(5, videographers + 1))}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="social-media"
            checked={socialMediaPackage}
            onCheckedChange={(checked) => setSocialMediaPackage(!!checked)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="social-media"
              className="text-sm font-medium leading-none"
            >
              Social Media Package
            </label>
            <p className="text-sm text-muted-foreground">
              Includes daily coverage, story creation, and post-event highlights
            </p>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Info className="h-4 w-4 text-pickle" />
            Estimated Cost Breakdown
          </h3>

          {breakdown.length > 0 ? (
            <div className="space-y-2">
              {breakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">
                    ${item.total.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-4 pt-4 border-t border-border">
                <span>Total Estimated Cost</span>
                <span className="text-pickle text-lg">
                  ${estimatedCost.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This is an estimate. Final pricing may vary based on specific
                needs and location.
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Select services above to view cost breakdown.
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setEventType("tournament");
            setEventDuration([1]);
            setPhotographers(1);
            setVideographers(1);
            setSocialMediaPackage(false);
          }}
        >
          Reset
        </Button>

        {/* Uncomment this if you want a quote request button */}
        {/* <Button className="bg-pickle hover:bg-pickle-dark" onClick={handleRequest}>
          Request Detailed Quote
        </Button> */}
      </CardFooter>
    </Card>
  );
}
