import React from "react";
import images from "./images";
import {
  FaPaperPlane,
  FaEdit,
  FaRocket,
  FaShoppingCart,
  FaFileAlt,
  FaPhoneAlt,
  FaEnvelopeOpen,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { ImMagicWand } from "react-icons/im";
import { AiOutlineReload } from "react-icons/ai";

const gradient = "url(#blue-gradient)";

const initialQuestions = [
  {
    question: "1. How do you typically react to market volatility?",
    options: [
      "I see it as an opportunity to buy low and sell high.",
      "I prefer to stay out of the market until it stabilizes.",
      "I get anxious and often sell my holdings to avoid further loss.",
    ],
  },
  {
    question: "2. What is your investment horizon?",
    options: ["Less than 1 year", "1-3 years", "More than 3 years"],
  },
  {
    question:
      "3. How much time do you spend researching and monitoring your investments?",
    options: [
      "Several hours a week",
      "A few hours a month",
      "I rarely monitor my investments",
    ],
  },
  {
    question: "4. What is your primary goal in investing?",
    options: ["Rapid growth", "Steady income", "Preservation of capital"],
  },
  {
    question: "5. How do you feel about high-risk, high-reward investments?",
    options: [
      "Excited and willing to take the chance",
      "Cautious but open to a small percentage in my portfolio",
      "Uncomfortable and avoid them",
    ],
  },
  {
    question: "6. How diversified is your current investment portfolio?",
    options: [
      "Heavily diversified across sectors and asset classes",
      "Somewhat diversified",
      "Focused on a few sectors or types of investments",
    ],
  },
  {
    question:
      "7. Which of the following best describes your knowledge of financial markets?",
    options: [
      "Advanced, I follow market news and trends closely",
      "Intermediate, I have a good understanding of the basics",
      "Beginner, I’m still learning the fundamentals",
    ],
  },
  {
    question: "8. How do you typically make investment decisions?",
    options: [
      "Based on in-depth research and analysis",
      "Following advice from financial advisors or trusted sources",
      "Going with my gut feeling or tips from friends/family",
    ],
  },
  {
    question: "9. How important is liquidity to you in your investments?",
    options: [
      "Very important, I need to be able to sell quickly if needed",
      "Somewhat important, but I can wait if necessary",
      "Not important, I’m in it for the long term",
    ],
  },
  {
    question: "10. What is your response to a significant market downturn?",
    options: [
      "I buy more shares to take advantage of lower prices",
      "I hold my current investments and wait for recovery",
      "I sell my investments to avoid further losses",
    ],
  },
];

// Try to get questions from localStorage, or use initialQuestions
const savedQuestions = JSON.parse(localStorage.getItem("questions"));
const questions = savedQuestions || initialQuestions;

// Save questions to localStorage whenever they are updated
const saveQuestions = (updatedQuestions) => {
  localStorage.setItem("questions", JSON.stringify(updatedQuestions));
};

const updateQuestionArray = (index, newQuestion) => {
  questions[index].question = newQuestion;
  saveQuestions(questions);
};

const services = [
  {
    id: 1,
    icon: <FaPaperPlane style={{ fill: gradient }} />,
    title: "Digital Marketing",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
  },
  {
    id: 2,
    icon: <BiDollarCircle style={{ fill: gradient }} />,
    title: "Trade Shows",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
  },
  {
    id: 3,
    icon: <FaRocket style={{ fill: gradient }} />,
    title: "Branding",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
  },
  {
    id: 4,
    icon: <FaEdit style={{ fill: gradient }} />,
    title: "Content Creation",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
  },
  {
    id: 5,
    icon: <ImMagicWand style={{ fill: gradient }} />,
    title: "Graphic Design",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
  },
  {
    id: 6,
    icon: <FaShoppingCart style={{ fill: gradient }} />,
    title: "Media Buying",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
  },
];

const about = [
  {
    id: 7,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus leo et diam fermentum ullamcorper. Nulla venenatis nibh sollicitudin tincidunt gravida. Nam convallis justo et ligula luctus suscipit. Etiam eu nisi turpis. Donec sollicitudin accumsan quam, rhoncus sagittis metus semper quis. Praesent convallis mauris sed ipsum lobortis facilisis. Nulla cursus sem non nunc sagittis, a volutpat mauris lobortis. Nulla ut feugiat tellus. Nam dictum nisi nec scelerisque auctor",
  },
];

const qualities = [
  {
    id: 8,
    icon: <FaFileAlt style={{ fill: gradient }} />,
    title: "Innovative Solutions",
    text: "Our innovative solutions leverage AI to anticipate market trends and optimize trading strategies, ensuring proactive decision-making.",
  },
  {
    id: 9,
    icon: <AiOutlineReload style={{ fill: gradient }} />,
    title: "Dynamic Adaptability",
    text: "We prioritize dynamic adaptability, enabling seamless adjustments to market shifts and ensuring sustained performance across diverse financial environments.",
  },
];

const features = [
  {
    id: 10,
    title: "Digital Marketing",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc.",
  },
  {
    id: 11,
    title: "Trade Shows",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc.",
  },
  {
    id: 12,
    title: "Branding",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc.",
  },
  {
    id: 13,
    title: "Content Creation",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc.",
  },
  {
    id: 14,
    title: "Graphic Design",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc.",
  },
  {
    id: 15,
    title: "Media Buying",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc.",
  },
];

const portfolio = [
  {
    id: 16,
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
    image: images.portfolio1,
  },
  {
    id: 17,
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
    image: images.portfolio2,
  },
  {
    id: 18,
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
    image: images.portfolio3,
  },
];

const testimonials = [
  {
    id: 19,
    name: "Marie Jordan",
    text: "BestInvest's AI-powered tools have transformed how I manage my portfolio. Their insights are invaluable!",
    image: images.customer_img_1,
    rating: 5,
  },
  {
    id: 20,
    name: "Jason Stawer",
    text: "I'm impressed by BestInvest's real-time analytics. It helps me make informed decisions quickly.",
    image: images.customer_img_2,
    rating: 4,
  },
  {
    id: 21,
    name: "Michael Brown",
    text: "BestInvest has simplified risk assessment for me. It's a game-changer in financial planning.",
    image: images.customer_img_3,
    rating: 5,
  },
  {
    id: 22,
    name: "Sarah Davis",
    text: "Using BestInvest, I've seen significant improvements in my trading strategies. Highly recommended!",
    image: images.customer_img_4,
    rating: 4,
  },
  {
    id: 23,
    name: "Emma Johnson",
    text: "BestInvest's platform is intuitive and powerful. It's helped me optimize my investments effectively.",
    image: images.customer_img_5,
    rating: 5,
  },
  {
    id: 24,
    name: "Jessica Lee",
    text: "I appreciate BestInvest's commitment to innovation. Their support is exceptional!",
    image: images.customer_img_6,
    rating: 4,
  },
];

const contact = [
  {
    id: 22,
    icon: <FaPhoneAlt />,
    title: "Phone",
    text: "+1 123 456 7890",
  },
  {
    id: 23,
    icon: <FaEnvelopeOpen />,
    title: "Email",
    text: "info@example.com",
  },
  {
    id: 24,
    icon: <FaMapMarkerAlt />,
    title: "Address",
    text: "123 Main Street, Anytown, USA",
  },
];

const sections = {
  services,
  about,
  qualities,
  features,
  portfolio,
  testimonials,
  contact,
  questions,
  updateQuestionArray, // Add this to the export
};

export default sections;
