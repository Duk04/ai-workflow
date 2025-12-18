import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "₮150,000",
    description: "Жижиг бизнесүүдэд тохиромжтой.",
    features: [
      "Facebook Auto Reply",
      "Basic FAQ Bot",
      "Сард 1,000 мессеж",
      "Email Support",
    ],
  },
  {
    name: "Business",
    price: "₮350,000",
    description: "Өсөж буй бизнесүүдэд.",
    popular: true,
    features: [
      "FB & Instagram Auto Reply",
      "Борлуулалт & Захиалгын Bot",
      "Сард 10,000 мессеж",
      "Priority Support",
      "Сар бүрийн тайлан",
    ],
  },
  {
    name: "AI Pro",
    price: "Custom",
    description: "Томоохон байгууллагуудад.",
    features: [
      "Custom AI сургалт",
      "CRM системтэй холболт",
      "Хязгааргүй мессеж",
      "Тусгай менежер",
      "24/7 Утасны дэмжлэг",
    ],
  },
];

function Pricing() {
  return (
    <div className="w-full py-20 lg:py-20">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge>Үнийн санал</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              Үнийн санал
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Таны хэрэгцээнд тохирох багцыг сонгоорой.
            </p>
          </div>
          <div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`w-full rounded-md ${
                  plan.popular ? "shadow-2xl" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>
                    <span className="flex flex-row gap-4 items-center font-normal">
                      {plan.name}
                    </span>
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-8 justify-start">
                    <p className="flex flex-row items-center gap-2 text-xl">
                      <span className="text-4xl">{plan.price}</span>
                      {plan.price !== "Custom" && (
                        <span className="text-sm text-muted-foreground">
                          /сар
                        </span>
                      )}
                    </p>
                    <div className="flex flex-col gap-4 justify-start">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex flex-row gap-4">
                          <Check className="w-4 h-4 mt-1.5 text-primary" />
                          <p>{feature}</p>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="gap-4"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Сонгох
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Pricing };
