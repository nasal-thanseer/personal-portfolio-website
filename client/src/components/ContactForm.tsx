import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Your name</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="John Doe" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-accent focus:border-accent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Email address</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="john@example.com" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-accent focus:border-accent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Subject</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Project inquiry" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-accent focus:border-accent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Message</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Tell me about your project..." 
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-accent focus:border-accent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-accent text-white hover:bg-accent/80"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </Button>
      </form>
    </Form>
  );
}
