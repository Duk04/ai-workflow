'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { createLead } from "@/actions/create-lead";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    
    try {
      const result = await createLead(formData);
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Холбоо барих</h2>
            <p className="text-muted-foreground">
              Бидэнтэй холбогдож бизнесээ автоматжуулж эхлээрэй.
            </p>
          </div>

          <div className="bg-background p-8 rounded-2xl shadow-sm border">
            {success ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Амжилттай илгээгдлээ!</h3>
                <p className="text-muted-foreground">
                  Таны хүсэлтийг хүлээн авлаа. Бид тантай удахгүй холбогдоно.
                </p>
                <Button 
                    className="mt-6" 
                    variant="outline" 
                    onClick={() => setSuccess(false)}
                >
                    Дахин илгээх
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Таны нэр</Label>
                  <Input name="name" id="name" placeholder="Дорж Бат" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessName">Бизнесийн нэр</Label>
                  <Input name="businessName" id="businessName" placeholder="Tech Startup LLC" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Утас эсвэл Email</Label>
                  <Input name="contact" id="contact" placeholder="88889999 / user@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Мессеж</Label>
                  <Textarea name="message" id="message" placeholder="Бидэнд юу хэрэгтэй байгаагаа бичнэ үү..." className="min-h-[120px]" required />
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                        {error}
                    </div>
                )}
                
                <Button type="submit" className="w-full h-11" disabled={loading}>
                  {loading ? "Илгээж байна..." : "Илгээх"}
                </Button>
              </form>
            )}

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Эсвэл шууд чатлах
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11 gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              Messenger-ээр бичих
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
