
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactItem = ({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) => (
  <div className="flex items-start space-x-3">
    <div className="p-2 bg-secondary rounded-md mt-1">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-sm mb-1">{title}</h4>
      <p className="text-muted-foreground">{content}</p>
    </div>
  </div>
);

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            We'd love to <span className="text-gradient">hear</span> from you
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have questions about our products or philosophy? We're here to help and listen to your feedback.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3 glass-card rounded-xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 rounded-md border border-border bg-background/80 focus:outline-none focus:ring-1 focus:ring-accent transition-all" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 rounded-md border border-border bg-background/80 focus:outline-none focus:ring-1 focus:ring-accent transition-all" 
                    required 
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-2 rounded-md border border-border bg-background/80 focus:outline-none focus:ring-1 focus:ring-accent transition-all" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-4 py-2 rounded-md border border-border bg-background/80 focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none" 
                  required
                ></textarea>
              </div>
              
              <div>
                <CustomButton variant="gradient" size="lg" className="w-full sm:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </CustomButton>
              </div>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-8">
            <ContactItem 
              icon={<Mail className="h-5 w-5 text-accent" />} 
              title="Email" 
              content="hello@essence.com" 
            />
            <ContactItem 
              icon={<Phone className="h-5 w-5 text-accent" />} 
              title="Phone" 
              content="+1 (555) 123-4567" 
            />
            <ContactItem 
              icon={<MapPin className="h-5 w-5 text-accent" />} 
              title="Location" 
              content="123 Design Street, San Francisco, CA 94103" 
            />
            
            <div className="pt-6">
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['twitter', 'instagram', 'linkedin', 'facebook'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="p-2 rounded-md bg-secondary hover:bg-accent/10 transition-colors" 
                    aria-label={social}
                  >
                    <span className="capitalize">{social.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
