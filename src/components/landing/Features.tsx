import featuresImage from "@/assets/Features-Showcase.png";
import { Clock, CreditCard, MapPin, Shield, Star, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description:
        "Track your ride in real-time with live GPS updates and driver location sharing.",
      color: "text-primary",
    },
    {
      icon: Clock,
      title: "Quick Booking",
      description:
        "Book a ride in seconds with our intuitive interface and instant driver matching.",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Background-checked drivers, trip sharing, and 24/7 emergency support for your safety.",
      color: "text-success",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description:
        "Multiple payment options with secure, cashless transactions and transparent pricing.",
      color: "text-accent",
    },
    {
      icon: Star,
      title: "Quality Service",
      description:
        "Rated drivers and riders ensure high-quality service and reliable experiences.",
      color: "text-warning",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Join thousands of satisfied riders and drivers in our growing community.",
      color: "text-primary",
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-section-title">Why Choose RideShare Pro?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of transportation with our cutting-edge
            features designed for riders, drivers, and administrators.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="card-feature group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-primary text-white shadow-medium group-hover:shadow-strong transition-all duration-300`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-card-title group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              Built for Everyone
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    For Riders
                  </h4>
                  <p className="text-muted-foreground">
                    Easy booking, real-time tracking, secure payments, and
                    emergency features.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Star className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    For Drivers
                  </h4>
                  <p className="text-muted-foreground">
                    Flexible earning opportunities, analytics dashboard, and
                    rider management tools.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    For Admins
                  </h4>
                  <p className="text-muted-foreground">
                    Complete platform management, analytics, user oversight, and
                    system control.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <div className="relative">
              <img
                src={featuresImage}
                alt="RideShare Pro features showcase"
                className="rounded-t-2xl shadow-strong w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-radius-large"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
