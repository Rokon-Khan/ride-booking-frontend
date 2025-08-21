import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Smartphone } from "lucide-react";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="section-padding bg-gradient-hero text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 container-width">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Transform
              <br />
              Your Daily Commute?
            </h2>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join millions of satisfied users who have discovered a better way
              to travel. Download RideShare Pro today and experience the future
              of transportation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                asChild
                className="btn-hero bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 dark:bg-white/10 dark:text-white/80"
              >
                <Link to="/register" className="flex items-center space-x-2">
                  <span>Get Started Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-white text-teal-700  hover:bg-white hover:text-primary text-lg px-8 py-4 dark:border-white/20 dark:text-white/80"
              >
                <Link to="/download" className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Download App</span>
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">4.9★</div>
                <div className="text-sm text-white/80">App Store Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">1M+</div>
                <div className="text-sm text-white/80">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="flex justify-center">
            <div className="relative animate-bounce-in">
              {/* Phone Mockup */}
              <div className="bg-white rounded-3xl p-6 shadow-strong max-w-sm transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-primary rounded-2xl p-6 text-white text-center">
                  <Smartphone className="h-16 w-16 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-semibold mb-2">RideShare Pro</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Your ride is just a tap away
                  </p>
                  <div className="bg-secondary text-secondary-foreground rounded-lg p-3 text-sm">
                    <div className="font-semibold">Available Now</div>
                    <div className="text-xs opacity-80">iOS & Android</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-success text-success-foreground rounded-full p-3 shadow-medium animate-bounce">
                <Download className="h-6 w-6" />
              </div>

              <div
                className="absolute -bottom-4 -right-4 bg-warning text-warning-foreground rounded-full p-3 shadow-medium animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <ArrowRight className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4">
              Start Earning as a Driver
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Turn your car into a source of income. Flexible hours, competitive
              earnings, and the freedom to be your own boss.
            </p>
            <Button
              asChild
              className="bg-secondary text-secondary-foreground hover:bg-secondary-light"
            >
              <Link to="/driver-signup" className="flex items-center space-x-2">
                <span>Become a Driver</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
