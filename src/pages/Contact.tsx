import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  HeadphonesIcon,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: [
        "123 Innovation Street",
        "Tech District, CA 94105",
        "United States",
      ],
      color: "text-primary",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+1 (555) 123-4567",
        "Mon-Fri: 8AM-8PM PST",
        "Sat-Sun: 9AM-6PM PST",
      ],
      color: "text-secondary",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "support@ridesharepro.com",
        "business@ridesharepro.com",
        "We reply within 24 hours",
      ],
      color: "text-success",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Emergency",
      details: [
        "+1 (555) 911-HELP",
        "Emergency support hotline",
        "Available round the clock",
      ],
      color: "text-accent",
    },
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: true,
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support representative",
      action: "Call Now",
      available: true,
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your inquiry",
      action: "Send Email",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white section-padding">
          <div className="container-width text-center">
            <h1 className="text-hero mb-6">
              Get In
              <br />
              <span className="text-secondary">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We're here to help! Reach out to us with any questions, concerns,
              or feedback. Our dedicated team is ready to assist you.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="card-feature text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-primary mb-4 ${info.color}`}
                  >
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-card-title mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Support Options */}
        <section className="section-padding bg-muted">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-fade-in-up">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Send us a Message
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium mb-2"
                          >
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            placeholder="Enter your first name"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium mb-2"
                          >
                            Last Name
                          </label>
                          <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-2"
                        >
                          Phone Number (Optional)
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium mb-2"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder="What's this about?"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                          className="w-full resize-none"
                        />
                      </div>

                      <Button className="btn-cta w-full">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Support Options */}
              <div className="space-y-8 animate-slide-in-right">
                <div>
                  <h2 className="text-section-title mb-6">
                    Need Immediate Help?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Choose from multiple support channels to get the help you
                    need, when you need it.
                  </p>
                </div>

                <div className="space-y-6">
                  {supportOptions.map((option, index) => (
                    <Card
                      key={index}
                      className="card-elevated hover:shadow-strong transition-all duration-300 cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gradient-primary rounded-lg flex-shrink-0">
                            <option.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-card-title mb-2">
                              {option.title}
                            </h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                              {option.description}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="btn-outline-primary"
                            >
                              {option.action}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Business Hours */}
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-secondary rounded-lg flex-shrink-0">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-card-title mb-3">Business Hours</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Monday - Friday:
                            </span>
                            <span className="font-medium">
                              8:00 AM - 8:00 PM PST
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Saturday - Sunday:
                            </span>
                            <span className="font-medium">
                              9:00 AM - 6:00 PM PST
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Emergency Support:
                            </span>
                            <span className="font-medium text-accent">
                              24/7 Available
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Office Location */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-section-title">Visit Our Office</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stop by our headquarters for in-person meetings or
                consultations.
              </p>
            </div>

            <div className="bg-muted rounded-radius-large p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="p-4 bg-gradient-primary rounded-lg inline-flex mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-card-title text-2xl mb-4">
                  RideShare Pro Headquarters
                </h3>
                <div className="space-y-2 text-muted-foreground mb-6">
                  <p>123 Innovation Street</p>
                  <p>Tech District, CA 94105</p>
                  <p>United States</p>
                </div>
                <Button className="btn-outline-primary">Get Directions</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
