import { FaLinkedin, FaGithub } from "react-icons/fa";

const team = [
  {
    name: "KH Bidyut",
    role: "Lead Developer",
    image: "https://i.ibb.co/BHDG5Yx4/your-image.jpg", 
    linkedin: "https://www.linkedin.com/in/kausarhossainbidyut/",
    github: "https://github.com/Kausarhossainbidyut",
  }
];

const TeamSection = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-r from-red-50 via-white to-red-50" id="team">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700 mb-4">
          Meet the Developer
        </h2>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          The creator of BloodConnect. Dedicated to connecting donors and saving lives.
        </p>

        {/* Team Card */}
        <div className="flex justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 transform hover:-translate-y-1 hover:shadow-3xl transition duration-300 relative w-full max-w-xs sm:max-w-sm md:max-w-md">
            {/* Profile Image */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <img
                src={team[0].image}
                alt={team[0].name}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-red-600 object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="mt-20 sm:mt-24 text-center px-2">
              <h3 className="text-red-600 font-bold text-xl sm:text-2xl md:text-2xl">{team[0].name}</h3>
              <p className="text-gray-700 mb-4 text-sm sm:text-base md:text-lg">{team[0].role}</p>

              {/* Social Links */}
              <div className="flex justify-center space-x-6 text-blue-600 mb-4">
                <a target="_blank" href={team[0].linkedin} className="hover:text-blue-800 text-blue-600 transition">
                  <FaLinkedin size={20} sm={24} />
                </a>
                <a target="_blank" href={team[0].github} className="hover:text-gray-900 text-gray-800 transition">
                  <FaGithub size={20} sm={24} />
                </a>
              </div>

              <p className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">
                Built with ❤️ and passion to help connect blood donors and save lives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
