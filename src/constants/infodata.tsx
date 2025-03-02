import {
   BrainCircuit,
   Briefcase,
   LineChart,
   ScrollText,
   UserPlus,
   FileEdit,
   Users,
} from "lucide-react";
import { ReactNode } from "react";

interface infoData {
   icon: ReactNode;
   title: string;
   description: string;
}

export const features: infoData[] = [
   {
      icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
      title: "Smart Career Mapping",
      description:
         "Navigate your professional journey with AI-powered insights and data-driven strategies that adapt to market trends.",
   },
   {
      icon: <Briefcase className="w-10 h-10 mb-4 text-primary" />,
      title: "Job Interview Simulator",
      description:
         "Experience realistic mock interviews and get instant feedback to hone your skills and boost your confidence.",
   },
   {
      icon: <LineChart className="w-10 h-10 mb-4 text-primary" />,
      title: "Real-Time Market Analysis",
      description:
         "Access up-to-date industry reports, salary benchmarks, and trend forecasts tailored to your field.",
   },
   {
      icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
      title: "Dynamic Document Builder",
      description:
         "Create customized, ATS-optimized resumes and cover letters effortlessly with our intelligent document tools.",
   },
   {
      icon: <UserPlus className="w-10 h-10 mb-4 text-primary" />,
      title: "Personalized Networking",
      description:
         "Expand your professional connections with AI-suggested contacts and curated industry events designed just for you.",
   },
];

export const howItWorks: infoData[] = [
   {
      title: "Customized Onboarding",
      description:
         "Kickstart your journey by sharing your professional background and aspirations for a tailored experience.",
      icon: <UserPlus className="w-8 h-8 text-primary" />,
   },
   {
      title: "Build Your Profile",
      description:
         "Generate impactful resumes and cover letters that highlight your strengths and align with industry standards.",
      icon: <FileEdit className="w-8 h-8 text-primary" />,
   },
   {
      title: "Simulate Interviews",
      description:
         "Engage in interactive mock interviews that replicate real-world scenarios and provide constructive feedback.",
      icon: <Users className="w-8 h-8 text-primary" />,
   },
   {
      title: "Monitor Your Progress",
      description:
         "Track your improvement with detailed analytics and actionable insights to continually refine your skills.",
      icon: <LineChart className="w-8 h-8 text-primary" />,
   },
   {
      title: "Connect with Mentors",
      description:
         "Benefit from one-on-one guidance and advice from industry veterans to accelerate your career growth.",
      icon: <Briefcase className="w-8 h-8 text-primary" />,
   },
];

export const testimonial = [
   {
      quote: "The AI-powered career mapping completely transformed my approach to job hunting. I discovered opportunities I never imagined!",
      author: "Alex Morgan",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Data Scientist",
      company: "Innovate Tech",
   },
   {
      quote: "The interview simulator was incredibly realistic. I walked into my interviews confident and well-prepared.",
      author: "Jamie Lee",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "UX Designer",
      company: "Creative Minds",
   },
   {
      quote: "Their dynamic document builder streamlined my resume creation process, making it both intuitive and effective.",
      author: "Riley Thompson",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      role: "Project Manager",
      company: "Enterprise Solutions",
   },
   {
      quote: "I loved the personalized networking feature—it connected me with professionals who were perfect for my career advancement.",
      author: "Morgan Smith",
      image: "https://randomuser.me/api/portraits/women/85.jpg",
      role: "Marketing Strategist",
      company: "Global Brands",
   },
];

export const faqs = [
   {
      question:
         "What sets this platform apart from other career development tools?",
      answer:
         "Our platform uniquely combines AI-driven insights with a personalized approach, offering tools that adapt to your specific career goals and industry trends.",
   },
   {
      question:
         "How does the platform tailor content to my professional needs?",
      answer:
         "By analyzing your background and aspirations during onboarding, our AI customizes resumes, cover letters, and interview simulations to fit your unique profile.",
   },
   {
      question: "How often is the market analysis updated?",
      answer:
         "We update our industry data in real time, ensuring you have access to the latest trends, salary benchmarks, and job market insights every day.",
   },
   {
      question: "Is my personal data secure with this platform?",
      answer:
         "Absolutely. We employ state-of-the-art encryption and industry-standard security protocols to safeguard your information at all times.",
   },
   {
      question: "Can I customize the AI-generated content?",
      answer:
         "Yes, you have full control to edit and personalize all generated resumes, cover letters, and interview materials to match your specific needs.",
   },
   {
      question: "What support resources are available if I need assistance?",
      answer:
         "Our dedicated support team is available 24/7, and we provide a comprehensive knowledge base with tutorials, FAQs, and live chat options to help you at every step.",
   },
];
