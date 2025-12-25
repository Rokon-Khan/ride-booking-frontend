import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Phone, 
  Users, 
  MapPin, 
  AlertTriangle, 
  CheckCircle,
  Camera,
  Clock,
  UserCheck,
  Car,
  HeadphonesIcon,
  Zap
} from "lucide-react";
import { Link } from "react-router";

const Safety = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "Driver Background Checks",
      description: "All drivers undergo comprehensive background verification including criminal record checks and driving history review.",
    },
    {
      icon: UserCheck,
      title: "Identity Verification",
      description: "Both drivers and riders must verify their identity with government-issued ID and phone number verification.",
    },
    {
      icon: MapPin,
      title: "Real-time GPS Tracking",
      description: "Every ride is tracked in real-time with GPS technology, ensuring you can share your location with trusted contacts.",
    },
    {
      icon: Phone,
      title: "Emergency SOS Button",
      description: "One-tap emergency button instantly alerts authorities and your emergency contacts with your exact location.",
    },
    {
      icon: Users,
      title: "Share Trip Details",
      description: "Share your trip details, driver information, and live location with family and friends for added security.",
    },
    {
      icon: Camera,
      title: "In-App Safety Features",
      description: "Report safety issues, rate drivers, and access safety resources directly from the app.",
    },
  ];

  const emergencyFeatures = [
    {
      icon: AlertTriangle,
      title: "24/7 Emergency Response",
      description: "Our emergency response team is available round the clock to handle safety incidents.",
    },
    {
      icon: HeadphonesIcon,
      title: "Safety Support Line",
      description: "Dedicated safety support hotline: +88 09611-677788 available 24/7 for immediate assistance.",
    },
    {
      icon: Zap,
      title: "Instant Alerts",
      description: "Automatic alerts to emergency contacts and authorities when SOS button is activated.",
    },
    {
      icon: Clock,
      title: "Quick Response Time",
      description: "Average emergency response time of under 5 minutes in major cities.",
    },
  ];

  const safetyTips = [
    {
      category: "Before Your Ride",
      tips: [
        "Verify the driver's photo, name, and license plate before getting in",
        "Share your trip details with a trusted contact",
        "Check the driver's rating and reviews",
        "Wait in a safe, well-lit location for your ride"
      ],
    },
    {
      category: "During Your Ride",
      tips: [
        "Sit in the back seat when riding alone",
        "Keep your phone charged and accessible",
        "Follow the GPS route and speak up if the driver deviates",
        "Trust your instincts - if something feels wrong, speak up"
      ],
    },
    {
      category: "After Your Ride",
      tips: [
        "Rate your driver and provide feedback",
        "Report any safety concerns immediately",
        "Keep a record of your trip details",
        "Contact support if you left something in the vehicle"
      ],
    },
  ];

  const communityStandards = [
    {
      icon: CheckCircle,
      title: "Respectful Behavior",
      description: "All users must treat each other with respect and courtesy.",
    },
    {
      icon: Car,
      title: "Vehicle Standards",
      description: "All vehicles must meet safety and cleanliness standards.",
    },
    {
      icon: Shield,
      title: "Zero Tolerance Policy",
      description: "We have zero tolerance for harassment, discrimination, or violence.",
    },
    {
      icon: Users,
      title: "Community Guidelines",
      description: "Clear guidelines ensure a safe and positive experience for everyone.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto">
            <Shield className="h-16 w-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Safety is Our Priority
            </h1>
            <p className="text-xl text-white/90 mb-8">
              We've built comprehensive safety features and policies to ensure every ride is secure, reliable, and trustworthy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-primary">
                Emergency: +88 09611-677788
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/report">Report an Issue</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built-in Safety Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multiple layers of safety technology and verification processes protect you on every ride.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mb-4" />
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

      {/* Emergency Response */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Emergency Response System</h2>
            <p className="text-muted-foreground">
              Immediate help when you need it most
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emergencyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-800 mb-2">Emergency Hotline</h3>
              <p className="text-red-700 mb-4">
                In case of emergency during a ride, call our 24/7 safety hotline immediately.
              </p>
              <div className="text-2xl font-bold text-red-800">+88 09611-677788</div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Safety Tips</h2>
            <p className="text-muted-foreground">
              Follow these guidelines to ensure a safe ride experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {safetyTips.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Standards */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Standards</h2>
            <p className="text-muted-foreground">
              Our commitment to maintaining a safe and respectful community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStandards.map((standard, index) => {
              const Icon = standard.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{standard.title}</h3>
                  <p className="text-sm text-muted-foreground">{standard.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety Resources */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Safety Resources</h2>
            <p className="text-muted-foreground">
              Additional resources to help you stay safe
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Safety Guidelines PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Download our comprehensive safety guidelines for detailed information on staying safe.
                </p>
                <Button variant="outline">Download PDF</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Training Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Watch our safety training videos to learn best practices for riders and drivers.
                </p>
                <Button variant="outline">Watch Videos</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Safety Concern?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Your safety is our top priority. If you have any safety concerns or incidents to report, please contact us immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-primary" asChild>
              <Link to="/report">Report an Issue</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">Contact Safety Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Safety;