import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Car, Clock } from "lucide-react";
import { useEffect, useRef } from "react";

const Cities = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const cities = [
    {
      name: "Dhaka",
      division: "Dhaka Division",
      population: "9.5M+",
      drivers: "2,500+",
      rides: "50,000+",
      coordinates: { lat: 23.8103, lng: 90.4125 },
      description: "The capital and largest city of Bangladesh, our biggest market.",
    },
    {
      name: "Chittagong",
      division: "Chittagong Division", 
      population: "3.2M+",
      drivers: "800+",
      rides: "15,000+",
      coordinates: { lat: 22.3569, lng: 91.7832 },
      description: "Major port city and commercial hub of Bangladesh.",
    },
    {
      name: "Khulna",
      division: "Khulna Division",
      population: "1.8M+",
      drivers: "400+",
      rides: "8,000+",
      coordinates: { lat: 22.8456, lng: 89.5403 },
      description: "Industrial city known for shrimp and jute production.",
    },
    {
      name: "Rajshahi",
      division: "Rajshahi Division",
      population: "1.2M+",
      drivers: "300+",
      rides: "6,000+",
      coordinates: { lat: 24.3745, lng: 88.6042 },
      description: "Educational hub with several universities and colleges.",
    },
    {
      name: "Barishal",
      division: "Barishal Division",
      population: "800K+",
      drivers: "200+",
      rides: "4,000+",
      coordinates: { lat: 22.7010, lng: 90.3535 },
      description: "River port city in southern Bangladesh.",
    },
    {
      name: "Rangpur",
      division: "Rangpur Division",
      population: "900K+",
      drivers: "250+",
      rides: "5,000+",
      coordinates: { lat: 25.7439, lng: 89.2752 },
      description: "Agricultural center in northern Bangladesh.",
    },
    {
      name: "Sylhet",
      division: "Sylhet Division",
      population: "700K+",
      drivers: "180+",
      rides: "3,500+",
      coordinates: { lat: 24.8949, lng: 91.8687 },
      description: "Tea capital of Bangladesh with beautiful landscapes.",
    },
    {
      name: "Mymensingh",
      division: "Mymensingh Division",
      population: "600K+",
      drivers: "150+",
      rides: "3,000+",
      coordinates: { lat: 24.7471, lng: 90.4203 },
      description: "Agricultural university town with rich cultural heritage.",
    },
  ];

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      // Center map on Bangladesh
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 7,
        center: { lat: 23.6850, lng: 90.3563 },
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ color: "#f5f5f5" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }],
          },
        ],
      });

      // Add markers for each city
      cities.forEach((city) => {
        const marker = new window.google.maps.Marker({
          position: city.coordinates,
          map: map,
          title: city.name,
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="white" stroke-width="4"/>
                <circle cx="20" cy="20" r="8" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${city.name}</h3>
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${city.description}</p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <span style="background: #eff6ff; color: #3b82f6; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${city.population} people</span>
                <span style="background: #f0fdf4; color: #16a34a; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${city.drivers} drivers</span>
              </div>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    };

    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_BcqzKg0VNhE&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We're Expanding Across Bangladesh
            </h1>
            <p className="text-xl text-white/90 mb-8">
              RideShare Pro is available in major cities across Bangladesh, connecting millions of riders with thousands of drivers.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">8</div>
                <div className="text-white/80">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4,500+</div>
                <div className="text-white/80">Active Drivers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95,000+</div>
                <div className="text-white/80">Monthly Rides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">18M+</div>
                <div className="text-white/80">People Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Service Areas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the cities where RideShare Pro is available. Click on any city marker to see more details.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div 
              ref={mapRef}
              className="w-full h-[500px]"
              style={{ minHeight: "500px" }}
            />
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cities We Serve</h2>
            <p className="text-muted-foreground">
              Detailed information about our presence in each city
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{city.name}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{city.division}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{city.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Population</span>
                      </div>
                      <Badge variant="secondary">{city.population}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Drivers</span>
                      </div>
                      <Badge variant="outline">{city.drivers}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Monthly Rides</span>
                      </div>
                      <Badge>{city.rides}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              We're expanding to more cities across Bangladesh
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Cumilla</h3>
                <p className="text-sm text-muted-foreground">Expected launch: Q2 2025</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Jessore</h3>
                <p className="text-sm text-muted-foreground">Expected launch: Q3 2025</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Bogura</h3>
                <p className="text-sm text-muted-foreground">Expected launch: Q4 2025</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See Your City?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Let us know where you'd like to see RideShare Pro next. We're always looking to expand to new areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Request Your City
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cities;