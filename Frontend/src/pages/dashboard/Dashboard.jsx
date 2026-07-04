import useAuth from "../../hooks/useAuth";
import ProjectCard from "../../components/project/ProjectCard";
const Dashboard = () => {

    const { user, token } = useAuth();


const dummyProjects = [
  {
    title: 'E-commerce Website Development',
    status: 'open',
    description: 'Need a full-stack e-commerce website with payment integration and admin dashboard.',
    skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    budget: '$1,500 - $3,000',
    level: 'Intermediate',
    proposals: 5,
    time: '2d ago'
  },
  {
    title: 'Fitness Tracking Mobile App',
    status: 'open',
    description: 'Build a cross-platform mobile app for workout tracking, nutrition, and progress analytics.',
    skills: ['React Native', 'Express.js', 'MongoDB', 'Chart.js'],
    budget: '$2,000 - $4,000',
    level: 'Expert',
    proposals: 8,
    time: '1d ago'
  },
  {
    title: 'SaaS Dashboard UI/UX Design',
    status: 'featured',
    description: 'Design a modern and responsive dashboard for a SaaS product with dark mode support.',
    skills: ['Figma', 'UI/UX', 'Adobe XD', 'Design Systems'],
    budget: '$800 - $1,500',
    level: 'Intermediate',
    proposals: 12,
    time: '3d ago'
  },
  {
    title: 'Restaurant Booking Platform',
    status: 'open',
    description: 'Develop an online reservation platform with table management and payment integration.',
    skills: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe'],
    budget: '$2,500 - $5,000',
    level: 'Expert',
    proposals: 6,
    time: '5h ago'
  },
  {
    title: 'Portfolio Website Redesign',
    status: 'open',
    description: 'Need a clean, modern portfolio website with animations and responsive design.',
    skills: ['React', 'Framer Motion', 'CSS', 'Vite'],
    budget: '$500 - $900',
    level: 'Beginner',
    proposals: 18,
    time: '6h ago'
  },
  {
    title: 'AI Resume Builder',
    status: 'featured',
    description: 'Build an AI-powered resume builder with PDF export and template customization.',
    skills: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    budget: '$3,000 - $6,000',
    level: 'Expert',
    proposals: 10,
    time: '4d ago'
  },
  {
    title: 'School Management System',
    status: 'open',
    description: 'Develop a web-based ERP for schools including attendance, fees, and exam management.',
    skills: ['Angular', 'NestJS', 'MySQL', 'JWT'],
    budget: '$4,000 - $7,000',
    level: 'Expert',
    proposals: 4,
    time: '12h ago'
  },
  {
    title: 'Real Estate Listing Website',
    status: 'open',
    description: 'Need a responsive property listing platform with advanced search and Google Maps integration.',
    skills: ['React', 'Firebase', 'Google Maps API', 'Tailwind CSS'],
    budget: '$1,800 - $3,500',
    level: 'Intermediate',
    proposals: 9,
    time: '8h ago'
  },
  {
    title: 'Crypto Portfolio Tracker',
    status: 'featured',
    description: 'Create a dashboard to track cryptocurrency investments with live market data.',
    skills: ['Vue.js', 'Node.js', 'CoinGecko API', 'Chart.js'],
    budget: '$1,200 - $2,500',
    level: 'Intermediate',
    proposals: 7,
    time: '2d ago'
  },
  {
    title: 'Job Portal Platform',
    status: 'open',
    description: 'Build a complete job portal with employer dashboard, candidate profiles, and resume uploads.',
    skills: ['React', 'Express.js', 'MongoDB', 'Cloudinary'],
    budget: '$3,500 - $6,500',
    level: 'Expert',
    proposals: 15,
    time: '1d ago'
  }
];

    return (

         <div style={{ padding: '24px', maxWidth: '600px' }}>
      {dummyProjects.map((project, index) => (
    <ProjectCard key={index} project={project} />
))}
    </div>

    );

};

export default Dashboard;