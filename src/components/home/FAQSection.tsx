import { ChevronDown, ChevronUp } from "lucide-preact";
import { faqs, title, text, moreQs, subtitle } from "../../content/faq";
import { useState } from "preact/hooks";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => {
  const answerId = `faq-answer-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-5">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <h3 className="text-lg font-medium text-secondary dark:text-white">
          {question}
        </h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary" />
          )}
        </span>
      </button>
      <div
        id={answerId}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-neutral-text dark:text-gray-300 pr-12 pb-4">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-neutral-text dark:text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-neutral-text dark:text-gray-300 mb-6">{text}</p>
          <a href={moreQs.url} className="inline-block bg-primary text-white py-3 px-8 rounded-md font-bold hover:bg-primary-dark transition-all shadow-lg">
            {moreQs.title}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
