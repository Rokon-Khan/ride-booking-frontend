import testimonialsImage from "@/assets/New_York-City.jpg";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Rider",
      rating: 5,
      comment:
        "RideShare Pro has completely changed how I commute. The drivers are professional, the app is intuitive, and I always feel safe during my rides.",
      avatar: "👩‍💼",
    },
    {
      name: "Michael Chen",
      role: "Professional Driver",
      rating: 5,
      comment:
        "As a driver, I love the flexibility and earning potential. The platform treats drivers fairly and the rider community is respectful.",
      avatar: "👨‍🚗",
    },
    {
      name: "Emily Rodriguez",
      role: "Business Traveler",
      rating: 5,
      comment:
        "Perfect for business travel! Reliable, punctual, and professional service every time. The real-time tracking gives me peace of mind.",
      avatar: "👩‍💻",
    },
    {
      name: "David Thompson",
      role: "Daily Commuter",
      rating: 5,
      comment:
        "I use RideShare Pro daily for work commutes. Consistently great service, fair pricing, and the emergency features make me feel secure.",
      avatar: "👨‍💼",
    },
    {
      name: "Lisa Park",
      role: "Weekend Rider",
      rating: 5,
      comment:
        "Great for weekend outings and social events. The drivers are friendly, cars are clean, and the payment system is seamless.",
      avatar: "👩‍🎨",
    },
    {
      name: "James Wilson",
      role: "Senior Driver",
      rating: 5,
      comment:
        "Been driving for RideShare Pro for 2 years. Excellent support team, fair policies, and steady income opportunities.",
      avatar: "👨‍🦳",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={testimonialsImage}
          alt="Happy customers using RideShare Pro"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      </div>

      <div className="relative z-10 container-width">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-section-title">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community of riders
            and drivers have to say about their RideShare Pro experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="card-elevated p-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="h-8 w-8 text-primary/20" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Comment */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.comment}"
              </p>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-hero rounded-lg p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-8">Trusted by Thousands</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-white/80">Happy Riders</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-white/80">Active Drivers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-white/80">Rides Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
