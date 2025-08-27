import {
  Clock,
  HeadphonesIcon,
  MapPin,
  Shield,
  Smartphone,
  Star,
  Users,
  Zap,
} from "lucide-react";

import featuresImage from "@/assets/Features-Showcase.png";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description:
        "Track your ride in real-time with GPS precision. Know exactly where your driver is and when they'll arrive.",
      color: "text-primary",
    },
    {
      icon: Clock,
      title: "Quick Booking",
      description:
        "Book a ride in seconds with our intuitive interface. Schedule rides for later or get one immediately.",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Verified drivers, secure payments, and 24/7 safety monitoring ensure your peace of mind.",
      color: "text-success",
    },
    {
      icon: Users,
      title: "Ride Sharing",
      description:
        "Share rides with others going your way and save money while reducing environmental impact.",
      color: "text-accent",
    },
    {
      icon: Star,
      title: "Quality Drivers",
      description:
        "All drivers are background-checked and rated by passengers for guaranteed quality service.",
      color: "text-warning",
    },
    {
      icon: Zap,
      title: "Instant Payments",
      description:
        "Seamless cashless payments with automatic billing and digital receipts.",
      color: "text-primary",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you whenever you need help.",
      color: "text-secondary",
    },
    {
      icon: Smartphone,
      title: "Smart App",
      description:
        "Intuitive mobile app with advanced features like route optimization and fare estimation.",
      color: "text-success",
    },
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white section-padding">
          <div className="container-width text-center">
            <h1 className="text-hero mb-6">
              Features That Make Us
              <br />
              <span className="text-secondary">Different</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Discover the advanced features and capabilities that make
              RideShare Pro the preferred choice for millions of riders and
              drivers worldwide.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-section-title">Everything You Need</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive platform offers cutting-edge features designed
                to make your transportation experience seamless, safe, and
                enjoyable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card-feature group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-primary mb-4 ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-card-title">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="section-padding bg-muted">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-section-title mb-6">Built for Everyone</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-primary rounded-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-card-title">For Riders</h3>
                      <p className="text-muted-foreground">
                        Easy booking, transparent pricing, and reliable rides
                        whenever you need them. Track your driver, share your
                        trip, and pay seamlessly.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-secondary rounded-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-card-title">For Drivers</h3>
                      <p className="text-muted-foreground">
                        Flexible earning opportunities with optimized routes,
                        instant payments, and comprehensive driver support
                        tools.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-hero rounded-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-card-title">For Administrators</h3>
                      <p className="text-muted-foreground">
                        Powerful dashboard with analytics, fleet management, and
                        real-time monitoring capabilities for complete
                        oversight.
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
                    className="rounded-radius-large shadow-strong w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-radius-large"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Features;
