import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bot, Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Bot className="h-6 w-6 text-primary" />
          <span>AI Turbo</span>
        </Link>

        {/* Desktop Menu - Hidden on mobile for now, can be added if needed */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/social" className="hover:text-primary transition-colors">
            Social
          </Link>
          <Link
            href="/problems"
            className="hover:text-primary transition-colors"
          >
            Яагаад биднийг сонгох вэ?
          </Link>
          <Link href="/serv" className="hover:text-primary transition-colors">
            Үйлчилгээ
          </Link>
          <Link
            href="/how-it-works"
            className="hover:text-primary transition-colors"
          >
            Хэрхэн ажилладаг вэ
          </Link>
          <Link
            href="/pricing"
            className="hover:text-primary transition-colors"
          >
            Үнэ тариф
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[360px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="px-4 pb-6 flex flex-col gap-2">
                  <SheetClose asChild>
                    <Link href="/social" className="py-2 text-sm font-medium">
                      Social
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/problems" className="py-2 text-sm font-medium">
                      Яагаад биднийг сонгох вэ?
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/serv" className="py-2 text-sm font-medium">
                      Үйлчилгээ
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/how-it-works"
                      className="py-2 text-sm font-medium"
                    >
                      Хэрхэн ажилладаг вэ
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/pricing" className="py-2 text-sm font-medium">
                      Үнэ тариф
                    </Link>
                  </SheetClose>

                  <div className="mt-4 grid gap-2">
                    <SheetClose asChild>
                      <Button variant="outline">Нэвтрэх</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button>Эхлэх</Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="#contact" className="hidden sm:block">
            <Button variant="ghost">Нэвтрэх</Button>
          </Link>
          <Button>Эхлэх</Button>
        </div>
      </div>
    </nav>
  );
}
