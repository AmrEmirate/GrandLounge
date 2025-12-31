"use client";

import { useEffect, useState } from "react";
import { Building2, Users, Star, Award } from "lucide-react";
import apiHelper from "@/lib/apiHelper";

interface Stats {
  totalProperties: number;
  totalGuests: number;
  averageRating: number;
  totalRooms: number;
}

export function AboutHero() {
  return (
    <div className="relative h-[400px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tentang Grand Lodge
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Menghubungkan wisatawan dengan akomodasi luar biasa dan
              memberdayakan pemilik properti untuk berbagi ruang mereka dengan
              dunia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiHelper.get("/properties/stats");
        setStats(response.data.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Fallback to default values
        setStats({
          totalProperties: 100,
          totalGuests: 500,
          averageRating: 4.5,
          totalRooms: 250,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      label: "Properti Terdaftar",
      value: stats ? `${stats.totalProperties}+` : "0",
      icon: Building2,
    },
    {
      label: "Tamu Puas",
      value: stats ? `${stats.totalGuests}+` : "0",
      icon: Users,
    },
    {
      label: "Rating Rata-rata",
      value: stats ? `${stats.averageRating}/5` : "0/5",
      icon: Star,
    },
    {
      label: "Total Kamar",
      value: stats ? `${stats.totalRooms}+` : "0",
      icon: Award,
    },
  ];

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-50">
                <div className="w-14 h-14 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-20 mx-auto mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutStory() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cerita Kami
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Grand Lodge didirikan dengan visi sederhana: membuat perjalanan
                menjadi lebih mudah dan menyenangkan bagi semua orang.
              </p>
              <p>
                Kami percaya bahwa setiap perjalanan dimulai dengan tempat
                menginap yang nyaman. Itulah mengapa kami berkomitmen untuk
                menyediakan pilihan akomodasi terbaik di seluruh Indonesia.
              </p>
              <p>
                Dari hotel mewah hingga homestay yang nyaman, kami memastikan
                setiap properti memenuhi standar kualitas tinggi kami.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
              alt="Grand Lodge Story"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutValues() {
  const values = [
    {
      icon: "🛡️",
      title: "Kepercayaan & Keamanan",
      description:
        "Kami memprioritaskan keamanan tamu dan pemilik properti melalui verifikasi listing dan pembayaran yang aman.",
    },
    {
      icon: "💝",
      title: "Layanan Terbaik",
      description:
        "Tim kami siap 24/7 untuk memastikan setiap pengalaman menginap melebihi ekspektasi.",
    },
    {
      icon: "⭐",
      title: "Jaminan Kualitas",
      description:
        "Setiap properti diverifikasi dan diulas secara berkala untuk menjaga standar kualitas kami.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prinsip-prinsip yang memandu setiap keputusan kami.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutMission() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Misi Kami</h2>
        <p className="text-xl max-w-3xl mx-auto opacity-90 mb-8">
          Menjadi platform akomodasi terdepan di Indonesia yang menghubungkan
          wisatawan dengan pengalaman menginap yang tak terlupakan.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
            🎯 Inovatif
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
            🤝 Terpercaya
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
            💎 Berkualitas
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutTeam() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Kami</h2>
          <p className="text-gray-600">
            Orang-orang hebat di balik Grand Lodge.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
