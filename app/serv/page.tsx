import { Bot, MessageSquare, ShoppingBag, Zap } from "lucide-react";
import { ProcessSection } from "@/components/ui/how-we-do-it-process-overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    icon: MessageSquare,
    title: "Facebook & Instagram автомат хариу",
    description:
      "Коммент болон inbox-д шууд хариулна. Хэрэглэгчээ хүлээлгэхгүй.",
  },
  {
    icon: ShoppingBag,
    title: "Messenger захиалгын bot",
    description: "Бүтээгдэхүүн танилцуулж, захиалга авах бүрэн автомат систем.",
  },
  {
    icon: Bot,
    title: "AI customer support chatbot",
    description:
      "Түгээмэл асуултад (FAQ) хариулж, 24/7 туслах үйлчилгээ үзүүлнэ.",
  },
  {
    icon: Zap,
    title: "Харилцагчийн мэдээлэл цуглуулах систем",
    description: "Утасны дугаар, email цуглуулж борлуулалтын сэжмээ үүсгэнэ.",
  },
];

export default function Services() {
  const processItems = [
    {
      icon: Bot,
      title: "Facebook & Instagram автомат хариу",
      description:
        "Коммент болон inbox-д шууд хариулна. Хэрэглэгчээ хүлээлгэхгүй.",
    },
    {
      icon: MessageSquare,
      title: "Messenger захиалгын bot",
      description:
        "Бүтээгдэхүүн танилцуулж, захиалга авах бүрэн автомат систем.",
    },
    {
      icon: ShoppingBag,
      title: "AI customer support chatbot",
      description:
        "Түгээмэл асуултад (FAQ) хариулж, 24/7 туслах үйлчилгээ үзүүлнэ.",
    },
    {
      icon: Zap,
      title: "Харилцагчийн мэдээлэл цуглуулах систем",
      description: "Утасны дугаар, email цуглуулж борлуулалтын сэжмээ үүсгэнэ.",
    },
  ];

  return (
    <>
      <ProcessSection
        subtitle="Бидний үйлчилгээ"
        title="Сошиал сувгуудаа бүрэн автоматжуулах шийдлүүд."
        description=""
        items={processItems}
      />
    </>
  );
}
