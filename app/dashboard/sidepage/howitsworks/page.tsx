import React from 'react';

const InterviewBotPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">How to Work with Our AI Interview Bot</h1>
      <p className="text-lg text-white mb-4">
        Our Interview Bot utilizes the powerful <span className="font-semibold text-green-500">ChatGPT 4.0</span> model to assist you in preparing for your upcoming interviews. To get started, simply input your interview field, tech stack, and years of experience. Specify the number of questions you&apos;d like the bot to generate based on your input. This customization ensures that the questions are relevant to your specific situation, enhancing your preparation.
      </p>
      <p className="text-lg text-white mb-4">
        Once you&apos;ve provided the necessary details, the AI will generate a set of relevant questions along with ideal answers tailored to your profile. This feature helps you understand the common questions asked in your industry, allowing you to prepare effectively and confidently. You&apos;ll also gain insights into the types of responses that interviewers typically expect.
      </p>
      <p className="text-lg text-white mb-4">
        You can then answer each question, simulating a real interview environment. For added confidence, you can open your webcam to practice your responses and utilize <span className="font-semibold text-blue-500">speech-to-text functionality</span>. This interactive approach not only makes the process more engaging but also aids in improving your verbal communication skills and body language, both of which are crucial during interviews.
      </p>
      <p className="text-lg text-white mb-4">
        After submitting your answers, the AI evaluates your responses, providing a rating out of 5. It offers constructive feedback and highlights expected answers, giving you valuable insights on how to enhance your performance. This feedback loop is essential for identifying strengths and areas for growth, enabling you to refine your answers and approach.
      </p>
      <p className="text-lg text-white mb-4">
        Our Interview Bot is user-friendly and designed to make interview preparation accessible for everyone. Whether you are a fresh graduate or an experienced professional, this tool caters to all levels of experience. By using this tool, you will not only prepare for interviews but also enhance your communication skills, learning how to articulate your thoughts clearly and effectively.
      </p>
      <p className="text-lg text-white mb-4">
        Take charge of your interview preparation with our AI Interview Bot. Experience the convenience and effectiveness of personalized interview coaching that fits your schedule and learning style. Embrace this innovative approach to build confidence and ensure you are well-prepared to impress your future employers!
      </p>
    </div>
  );
};

export default InterviewBotPage;
