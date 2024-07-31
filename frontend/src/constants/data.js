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
    title: "Grpahic Design",
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
    image: images.portfolio_img_1,
  },
  {
    id: 17,
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
    image: images.portfolio_img_2,
  },
  {
    id: 18,
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
    image: images.portfolio_img_3,
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
    id: 25,
    icon: <FaPhoneAlt style={{ fill: gradient }} />,
    info: "+425 235 712",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
  },
  {
    id: 26,
    icon: <FaEnvelopeOpen style={{ fill: gradient }} />,
    info: "solnhub@info.com",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
  },
  {
    id: 27,
    icon: <FaMapMarkerAlt style={{ fill: gradient }} />,
    info: "United Kingdom, New Street",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
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
};

export default sections;
