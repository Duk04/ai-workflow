import { EditorialTestimonial } from "@/components/ui/editorial-testimonial";

const problems = [
  {
    iconName: "clock" as const,
    title: "Inbox-д хариу удаан өгдөг",
    description: "Хэрэглэгч хүлээх дургүй. Удаан хариулт = Алдсан захиалга.",
  },
  {
    iconName: "x-circle" as const,
    title: "Захиалга алдагддаг",
    description: "Олон чат дунд захиалга орхигдох эрсдэлтэй.",
  },
  {
    iconName: "users" as const,
    title: "Ажилтны ачаалал их",
    description: "Давтагдсан асуултад хариулах нь цаг их үрдэг.",
  },
  {
    iconName: "alert-triangle" as const,
    title: "Автомат систем байхгүй",
    description: "Хүний нөөцөөс хамааралтай бизнес удаашралтай байдаг.",
  },
];

export default function Problems() {
  return (
    <section id="problems" className="py-20 bg-muted/30 ">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Бизнест тулгардаг асуудлууд
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Танай бизнест эдгээр асуудлууд тулгарч байна уу?
          </p>
        </div>

        <EditorialTestimonial
          items={problems.map((p) => ({
            id: p.title,
            quote: p.description,
            author: p.title,
            iconName: p.iconName,
          }))}
        />
      </div>
    </section>
  );
}
