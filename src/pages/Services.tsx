import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const services = [
  { name: "Photographer", key: "photographer" },
  { name: "Videographer", key: "videographer" },
  { name: "Social Media Package", key: "socialMedia" },
];

export const ServiceCalculator = () => {
  const [days, setDays] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (key: string) => {
    setSelectedServices((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const calculateCost = () => {
    let total = 0;
    selectedServices.forEach(() => {
      total += 300 + Math.max(0, days - 1) * 200;
    });
    return total;
  };

  return (
    <Card className="p-6 space-y-6 shadow-lg border rounded-xl bg-white">
      <div>
        <Label htmlFor="days" className="block mb-2 font-medium text-lg">
          Number of Days
        </Label>
        <Input
          id="days"
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="w-24"
        />
      </div>

      <div>
        <h3 className="font-medium text-lg mb-3">Select Services</h3>
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.key} className="flex items-center space-x-3">
              <Checkbox
                id={service.key}
                checked={selectedServices.includes(service.key)}
                onCheckedChange={() => toggleService(service.key)}
              />
              <Label htmlFor={service.key}>{service.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xl font-semibold">
        Estimated Cost: ${calculateCost()}
      </div>
    </Card>
  );
};
