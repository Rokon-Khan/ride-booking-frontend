import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  MapPin, 
  CreditCard, 
  Shield, 
  Clock, 
  Star,
  Users,
  Zap,
  HeadphonesIcon
} from "lucide-react";
import { Link } from "react-router";

const Riders = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Easy Booking",
      description: "Book a ride in seconds with our intuitive mobile app. Just set your pickup and destination.",
    },
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Track your driver's location in real-time and get accurate arrival estimates.",
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description: "Pay with cash, mobile banking, or credit card. Choose what's convenient for you.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "All drivers are verified with background checks. Share your trip with family for peace of mind.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Need a ride anytime? We're available round the clock, every day of the year.",
    },
    {
      icon: Star,
      title: "Rate & Review",
      description: "Rate your experience and help maintain high service quality for everyone.",
    },
  ];

  const rideTypes = [
    {
      name: "RideShare Economy",
      description: "Affordable rides for everyday travel",
      price: "৳8-12/km",
      features: ["Shared rides", "Budget-friendly", "Eco-conscious"],
    },
    {
      name: "RideShare Standard",
      description: "Comfortable rides for personal use",
      price: "৳12-18/km",
      features: ["Private car", "AC available", "Professional drivers"],
    },
    {
      name: "RideShare Premium",
      description: "Luxury rides for special occasions",
      price: "৳20-30/km",
      features: ["Premium vehicles", "Top-rated drivers", "Extra comfort"],
    },
  ];

  const safetyFeatures = [
    {
      icon: Shield,
      title: "Driver Verification",
      description: "All drivers undergo thorough background checks and vehicle inspections.",
    },
    {
      icon: Users,
      title: "Share Trip Details",
      description: "Share your trip details with trusted contacts for added security.",
    },
    {
      icon: Zap,
      title: "Emergency SOS",
      description: "One-tap emergency button to alert authorities and emergency contacts.",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer support for any issues or concerns.",
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
                Ride with Confidence
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Get reliable, safe, and affordable rides across Bangladesh. Your journey starts with just a tap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="text-primary" asChild>
                  <Link to="/signup">Start Riding</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop" 
                alt="Happy rider in car" 
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
            <h2 className="text-3xl font-bold mb-4">Why Choose RideShare Pro?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the best ride-sharing service with features designed for your comfort and convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ride Types */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Ride</h2>
            <p className="text-muted-foreground">
              Different options for different needs and budgets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {rideTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{type.name}</CardTitle>
                  <p className="text-muted-foreground">{type.description}</p>
                  <div className="text-2xl font-bold text-primary">{type.price}</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6">Select This Ride</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Safety is Our Priority</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built comprehensive safety features to ensure you feel secure on every ride.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Getting a ride is simple and straightforward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Request a Ride</h3>
              <p className="text-muted-foreground">
                Open the app, enter your destination, and request a ride.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Get Matched</h3>
              <p className="text-muted-foreground">
                We'll find the nearest driver and share their details with you.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Enjoy Your Ride</h3>
              <p className="text-muted-foreground">
                Sit back, relax, and enjoy a safe ride to your destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Riding?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied riders who trust RideShare Pro for their daily commute and special trips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-primary" asChild>
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Riders;