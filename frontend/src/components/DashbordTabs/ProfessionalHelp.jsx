import React, { useState } from "react";

const ProfessionalHelp = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const professionals = [
    {
      id: 0,
      name: "PW Prerna",
      title: "FREE Student Counseling Platform",
      specialties: [
        "Exam Stress",
        "Anxiety Management",
        "Student Support",
        "Academic Pressure",
      ],
      rating: 4.9,
      reviews: 1250,
      location: "Teleconsultation + Kota & Patna Centers",
      phone: "+91 9990500122",
      email: "support@pwprerna.com",
      bio: "FREE teleconsultation platform specifically designed for students. Our qualified counselors help students overcome exam stress, anxiety, and academic pressure with proven strategies.",
      availability: "Mon-Sat 10AM-9PM (Free Service)",
      category: "featured",
      image: "🎓",
      featured: true,
      free: true,
    },
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

      {/* PW Prerna Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 mb-8 text-white">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">PW PRERNA</h2>
          <p className="text-xl font-semibold text-blue-100">
            Supporting Your Journey To Emotional Wellness
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
          <p className="text-lg font-semibold mb-4 text-center">
            Need support with your emotional well-being? Reach out to us on:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">📞</div>
              <div className="text-2xl font-bold">+91 9990500122</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-lg font-semibold">Mon to Sat</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🕒</div>
              <div className="text-lg font-semibold">10:00 AM to 9:00 PM</div>
              <div className="text-sm text-blue-100">
                (Except on National Holidays)
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
            📞 Call Now: +91 9990500122
          </button>
        </div>
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

      {/* PW Prerna Detailed Section */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 mb-8 border border-purple-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Welcome to PW Prerna
          </h2>
          <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed">
            <p className="mb-4">
              PW Prerna is a <strong>FREE teleconsultation platform</strong> for
              students available from 10 am to 9 pm from Monday to Saturday. It
              also provides in-person consultation at Kota & Patna centres. When
              exam time approaches, students get overloaded with exam stress and
              find it difficult to cope with anxiety & nervousness that follows.
            </p>
            <p className="mb-4">
              PW Prerna aims to provide an accessible solution to help students
              overcome these feelings of stress which may affect their
              performance, during these times. The idea is to maximise student
              results by making sure they don't lose focus towards building
              strategies and confidence for the exam, rather than worrying about
              managing their mental health.
            </p>
            <p className="mb-6">
              Our qualified & experienced student counselors have a history of
              helping students achieve their academic goals, with
              <strong> FREE counseling sessions</strong>. They just need to call{" "}
              <strong>+91 9990500122</strong> to receive support.
            </p>
          </div>
        </div>

        {/* Student Concerns */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-purple-800 mb-6 text-center">
            Common Student Concerns We Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "I'm nervous as my exams are getting closer.",
              "I'm not able to manage my time.",
              "I'm not able to focus on my studies.",
              "I am getting pressured to perform well.",
              "My exam did not go well hence I cannot focus on the upcoming one",
              "I am not able to concentrate due to homesickness",
              "I am feeling isolated",
            ].map((concern, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm border border-purple-100"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-purple-600 font-bold text-lg">💭</div>
                  <p className="text-gray-700 text-sm">{concern}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How PW Prerna Helps */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-purple-800 mb-6 text-center">
            How Does PW Prerna Help?
          </h3>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100 mb-6">
            <p className="text-gray-700 mb-4">
              PW Prerna Counselors are experienced in handling these obstacles
              and will help you in every way possible to uplift your emotional
              well-being & come out victorious!
            </p>
            <p className="text-gray-700">
              The key to maintaining mental health is recognising pre-existing
              problems and knowing how to tackle them. Here are common
              circumstances that you, as a student may experience:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "😰", label: "Anxiety" },
              { icon: "😨", label: "Panic" },
              { icon: "📚", label: "Exam Fear / Stress" },
              { icon: "🤔", label: "Self Doubt" },
              { icon: "😢", label: "Sadness or Distress" },
              { icon: "🌀", label: "Overthinking" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 text-center shadow-sm border border-purple-100"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm font-semibold text-gray-700">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-purple-100 rounded-lg p-6 mt-6 text-center">
            <p className="text-purple-800 font-semibold">
              It is important to understand that all of these problems are
              common and it is within you to overcome them and achieve your
              goal. PW Experts will help you identify them, provide techniques
              through which to manage them and encourage you to become better,
              faster, safer.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-bold mb-4">
            Need support with your emotional well-being? Reach out to us on:
          </h4>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📞</span>
              <span className="text-xl font-bold">+91 9990500122</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📅</span>
              <span>Mon to Sat</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🕒</span>
              <span>10:00 AM to 9:00 PM</span>
            </div>
          </div>
          <p className="text-sm text-purple-100 mt-2">
            (Except on National Holidays)
          </p>
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
          <div className="flex gap-2 flex-wrap">
            {[
              "all",
              "featured",
              "psychologist",
              "psychiatrist",
              "therapist",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category ? "text-white" : "border"
                } ${category === "featured" ? "border-2" : ""}`}
                style={
                  selectedCategory === category
                    ? {
                        backgroundColor:
                          category === "featured"
                            ? "#7C3AED"
                            : "var(--primary-blue)",
                      }
                    : {
                        borderColor:
                          category === "featured"
                            ? "#7C3AED"
                            : "var(--primary-blue)",
                        color:
                          category === "featured"
                            ? "#7C3AED"
                            : "var(--primary-blue)",
                        backgroundColor: "transparent",
                      }
                }
              >
                {category === "all"
                  ? "All"
                  : category === "featured"
                  ? "⭐ Featured"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
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
              className={`rounded-xl shadow-lg p-6 border hover:shadow-xl transition-all duration-300 ${
                prof.featured
                  ? "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-300 ring-2 ring-purple-200"
                  : "bg-white"
              }`}
              style={!prof.featured ? { borderColor: "var(--light-blue)" } : {}}
            >
              {prof.featured && (
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ FEATURED
                  </div>
                  {prof.free && (
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      💯 FREE
                    </div>
                  )}
                </div>
              )}
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
