// export const Footer = () => {
//   return (
//     <footer className="border-t bg-muted/30 py-8 mt-auto">
//       <div className="container mx-auto px-4">
//         <div className="text-center text-muted-foreground">
//           <p className="text-sm">
//             © 2025 Ride Booking Management System. Built with React, Redux
//             Toolkit Query & TypeScript.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

import {
  Car,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about-us" },
      { name: "Features", href: "/features" },
      { name: "Careers", href: "/careers" },
    ],
    services: [
      { name: "For Riders", href: "/riders" },
      { name: "For Drivers", href: "/drivers" },
      { name: "Pricing", href: "/pricing" },
      { name: "Cities", href: "/cities" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Safety", href: "/safety" },
      { name: "Report Issue", href: "/report" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "License", href: "/license" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/ridesharepro",
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/ridesharepro",
      label: "Twitter",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/ridesharepro",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/ridesharepro",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-width py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="p-2 bg-secondary rounded-lg shadow-medium group-hover:shadow-strong transition-all duration-300">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-heading font-bold">
                RideShare Pro
              </span>
            </Link>

            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Your trusted ride-sharing platform connecting riders and drivers
              for safe, reliable, and affordable transportation.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-secondary" />
                <span>+88 01955-767196</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-secondary" />
                <span>support@ridesharepro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>
                  Railgate Street, Jashore, <br /> Khulna, Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">
                Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-primary-foreground/20">
        <div className="container-width py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-primary-foreground/80 text-sm">
              © {currentYear} RideShare Pro. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-secondary hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
