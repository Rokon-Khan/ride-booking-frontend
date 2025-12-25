import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  CreditCard,
  HelpCircle,
  Search,
  Shield,
  Users,
} from "lucide-react";

const FAQ = () => {
  const categories = [
    {
      icon: Users,
      title: "Getting Started",
      color: "text-primary",
      faqs: [
        {
          question: "How do I create an account?",
          answer:
            "Creating an account is easy! Simply download our app or visit our website, click 'Sign Up', and fill in your basic information. You'll need to verify your email address and phone number to complete the registration process.",
        },
        {
          question: "What information do I need to provide?",
          answer:
            "For riders, you'll need your name, email, phone number, and a payment method. For drivers, additional requirements include a valid driver's license, vehicle registration, insurance, and a background check.",
        },
        {
          question: "Is RideShare Pro available in my city?",
          answer:
            "We currently operate in over 100 cities worldwide. You can check availability by entering your location in our app or on our website. We're constantly expanding to new markets!",
        },
      ],
    },
    {
      icon: BookOpen,
      title: "Booking & Rides",
      color: "text-secondary",
      faqs: [
        {
          question: "How do I book a ride?",
          answer:
            "Open the app, enter your pickup and destination addresses, choose your preferred ride type, and tap 'Confirm Booking'. You'll be matched with a nearby driver and can track their arrival in real-time.",
        },
        {
          question: "Can I schedule a ride for later?",
          answer:
            "Yes! You can schedule rides up to 7 days in advance. When booking, select 'Schedule for Later' and choose your preferred pickup time. We'll automatically assign a driver closer to your scheduled time.",
        },
        {
          question: "What if my driver cancels?",
          answer:
            "If your driver cancels, we'll immediately search for another available driver in your area. You'll receive a notification about the new driver and updated arrival time. There's no additional charge for driver cancellations.",
        },
        {
          question: "Can I change my destination during the ride?",
          answer:
            "Yes, you can add or change your destination during the ride through the app. The fare will be automatically updated based on the new route. Please inform your driver about any changes for safety reasons.",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Payments & Pricing",
      color: "text-success",
      faqs: [
        {
          question: "How is the fare calculated?",
          answer:
            "Fares are calculated based on distance, time, and local market rates. You'll see an upfront price estimate before booking, and the final fare includes all costs except tips. Dynamic pricing may apply during high-demand periods.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, and digital wallets. You can also use ride credits or promotional codes. Cash payments are available in select markets.",
        },
        {
          question: "Can I get a receipt for my ride?",
          answer:
            "Yes! Digital receipts are automatically sent to your email after each ride. You can also access all your ride history and receipts in the app under 'My Trips' section.",
        },
        {
          question: "What about surge pricing?",
          answer:
            "During high-demand periods (like rush hour or events), surge pricing may apply to ensure driver availability. You'll always see the surge multiplier before booking and can choose to wait for regular pricing.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Safety & Security",
      color: "text-accent",
      faqs: [
        {
          question: "How do you ensure rider safety?",
          answer:
            "We prioritize safety through driver background checks, real-time trip tracking, in-app emergency features, driver and vehicle verification, and 24/7 safety support. You can also share your trip details with trusted contacts.",
        },
        {
          question: "What should I do if I feel unsafe?",
          answer:
            "Your safety is our priority. Use the emergency button in the app to contact local authorities, call our 24/7 safety hotline, or use the 'Share Trip' feature. We also have in-app tools to report safety concerns.",
        },
        {
          question: "How are drivers screened?",
          answer:
            "All drivers undergo comprehensive background checks including criminal history, driving record review, vehicle inspection, and identity verification. We continuously monitor driver performance and conduct regular re-screenings.",
        },
        {
          question: "What is your policy on lost items?",
          answer:
            "If you leave something in a vehicle, contact us through the app's 'Lost Item' feature. We'll connect you with your driver to arrange return. A small return fee may apply to compensate the driver for their time.",
        },
      ],
    },
  ];

  const quickHelp = [
    {
      title: "Account Issues",
      description: "Problems with login, password, or profile settings",
      action: "Get Help",
    },
    {
      title: "Billing Questions",
      description: "Questions about charges, refunds, or payment methods",
      action: "Contact Support",
    },
    {
      title: "Technical Issues",
      description: "App crashes, bugs, or technical difficulties",
      action: "Report Issue",
    },
    {
      title: "Driver/Rider Concerns",
      description: "Issues with service quality or behavior",
      action: "File Report",
    },
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white section-padding">
          <div className="container-width text-center">
            <h1 className="text-hero text-white mb-6">
              How Can We
              <br />
              <span className="text-secondary">Help You?</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Find answers to common questions about RideShare Pro. Can't find
              what you're looking for? Contact our support team.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for answers..."
                  className="pl-12 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Help */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-section-title">Need Quick Help?</h2>
              <p className="text-lg text-muted-foreground">
                Select a category for immediate assistance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {quickHelp.map((item, index) => (
                <Card
                  key={index}
                  className="card-elevated hover:shadow-strong transition-all duration-300 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-gradient-primary rounded-lg inline-flex mb-4">
                      <HelpCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-card-title mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                    <span className="text-primary font-medium text-sm hover:underline">
                      {item.action} →
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="section-padding bg-muted">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-section-title">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Browse our comprehensive FAQ organized by category
              </p>
            </div>

            <div className="space-y-12">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`p-3 bg-gradient-primary rounded-lg ${category.color}`}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <Accordion
                        type="single"
                        collapsible
                        className="space-y-2"
                      >
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem
                            key={faqIndex}
                            value={`${categoryIndex}-${faqIndex}`}
                            className="border border-border rounded-lg px-4"
                          >
                            <AccordionTrigger className="text-left font-medium hover:no-underline hover:text-primary">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <Card className="card-elevated">
              <CardContent className="p-12 text-center">
                <div className="p-4 bg-gradient-primary rounded-lg inline-flex mb-6">
                  <HelpCircle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Still Need Help?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Can't find the answer you're looking for? Our friendly support
                  team is here to help. Contact us through live chat, email, or
                  phone for personalized assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-cta px-8 py-3">Contact Support</button>
                  <button className="btn-outline-primary px-8 py-3">
                    Live Chat
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FAQ;
