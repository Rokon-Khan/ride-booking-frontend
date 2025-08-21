import { Car, MapPin, Smartphone, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Smartphone,
      title: "Download & Register",
      description:
        "Download our app and create your account in minutes. Choose your role as a rider or driver.",
      step: "01",
    },
    {
      icon: MapPin,
      title: "Set Your Destination",
      description:
        "Enter your pickup and drop-off locations. Our smart system will find the best route.",
      step: "02",
    },
    {
      icon: Car,
      title: "Get Matched",
      description:
        "We instantly connect you with nearby verified drivers. Track their arrival in real-time.",
      step: "03",
    },
    {
      icon: Star,
      title: "Enjoy Your Ride",
      description:
        "Sit back and enjoy a safe, comfortable ride. Rate your experience when you arrive.",
      step: "04",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-section-title">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting around has never been easier. Follow these simple steps to
            start your journey.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-medium group-hover:shadow-strong transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-medium">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-card-title group-hover:text-primary transition-colors duration-300 mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Connector Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform translate-x-4 translate-y-0"
                    style={{ width: "calc(100% - 2rem)" }}
                  >
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card p-8 rounded-radius-large shadow-soft border border-border/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied users who trust RideShare Pro for
              their daily transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">Start Riding Now</button>
              <button className="btn-outline-primary">Become a Driver</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
