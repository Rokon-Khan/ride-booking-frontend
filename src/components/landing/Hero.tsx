import heroImage from "@/assets/New-York-City.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, Star } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern city with ride-sharing technology"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/80"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce-in animation-delay-200">
        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full">
          <Star className="h-6 w-6 text-yellow-400" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-bounce-in animation-delay-500">
        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full">
          <Shield className="h-6 w-6 text-green-400" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-bounce-in animation-delay-700">
        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full">
          <Clock className="h-6 w-6 text-blue-400" />
        </div>
      </div>

      <div className="relative z-10 container-width section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up">
              <h1 className="text-hero text-white mb-6">
                Your Ride,
                <br />
                <span className="text-secondary">Anytime</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Experience seamless transportation with our reliable
                ride-sharing platform. Safe, fast, and affordable rides at your
                fingertips.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button asChild className="btn-hero text-lg px-8 py-4">
                  <Link to="/register" className="flex items-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="btn-outline-primary text-lg px-8 py-4 border-white text-teal-700 hover:bg-white hover:text-primary"
                >
                  <Link to="/features">Learn More</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-sm text-white/80">Happy Riders</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">5K+</div>
                  <div className="text-sm text-white/80">Active Drivers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">4.9</div>
                  <div className="text-sm text-white/80">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Element */}
          <div className="hidden lg:flex justify-center items-center animate-slide-in-right">
            <div className="relative">
              {/* Phone Mockup */}
              <div className="bg-white rounded-3xl p-6 shadow-strong max-w-sm">
                <div className="bg-gradient-hero rounded-2xl p-6 text-white text-center">
                  <h3 className="text-xl font-semibold mb-4">Book Your Ride</h3>
                  <div className="space-y-3">
                    <div className="bg-white/20 rounded-lg p-3 text-left">
                      <div className="text-sm opacity-80">From</div>
                      <div className="font-medium">Current Location</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-left">
                      <div className="text-sm opacity-80">To</div>
                      <div className="font-medium">Downtown Office</div>
                    </div>
                    <Button className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground">
                      Find Rides
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-success text-success-foreground rounded-lg p-3 shadow-medium animate-bounce-in">
                <div className="text-sm font-medium">Driver Found!</div>
                <div className="text-xs opacity-80">Arriving in 3 mins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
