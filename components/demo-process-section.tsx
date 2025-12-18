import React from "react";
import { ProcessSection } from "@/components/ui/how-we-do-it-process-overview";
import {
  BrainCircuit,
  Target,
  PenTool,
  Code,
  ShieldCheck,
  Megaphone,
} from "lucide-react";

// Demo component to showcase the ProcessSection
const ProcessSectionDemo = () => {
  const processItems = [
    {
      icon: BrainCircuit,
      title: "Brainstorming",
      description: "Ideas & Concepts",
    },
    {
      icon: Target,
      title: "Market Strategy",
      description: "Overall Planning",
    },
    {
      icon: PenTool,
      title: "Product Design",
      description: "UI/UX & Prototyping",
    },
    {
      icon: Code,
      title: "Development",
      description: "Full-Stack Engineering",
    },
    {
      icon: ShieldCheck,
      title: "Testing & QA",
      description: "Quality Assurance",
    },
    {
      icon: Megaphone,
      title: "Release & Marketing",
      description: "Launch Campaign",
    },
  ];

  return (
    <div className="w-full">
      <ProcessSection
        subtitle="Our Model"
        title="How We Do It"
        description="We work on a typical matrix of time, effort, and money, following Agile methodologies to deliver exceptional results."
        items={processItems}
      />
    </div>
  );
};

export default ProcessSectionDemo;
