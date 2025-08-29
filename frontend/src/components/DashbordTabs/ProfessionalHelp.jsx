import React, { useState } from "react";

const ProfessionalHelp = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const professionals = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "CBT"],
      rating: 4.9,
      reviews: 127,
      location: "Downtown Medical Center",
      phone: "(555) 123-4567",
      email: "dr.johnson@mindcare.com",
      bio: "Specializing in cognitive behavioral therapy with over 10 years of experience in treating anxiety and depression.",
      availability: "Mon-Fri 9AM-6PM",
      category: "psychologist",
      image: "👩‍⚕️",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Psychiatrist",
      specialties: ["Medication Management", "Bipolar Disorder", "ADHD"],
      rating: 4.8,
      reviews: 89,
      location: "Central Health Plaza",
      phone: "(555) 234-5678",
      email: "dr.chen@centralhealth.com",
      bio: "Board-certified psychiatrist focused on comprehensive mental health care and medication optimization.",
      availability: "Tue-Sat 8AM-5PM",
      category: "psychiatrist",
      image: "👨‍⚕️",
    },
    {
      id: 3,
      name: "Lisa Martinez, LCSW",
      title: "Licensed Clinical Social Worker",
      specialties: ["Family Therapy", "Trauma", "Substance Abuse"],
      rating: 4.7,
      reviews: 156,
      location: "Community Wellness Center",
      phone: "(555) 345-6789",
      email: "lisa.martinez@cwc.org",
      bio: "Experienced in family systems therapy and trauma-informed care with a compassionate approach.",
      availability: "Mon-Thu 10AM-7PM",
      category: "therapist",
      image: "👩‍💼",
    },
    {
      id: 4,
      name: "Dr. Robert Williams",
      title: "Marriage & Family Therapist",
      specialties: ["Couples Therapy", "Communication", "Relationship Issues"],
      rating: 4.9,
      reviews: 203,
      location: "Relationship Counseling Center",
      phone: "(555) 456-7890",
      email: "dr.williams@rcc.com",
      bio: "Helping couples and families build stronger relationships through evidence-based therapeutic approaches.",
      availability: "Mon-Fri 1PM-8PM, Sat 9AM-3PM",
      category: "therapist",
      image: "👨‍💼",
    },
    {
      id: 5,
      name: "Dr. Amanda Foster",
      title: "Clinical Psychologist",
      specialties: ["Child Psychology", "Autism Spectrum", "Behavioral Issues"],
      rating: 4.8,
      reviews: 94,
      location: "Pediatric Mental Health Clinic",
      phone: "(555) 567-8901",
      email: "dr.foster@pmhc.org",
      bio: "Specializing in child and adolescent mental health with expertise in developmental disorders.",
      availability: "Mon-Fri 8AM-4PM",
      category: "psychologist",
      image: "👩‍⚕️",
    },
  ];

  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 free and confidential support",
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text",
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse support",
    },
  ];

  const resources = [
    {
      title: "Understanding Mental Health",
      description: "Comprehensive guide to mental health basics",
      link: "#",
      icon: "📚",
    },
    {
      title: "Coping Strategies Handbook",
      description: "Practical techniques for managing stress and anxiety",
      link: "#",
      icon: "🛠️",
    },
    {
      title: "Support Groups Directory",
      description: "Find local and online support groups",
      link: "#",
      icon: "👥",
    },
    {
      title: "Insurance Guide",
      description: "Understanding mental health coverage",
      link: "#",
      icon: "💰",
    },
  ];

  const filteredProfessionals = professionals.filter((prof) => {
    const matchesCategory =
      selectedCategory === "all" || prof.category === selectedCategory;
    const matchesSearch =
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.specialties.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--text-dark)" }}
        >
          🏥 Professional Help
        </h1>
        <p style={{ color: "var(--text-gray)" }}>
          Connect with qualified mental health professionals and access helpful
          resources
        </p>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-red-800">
          🚨 Emergency Contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-red-200"
            >
              <h3 className="font-semibold text-red-800 mb-2">
                {contact.name}
              </h3>
              <div className="text-lg font-bold text-red-600 mb-2">
                {contact.number}
              </div>
              <p className="text-sm text-red-700">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div
        className="bg-white rounded-xl shadow-lg p-6 mb-8 border"
        style={{ borderColor: "var(--light-blue)" }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg"
              style={{ borderColor: "var(--light-blue)" }}
            />
          </div>
          <div className="flex gap-2">
            {["all", "psychologist", "psychiatrist", "therapist"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category ? "text-white" : "border"
                  }`}
                  style={
                    selectedCategory === category
                      ? {
                          backgroundColor: "var(--primary-blue)",
                        }
                      : {
                          borderColor: "var(--primary-blue)",
                          color: "var(--primary-blue)",
                          backgroundColor: "transparent",
                        }
                  }
                >
                  {category === "all"
                    ? "All"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Professionals List */}
      <div className="mb-8">
        <h2
          className="text-2xl font-semibold mb-6"
          style={{ color: "var(--text-dark)" }}
        >
          Mental Health Professionals
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProfessionals.map((prof) => (
            <div
              key={prof.id}
              className="bg-white rounded-xl shadow-lg p-6 border hover:shadow-xl transition-shadow"
              style={{ borderColor: "var(--light-blue)" }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{prof.image}</div>
                <div className="flex-1">
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "var(--text-dark)" }}
                  >
                    {prof.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-gray)" }}>
                    {prof.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-yellow-500">
                      {"★".repeat(Math.floor(prof.rating))}
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-gray)" }}
                    >
                      {prof.rating} ({prof.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm mb-4" style={{ color: "var(--text-gray)" }}>
                {prof.bio}
              </p>

              <div className="mb-4">
                <div
                  className="text-sm font-medium mb-2"
                  style={{ color: "var(--text-dark)" }}
                >
                  Specialties:
                </div>
                <div className="flex flex-wrap gap-2">
                  {prof.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs text-white"
                      style={{ backgroundColor: "var(--primary-blue)" }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="space-y-2 text-sm mb-4"
                style={{ color: "var(--text-gray)" }}
              >
                <div>📍 {prof.location}</div>
                <div>📞 {prof.phone}</div>
                <div>✉️ {prof.email}</div>
                <div>🕐 {prof.availability}</div>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: "var(--primary-blue)" }}
                >
                  Contact
                </button>
                <button
                  className="flex-1 px-4 py-2 rounded-lg border font-medium transition-colors hover:opacity-80"
                  style={{
                    borderColor: "var(--primary-blue)",
                    color: "var(--primary-blue)",
                    backgroundColor: "transparent",
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div
        className="bg-white rounded-xl shadow-lg p-6 border"
        style={{ borderColor: "var(--light-blue)" }}
      >
        <h2
          className="text-2xl font-semibold mb-6"
          style={{ color: "var(--text-dark)" }}
        >
          Helpful Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
              style={{ borderColor: "var(--light-blue)" }}
            >
              <div className="text-2xl">{resource.icon}</div>
              <div>
                <h3
                  className="font-semibold"
                  style={{ color: "var(--text-dark)" }}
                >
                  {resource.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-gray)" }}>
                  {resource.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div
        className="mt-8 bg-blue-50 rounded-xl p-6 border"
        style={{ borderColor: "var(--light-blue)" }}
      >
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: "var(--primary-blue)" }}
        >
          ℹ️ Important Information
        </h3>
        <ul className="space-y-2 text-sm" style={{ color: "var(--text-dark)" }}>
          <li>• Always verify professional licenses and credentials</li>
          <li>• Many insurance plans cover mental health services</li>
          <li>• It's okay to try different therapists to find the right fit</li>
          <li>• Emergency services are available 24/7 if you're in crisis</li>
          <li>• Teletherapy options are available for remote sessions</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfessionalHelp;
