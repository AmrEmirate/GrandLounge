"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiHelper from "@/lib/apiHelper";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

interface PopularDestination {
  cityId: string;
  cityName: string;
  categoryName: string;
  bookingCount: number;
  avgRating: number | null;
}

const defaultDestinations = [
  { cityName: "Bali", categoryName: "Villa" },
  { cityName: "Jakarta", categoryName: "Hotel" },
  { cityName: "Bandung", categoryName: "Apartment" },
  { cityName: "Yogyakarta", categoryName: "Homestay" },
  { cityName: "Surabaya", categoryName: "Hotel" },
  { cityName: "Malang", categoryName: "Villa" },
];

// Mobile accordion section component
const MobileAccordion = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-800 md:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 md:hidden"
      >
        <h3 className="text-base font-semibold">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      <h3 className="hidden md:block text-lg font-semibold mb-5 tracking-wide">
        {title}
      </h3>
      <div className={`${isOpen ? "block pb-4" : "hidden"} md:block`}>
        {children}
      </div>
    </div>
  );
};

export function Footer() {
  const [destinations, setDestinations] = useState<PopularDestination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await apiHelper.get(
          "/properties/popular-destinations"
        );
        setDestinations(response.data.data);
      } catch (error) {
        console.error("Failed to fetch popular destinations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const displayDestinations =
    destinations.length > 0
      ? destinations
      : defaultDestinations.map((d, i) => ({
          cityId: String(i),
          cityName: d.cityName,
          categoryName: d.categoryName,
          bookingCount: 0,
          avgRating: null,
        }));

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Mobile: Stacked with accordions | Desktop: Grid */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12">
          {/* Company Info - Always visible */}
          <div className="pb-6 md:pb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/" className="flex items-center">
                <img
                  src="/assets/LONGE.png"
                  alt="Logo"
                  className="h-10 md:h-12 w-auto"
                />
              </Link>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Partner terpercaya Anda untuk menemukan akomodasi sempurna.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+62211234567"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="text-sm">+62 21 1234 5678</span>
              </a>
              <a
                href="mailto:info@grandlodge.id"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="text-sm">info@grandlodge.id</span>
              </a>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
            </div>

            {/* Social Icons - Mobile only here */}
            <div className="mt-6 md:hidden">
              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="bg-gray-800 p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="bg-gray-800 p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="bg-gray-800 p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Popular Destinations - Accordion on mobile */}
          <MobileAccordion title="Destinasi Populer">
            <ul className="space-y-2 md:space-y-3">
              {isLoading
                ? [...Array(6)].map((_, i) => (
                    <li
                      key={i}
                      className="h-4 bg-gray-800 rounded animate-pulse w-3/4"
                    ></li>
                  ))
                : displayDestinations.slice(0, 6).map((dest) => (
                    <li key={`${dest.cityName}-${dest.categoryName}`}>
                      <Link
                        href={`/properties?city=${dest.cityName}&category=${dest.categoryName}`}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {dest.categoryName} di {dest.cityName}
                      </Link>
                    </li>
                  ))}
            </ul>
          </MobileAccordion>

          {/* Quick Links - Accordion on mobile */}
          <MobileAccordion title="Tautan Cepat">
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  href="/properties"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Semua Properti
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register?role=TENANT"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Daftarkan Properti
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Login Tenant
                </Link>
              </li>
            </ul>
          </MobileAccordion>

          {/* Stay Updated */}
          <div className="pt-6 md:pt-0">
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-5 tracking-wide">
              Tetap Terhubung
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Dapatkan penawaran terbaru langsung ke inbox Anda.
            </p>
            <form className="flex w-full items-center space-x-2">
              <Input
                type="email"
                placeholder="Alamat email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-blue-600 hover:bg-blue-700 flex-shrink-0 h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

            {/* Social Icons - Desktop only */}
            <div className="mt-8 hidden md:block">
              <h4 className="text-md font-semibold mb-4 tracking-wide">
                Ikuti Kami
              </h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-gray-400 text-xs md:text-sm text-center">
              © {new Date().getFullYear()} Grand Lodge. Hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privasi
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Ketentuan
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
