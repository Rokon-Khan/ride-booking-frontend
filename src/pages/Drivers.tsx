import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Car,
  Clock,
  DollarSign,
  HeadphonesIcon,
  MapPin,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router";

const Drivers = () => {
  const driverFeatures = [
    {
      icon: DollarSign,
      title: "Flexible Earnings",
      description:
        "Earn money on your schedule. Drive when you want, as much as you want.",
    },
    {
      icon: Clock,
      title: "Work Your Hours",
      description:
        "Set your own schedule. Work full-time, part-time, or just weekends.",
    },
    {
      icon: Smartphone,
      title: "Easy-to-Use App",
      description:
        "Simple driver app with navigation, earnings tracking, and ride management.",
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description:
        "Drive with confidence knowing you're covered with our insurance policy.",
    },
    {
      icon: TrendingUp,
      title: "Weekly Payouts",
      description:
        "Get paid weekly with direct bank transfer. Track your earnings in real-time.",
    },
    {
      icon: Users,
      title: "Driver Community",
      description:
        "Join a supportive community of drivers with tips, support, and networking.",
    },
  ];

  const earningsBreakdown = [
    {
      category: "Base Fare",
      amount: "৳25-40",
      description: "Starting fare for each trip",
    },
    {
      category: "Per Kilometer",
      amount: "৳8-15",
      description: "Earnings per kilometer driven",
    },
    {
      category: "Time Rate",
      amount: "৳2-5/min",
      description: "Earnings during waiting time",
    },
    {
      category: "Peak Hours Bonus",
      amount: "+20-50%",
      description: "Extra earnings during high demand",
    },
  ];

  const requirements = [
    {
      icon: Car,
      title: "Vehicle Requirements",
      items: [
        "Car model 2010 or newer",
        "Valid registration documents",
        "Comprehensive insurance",
        "Regular maintenance records",
      ],
    },
    {
      icon: Users,
      title: "Driver Requirements",
      items: [
        "Valid driving license (3+ years)",
        "Clean driving record",
        "Age 21-65 years",
        "Background verification",
      ],
    },
    {
      icon: Smartphone,
      title: "Technical Requirements",
      items: [
        "Smartphone with GPS",
        "Reliable internet connection",
        "RideShare Pro driver app",
        "Basic smartphone skills",
      ],
    },
  ];

  const supportFeatures = [
    {
      icon: HeadphonesIcon,
      title: "24/7 Driver Support",
      description: "Get help anytime with our dedicated driver support team.",
    },
    {
      icon: BarChart3,
      title: "Earnings Analytics",
      description:
        "Track your performance with detailed earnings and trip analytics.",
    },
    {
      icon: MapPin,
      title: "Smart Navigation",
      description:
        "Built-in GPS navigation with traffic updates and optimal routes.",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description:
        "Get notified instantly about new ride requests and updates.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Drive & Earn with RideShare Pro
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Turn your car into a source of income. Join thousands of drivers
                earning flexible income on their own schedule.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-primary"
                  asChild
                >
                  <Link to="/signup">Start Driving</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm">
                <div>
                  <div className="text-2xl font-bold">৳15,000+</div>
                  <div className="text-white/80">Average Monthly Earnings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">5,000+</div>
                  <div className="text-white/80">Active Drivers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop"
                alt="Happy driver with car"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Drive with Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enjoy the freedom and flexibility of being your own boss while
              earning good money.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {driverFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Earnings Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Much Can You Earn?</h2>
            <p className="text-muted-foreground">
              Your earnings depend on when, where, and how often you drive
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {earningsBreakdown.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{item.category}</CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    {item.amount}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-primary/10 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-2">
                Potential Weekly Earnings
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">৳3,500</div>
                  <div className="text-sm text-muted-foreground">
                    Part-time (15 hrs/week)
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">৳7,000</div>
                  <div className="text-sm text-muted-foreground">
                    Regular (30 hrs/week)
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">৳12,000</div>
                  <div className="text-sm text-muted-foreground">
                    Full-time (50 hrs/week)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Driver Requirements</h2>
            <p className="text-muted-foreground">
              Make sure you meet these requirements before applying
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {requirements.map((req, index) => {
              const Icon = req.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>{req.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {req.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Features */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">We Support Our Drivers</h2>
            <p className="text-muted-foreground">
              Get the tools and support you need to succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Get Started</h2>
            <p className="text-muted-foreground">
              Start earning in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-muted-foreground text-sm">
                Create your driver account and submit required documents.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Get Approved</h3>
              <p className="text-muted-foreground text-sm">
                We'll review your application and verify your documents.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Download App</h3>
              <p className="text-muted-foreground text-sm">
                Download the driver app and complete your profile setup.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Start Driving</h3>
              <p className="text-muted-foreground text-sm">
                Go online and start accepting ride requests to earn money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of successful drivers and start earning money on
            your own terms today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-primary"
              asChild
            >
              <Link to="/signup">Apply to Drive</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link to="/contact">Have Questions?</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Drivers;
