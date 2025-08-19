import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const faqs = [
  {
    question: "Who can donate blood?",
    answer:
      "Anyone who meets the age, weight, and health requirements can donate blood. Typically, donors should be 18-65 years old and in good health.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "Whole blood can usually be donated every 8-12 weeks. Platelets and plasma donations may have different intervals.",
  },
  {
    question: "Is donating blood safe?",
    answer:
      "Yes! Blood donation is a safe process. All equipment is sterile and used only once, and trained professionals perform the procedure.",
  },
  {
    question: "How do I find blood donors near me?",
    answer:
      "You can use BloodConnect to search for donors in your area by blood type, location, and availability.",
  },
  {
    question: "Can I volunteer without donating blood?",
    answer:
      "Absolutely! You can volunteer to help organize drives, promote awareness, or assist at donation centers.",
  },
  {
    question: "What should I do before donating blood?",
    answer:
      "Make sure you are well-hydrated, have eaten a healthy meal, and bring a valid ID. Avoid alcohol before donation.",
  },
  {
    question: "Can I donate if I have a medical condition?",
    answer:
      "Certain medical conditions may prevent donation temporarily or permanently. It's best to consult with the BloodConnect team or your doctor.",
  },
  {
    question: "How is blood tested after donation?",
    answer:
      "All donated blood is screened for infectious diseases to ensure safety before transfusion.",
  },
  {
    question: "How long does the donation process take?",
    answer:
      "The entire process usually takes 30-45 minutes, including registration, health check, donation, and refreshments.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-700 text-center mb-10">
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 bg-red-50 hover:bg-red-100 cursor-pointer
                 transition"
              >
                <span className="text-left text-gray-800 font-medium">
                  {faq.question}
                </span>
                <span className="text-red-600">
                  {openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
