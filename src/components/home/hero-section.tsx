"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/lib/constants/hero-data";
import { SearchForm, SearchQuery } from "./search-form";

interface HeroSectionProps {
  onSearch: (query: SearchQuery | null) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="relative h-[550px] md:h-[520px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-16 md:pt-0">
              <div className="text-center text-white max-w-4xl mx-auto mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 drop-shadow-lg leading-tight">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-xl opacity-90 drop-shadow-md px-2">
                  {slide.subtitle}
                </p>
              </div>

              {/* Integrated Search Form */}
              <SearchForm onSearch={onSearch} />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons - hidden on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20 backdrop-blur-sm bg-black/20 rounded-full h-8 w-8 md:h-10 md:w-10 hidden sm:flex"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20 backdrop-blur-sm bg-black/20 rounded-full h-8 w-8 md:h-10 md:w-10 hidden sm:flex"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-6 md:w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
