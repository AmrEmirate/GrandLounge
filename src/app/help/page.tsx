"use client";

import { useState } from "react";
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CreditCard,
  Home,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

const faqs = [
  {
    category: "booking",
    question: "Bagaimana cara melakukan pemesanan?",
    answer:
      "Untuk melakukan pemesanan, cari destinasi dan tanggal yang diinginkan, pilih properti, pilih tipe kamar, dan selesaikan proses pembayaran.",
  },
  {
    category: "booking",
    question: "Apakah saya bisa mengubah atau membatalkan pemesanan?",
    answer:
      "Ya, Anda dapat mengubah atau membatalkan pemesanan tergantung pada kebijakan pembatalan properti.",
  },
  {
    category: "payment",
    question: "Metode pembayaran apa yang diterima?",
    answer:
      "Kami menerima transfer bank, kartu kredit (Visa, Mastercard), dan berbagai metode pembayaran digital.",
  },
  {
    category: "property",
    question: "Bagaimana cara mendaftarkan properti saya?",
    answer:
      "Untuk mendaftarkan properti, daftar sebagai pemilik properti, lengkapi verifikasi profil, dan ikuti proses listing kami.",
  },
  {
    category: "account",
    question: "Bagaimana cara memverifikasi akun saya?",
    answer:
      "Verifikasi akun memerlukan konfirmasi email dan verifikasi identitas. Unggah dokumen ID yang valid dan ikuti langkah verifikasi.",
  },
  {
    category: "booking",
    question: "Bagaimana cara melihat status pemesanan saya?",
    answer:
      "Anda dapat melihat status pemesanan di halaman 'Pesanan Saya' di dashboard akun Anda.",
  },
];

const categories = [
  { id: "all", label: "Semua", icon: HelpCircle },
  { id: "booking", label: "Pemesanan", icon: Home },
  { id: "payment", label: "Pembayaran", icon: CreditCard },
  { id: "property", label: "Properti", icon: Home },
  { id: "account", label: "Akun", icon: User },
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[350px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/80" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ada yang bisa kami bantu?
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Temukan jawaban untuk pertanyaan umum atau hubungi tim support
              kami
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Cari bantuan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg bg-white text-gray-900 rounded-xl border-0 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/contact"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4"
          >
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Chat dengan Kami</h3>
              <p className="text-sm text-gray-600">Respon cepat 24/7</p>
            </div>
          </Link>
          <a
            href="tel:+6221123456"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4"
          >
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Telepon</h3>
              <p className="text-sm text-gray-600">+62 21 123 456</p>
            </div>
          </a>
          <a
            href="mailto:support@grandlodge.id"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4"
          >
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Email</h3>
              <p className="text-sm text-gray-600">support@grandlodge.id</p>
            </div>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Pertanyaan Umum
          </h2>
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Tidak ada hasil untuk pencarian Anda.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Reset Pencarian
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Masih butuh bantuan?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Tim customer service kami siap membantu Anda 24/7. Jangan ragu untuk
            menghubungi kami.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
