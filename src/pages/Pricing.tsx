import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  Clock,
  CreditCard,
  MapPin,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Standard",
      description: "Perfect for occasional rides",
      price: "Standard Rates",
      features: [
        "Base fare + distance & time",
        "Standard vehicle options",
        "Basic customer support",
        "Standard pickup times",
        "Credit card payments",
        "Trip history & receipts",
      ],
      popular: false,
      color: "border-border",
    },
    {
      name: "RidePro",
      description: "Best value for regular riders",
      price: "10% Discount",
      monthlyFee: "$9.99/month",
      features: [
        "10% off all rides",
        "Priority driver matching",
        "Premium vehicle options",
        "24/7 priority support",
        "Faster pickup times",
        "Multiple payment methods",
        "Trip planning & scheduling",
        "Exclusive promotions",
      ],
      popular: true,
      color: "border-primary",
    },
    {
      name: "Business",
      description: "For teams and companies",
      price: "Custom Pricing",
      features: [
        "Volume discounts available",
        "Business account management",
        "Employee ride programs",
        "Detailed reporting & analytics",
        "Dedicated account manager",
        "Corporate billing",
        "Expense management tools",
        "API integration available",
      ],
      popular: false,
      color: "border-secondary",
    },
  ];

  const rideTypes = [
    {
      name: "Economy",
      description: "Affordable rides for everyday trips",
      baseRate: "$1.50",
      perMile: "$0.85",
      perMinute: "$0.15",
      icon: Users,
      seats: "4 seats",
    },
    {
      name: "Comfort",
      description: "More space and newer vehicles",
      baseRate: "$2.50",
      perMile: "$1.25",
      perMinute: "$0.25",
      icon: Star,
      seats: "4 seats",
    },
    {
      name: "Premium",
      description: "Luxury vehicles with top-rated drivers",
      baseRate: "$4.00",
      perMile: "$2.00",
      perMinute: "$0.35",
      icon: Zap,
      seats: "4 seats",
    },
    {
      name: "XL",
      description: "Larger vehicles for groups",
      baseRate: "$3.00",
      perMile: "$1.50",
      perMinute: "$0.30",
      icon: Users,
      seats: "6-8 seats",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Safety Guaranteed",
      description:
        "All rides include comprehensive insurance coverage and 24/7 safety monitoring.",
    },
    {
      icon: Clock,
      title: "No Hidden Fees",
      description:
        "Transparent pricing with upfront fare estimates. What you see is what you pay.",
    },
    {
      icon: MapPin,
      title: "Dynamic Pricing",
      description:
        "Fair pricing that adjusts based on demand to ensure driver availability when you need it.",
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description:
        "Multiple payment options including cards, digital wallets, and ride credits.",
    },
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white section-padding">
          <div className="container-width text-center">
            <h1 className="text-hero text-white mb-6">
              Simple, Transparent
              <br />
              <span className="text-secondary">Pricing</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Choose the plan that works best for you. No surprises, no hidden
              fees, just reliable transportation at fair prices.
            </p>
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-section-title">Choose Your Plan</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select from our flexible pricing options designed to fit every
                lifestyle and budget.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`card-elevated relative ${plan.color} ${
                    plan.popular ? "border-2 shadow-glow" : ""
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <div className="pt-4">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {plan.price}
                      </div>
                      {plan.monthlyFee && (
                        <div className="text-sm text-muted-foreground">
                          {plan.monthlyFee}
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular ? "btn-cta" : "btn-outline-primary"
                      }`}
                    >
                      {plan.name === "Business"
                        ? "Contact Sales"
                        : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ride Types & Rates */}
        <section className="section-padding bg-muted">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-section-title">Ride Types & Rates</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Different vehicles for different needs. All prices shown are
                base rates before any applicable promotions or surge pricing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rideTypes.map((type, index) => (
                <Card
                  key={index}
                  className="card-elevated animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-primary rounded-lg">
                        <type.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-card-title">{type.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {type.seats}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4">
                      {type.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Base Rate:
                        </span>
                        <span className="font-medium">{type.baseRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Per Mile:</span>
                        <span className="font-medium">{type.perMile}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Per Minute:
                        </span>
                        <span className="font-medium">{type.perMinute}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Features */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-section-title">What's Included</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every ride comes with these standard features and protections.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-4 bg-gradient-primary rounded-lg inline-flex mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-card-title mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Calculator */}
        <section className="section-padding bg-muted">
          <div className="container-width">
            <Card className="card-elevated max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Estimate Your Ride Cost
                </CardTitle>
                <p className="text-muted-foreground text-center">
                  Get an approximate fare estimate for your next trip.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Short Trip</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      2-5 miles, 10-15 minutes
                    </p>
                    <div className="text-2xl font-bold text-primary">$6-12</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Medium Trip</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      5-15 miles, 15-30 minutes
                    </p>
                    <div className="text-2xl font-bold text-secondary">
                      $12-25
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Long Trip</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      15+ miles, 30+ minutes
                    </p>
                    <div className="text-2xl font-bold text-success">$25+</div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    * Estimates exclude surge pricing and tolls. Actual fares
                    may vary based on traffic, route, and local market
                    conditions.
                  </p>
                  <Button className="btn-cta">Get Exact Estimate</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <Card className="card-elevated">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ready to Start Riding?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join millions of satisfied customers who trust RideShare Pro
                  for their transportation needs. Sign up today and get your
                  first ride free!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-cta px-8 py-4 text-lg">
                    Sign Up Now
                  </Button>
                  <Button
                    variant="outline"
                    className="btn-outline-primary px-8 py-4 text-lg"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Pricing;
