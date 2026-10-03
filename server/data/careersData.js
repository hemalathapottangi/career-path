/**
 * CareerPath - Central Career Data Store
 * SRS Appendix C: Career Data Reference
 * SRS Appendix D: Recommendation Logic Reference
 */

const SKILLS_CATALOG = [
  // Programming & Development
  { id: 'programming', label: 'Programming', category: 'Development' },
  { id: 'data_structures', label: 'Data Structures & Algorithms', category: 'Development' },
  { id: 'git', label: 'Git / Version Control', category: 'Development' },
  { id: 'problem_solving', label: 'Problem Solving', category: 'Development' },
  { id: 'database_basics', label: 'Database Basics', category: 'Development' },
  { id: 'html', label: 'HTML', category: 'Web' },
  { id: 'css', label: 'CSS', category: 'Web' },
  { id: 'javascript', label: 'JavaScript', category: 'Web' },
  { id: 'react', label: 'React', category: 'Web' },
  { id: 'github', label: 'GitHub', category: 'Development' },
  // Data
  { id: 'excel', label: 'Excel / Spreadsheets', category: 'Data' },
  { id: 'sql', label: 'SQL', category: 'Data' },
  { id: 'python', label: 'Python', category: 'Data' },
  { id: 'statistics', label: 'Statistics', category: 'Data' },
  { id: 'data_visualization', label: 'Data Visualization', category: 'Data' },
  { id: 'machine_learning', label: 'Machine Learning', category: 'Data' },
  // Design
  { id: 'ui_design', label: 'UI Design', category: 'Design' },
  { id: 'ux_principles', label: 'UX Principles', category: 'Design' },
  { id: 'figma', label: 'Figma', category: 'Design' },
  { id: 'wireframing', label: 'Wireframing', category: 'Design' },
  { id: 'user_research', label: 'User Research', category: 'Design' },
  // Cybersecurity
  { id: 'networking', label: 'Networking', category: 'Cybersecurity' },
  { id: 'linux', label: 'Linux', category: 'Systems' },
  { id: 'cybersecurity_fundamentals', label: 'Cybersecurity Fundamentals', category: 'Cybersecurity' },
  { id: 'security_tools', label: 'Security Tools', category: 'Cybersecurity' },
  // Cloud / DevOps
  { id: 'cloud_fundamentals', label: 'Cloud Fundamentals', category: 'Cloud' },
  { id: 'cloud_platforms', label: 'Cloud Platforms (AWS/GCP/Azure)', category: 'Cloud' },
  { id: 'cicd', label: 'CI/CD Pipelines', category: 'DevOps' },
  { id: 'docker', label: 'Docker', category: 'DevOps' },
];

const INTERESTS_CATALOG = [
  { id: 'web_development', label: 'Web Development' },
  { id: 'data_analytics', label: 'Data Analytics' },
  { id: 'machine_learning_ai', label: 'Machine Learning / AI' },
  { id: 'ui_ux_design', label: 'UI/UX Design' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'cloud_computing', label: 'Cloud Computing' },
  { id: 'devops', label: 'DevOps / Automation' },
  { id: 'software_engineering', label: 'Software Engineering' },
  { id: 'open_source', label: 'Open Source' },
  { id: 'mobile_dev', label: 'Mobile Development' },
];

const CAREERS = [
  {
    id: 'software_developer',
    title: 'Software Developer',
    category: 'Development',
    difficulty: 'Intermediate',
    shortDescription: 'Build software applications, write clean code, and solve real-world problems using programming and engineering principles.',
    overview: 'Software Developers design, build, and maintain software systems. They write code, collaborate with teams, debug problems, and create applications that users rely on daily. This is one of the most in-demand and versatile tech careers.',
    requiredSkills: ['programming', 'data_structures', 'git', 'problem_solving', 'database_basics'],
    skillPriority: { programming: 1, problem_solving: 2, data_structures: 3, database_basics: 4, git: 5 },
    relatedInterests: ['software_engineering', 'open_source', 'web_development', 'mobile_dev'],
    relevantDegrees: ['Computer Science', 'Information Technology', 'Electronics'],
    partlyRelevantDegrees: ['Electrical', 'Mechanical'],
    roadmap: [
      { step: 1, title: 'Master a Programming Language', description: 'Start with Python or JavaScript. Focus on syntax, logic, and problem-solving.', duration: '4-6 weeks' },
      { step: 2, title: 'Learn Data Structures & Algorithms', description: 'Arrays, lists, trees, sorting — these are asked in every tech interview.', duration: '6-8 weeks' },
      { step: 3, title: 'Understand Database Basics', description: 'Learn SQL, how databases store data, and how to query them.', duration: '2-3 weeks' },
      { step: 4, title: 'Use Git & GitHub', description: 'Version control is essential for every developer. Practise daily commits.', duration: '1 week' },
      { step: 5, title: 'Build 2-3 Projects', description: 'Apply everything by building real projects. Add them to GitHub.', duration: '4-6 weeks' },
      { step: 6, title: 'Create Portfolio & Apply', description: 'Write a clean GitHub README, create a LinkedIn profile, and apply for internships.', duration: 'Ongoing' },
    ],
    projects: [
      { title: 'To-Do Application', description: 'A CRUD app with add, edit, delete tasks. Practises programming fundamentals.', difficulty: 'Beginner' },
      { title: 'Student Grade Calculator', description: 'Input marks, compute grades, store in a database. Practises all required skills.', difficulty: 'Beginner' },
      { title: 'Library Management System', description: 'Track books, members, and loans. Great for practising OOP and database design.', difficulty: 'Intermediate' },
    ],
    resources: {
      programming: [
        { title: 'Python for Everybody – freeCodeCamp', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', type: 'Tutorial' },
        { title: 'Official Python Docs', url: 'https://docs.python.org/3/tutorial/', type: 'Documentation' },
        { title: 'HackerRank Python Practice', url: 'https://www.hackerrank.com/domains/python', type: 'Practice' },
      ],
      data_structures: [
        { title: 'DSA – freeCodeCamp YouTube', url: 'https://www.youtube.com/watch?v=8hly31xKli0', type: 'Tutorial' },
        { title: 'LeetCode Easy Problems', url: 'https://leetcode.com/problemset/all/?difficulty=EASY', type: 'Practice' },
      ],
      git: [
        { title: 'Git Handbook – GitHub', url: 'https://guides.github.com/introduction/git-handbook/', type: 'Documentation' },
        { title: 'Learn Git Branching (Interactive)', url: 'https://learngitbranching.js.org/', type: 'Practice' },
      ],
      problem_solving: [
        { title: 'HackerRank Problem Solving', url: 'https://www.hackerrank.com/domains/algorithms', type: 'Practice' },
      ],
      database_basics: [
        { title: 'SQL Tutorial – W3Schools', url: 'https://www.w3schools.com/sql/', type: 'Tutorial' },
        { title: 'SQLBolt Interactive SQL', url: 'https://sqlbolt.com/', type: 'Practice' },
      ],
    },
  },

  {
    id: 'web_developer',
    title: 'Web Developer',
    category: 'Development',
    difficulty: 'Beginner-Friendly',
    shortDescription: 'Create websites and web applications using HTML, CSS, JavaScript, and modern frameworks like React.',
    overview: 'Web Developers build and maintain websites and web applications. Front-end developers focus on what users see; back-end developers manage servers and databases. Full-stack developers do both. It is one of the most accessible tech careers to start.',
    requiredSkills: ['html', 'css', 'javascript', 'react', 'git'],
    skillPriority: { html: 1, css: 2, javascript: 3, git: 4, react: 5 },
    relatedInterests: ['web_development', 'ui_ux_design', 'open_source', 'software_engineering'],
    relevantDegrees: ['Computer Science', 'Information Technology'],
    partlyRelevantDegrees: ['Electronics', 'Electrical'],
    roadmap: [
      { step: 1, title: 'HTML – Structure of the Web', description: 'Learn headings, paragraphs, links, images, forms, and semantic elements.', duration: '1-2 weeks' },
      { step: 2, title: 'CSS – Styling & Layouts', description: 'Master Flexbox, Grid, responsiveness. Make sites look great on all screens.', duration: '2-3 weeks' },
      { step: 3, title: 'JavaScript – Make it Interactive', description: 'DOM manipulation, events, fetch API, ES6+. The core of front-end dev.', duration: '4-6 weeks' },
      { step: 4, title: 'Git & GitHub', description: 'Track your code changes, collaborate, and host projects on GitHub.', duration: '1 week' },
      { step: 5, title: 'React – Modern Front-End', description: 'Components, props, state, hooks. The most in-demand front-end library.', duration: '4-6 weeks' },
      { step: 6, title: 'Build Portfolio & Apply', description: 'Create 3 projects, deploy them, and share on LinkedIn and GitHub.', duration: 'Ongoing' },
    ],
    projects: [
      { title: 'Personal Portfolio Website', description: 'Showcase your skills and projects. Practises HTML, CSS, and JavaScript.', difficulty: 'Beginner' },
      { title: 'To-Do App with React', description: 'Add, complete, and delete tasks with React state management.', difficulty: 'Beginner' },
      { title: 'Weather App', description: 'Fetch weather data from a public API and display it. Practises JavaScript and React.', difficulty: 'Intermediate' },
    ],
    resources: {
      html: [
        { title: 'HTML Tutorial – MDN', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', type: 'Documentation' },
        { title: 'HTML Crash Course – freeCodeCamp', url: 'https://www.freecodecamp.org/learn/responsive-web-design/', type: 'Tutorial' },
      ],
      css: [
        { title: 'CSS Tutorial – MDN', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS', type: 'Documentation' },
        { title: 'Flexbox Froggy (Interactive)', url: 'https://flexboxfroggy.com/', type: 'Practice' },
      ],
      javascript: [
        { title: 'JavaScript.info', url: 'https://javascript.info/', type: 'Tutorial' },
        { title: 'freeCodeCamp JavaScript', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', type: 'Tutorial' },
      ],
      react: [
        { title: 'Official React Docs', url: 'https://react.dev/learn', type: 'Documentation' },
        { title: 'React Tutorial – freeCodeCamp', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/#react', type: 'Tutorial' },
      ],
      git: [
        { title: 'Git Handbook – GitHub', url: 'https://guides.github.com/introduction/git-handbook/', type: 'Documentation' },
        { title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', type: 'Practice' },
      ],
    },
  },

  {
    id: 'data_analyst',
    title: 'Data Analyst',
    category: 'Data',
    difficulty: 'Beginner-Friendly',
    shortDescription: 'Analyse data to find patterns, create dashboards, and help organisations make data-driven decisions.',
    overview: 'Data Analysts collect, clean, and analyse datasets to answer business questions. They use spreadsheets, SQL, and Python to explore data, and tools like Tableau or Power BI to build dashboards and communicate findings clearly.',
    requiredSkills: ['excel', 'sql', 'python', 'statistics', 'data_visualization'],
    skillPriority: { excel: 1, sql: 2, statistics: 3, python: 4, data_visualization: 5 },
    relatedInterests: ['data_analytics', 'machine_learning_ai', 'software_engineering'],
    relevantDegrees: ['Computer Science', 'Information Technology'],
    partlyRelevantDegrees: ['Electrical', 'Mechanical', 'Civil'],
    roadmap: [
      { step: 1, title: 'Excel & Spreadsheets', description: 'Formulas, pivot tables, basic charts. The entry point for every data analyst.', duration: '2-3 weeks' },
      { step: 2, title: 'SQL – Query Databases', description: 'SELECT, JOIN, GROUP BY — pull any data you need from databases.', duration: '3-4 weeks' },
      { step: 3, title: 'Statistics Fundamentals', description: 'Mean, median, standard deviation, correlation. Understand your data properly.', duration: '3-4 weeks' },
      { step: 4, title: 'Python for Data Analysis', description: 'Pandas, NumPy. Automate data cleaning and analysis.', duration: '4-6 weeks' },
      { step: 5, title: 'Data Visualisation', description: 'Matplotlib, Seaborn, Power BI or Tableau. Tell stories with data.', duration: '3-4 weeks' },
      { step: 6, title: 'Build Projects & Portfolio', description: 'Analyse real datasets from Kaggle. Present findings clearly.', duration: 'Ongoing' },
    ],
    projects: [
      { title: 'Sales Dashboard', description: 'Analyse a sales CSV, compute revenue trends, and create charts. Core DA project.', difficulty: 'Beginner' },
      { title: 'Student Performance Analysis', description: 'Load a dataset, compute averages, find patterns, visualise with Python.', difficulty: 'Beginner' },
      { title: 'COVID-19 Data Explorer', description: 'Analyse public COVID data — cases, trends, country comparisons with Pandas.', difficulty: 'Intermediate' },
    ],
    resources: {
      excel: [
        { title: 'Excel for Beginners – GCF Global', url: 'https://edu.gcfglobal.org/en/excel/', type: 'Tutorial' },
      ],
      sql: [
        { title: 'SQLBolt – Interactive SQL', url: 'https://sqlbolt.com/', type: 'Practice' },
        { title: 'W3Schools SQL', url: 'https://www.w3schools.com/sql/', type: 'Tutorial' },
      ],
      python: [
        { title: 'Python for Data Analysis – Kaggle', url: 'https://www.kaggle.com/learn/python', type: 'Tutorial' },
        { title: 'Pandas Documentation', url: 'https://pandas.pydata.org/docs/getting_started/index.html', type: 'Documentation' },
      ],
      statistics: [
        { title: 'Statistics – Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'Tutorial' },
      ],
      data_visualization: [
        { title: 'Data Visualisation – Kaggle', url: 'https://www.kaggle.com/learn/data-visualization', type: 'Tutorial' },
        { title: 'Matplotlib Official Tutorial', url: 'https://matplotlib.org/stable/tutorials/index.html', type: 'Documentation' },
      ],
    },
  },

  {
    id: 'data_scientist',
    title: 'Data Scientist',
    category: 'Data',
    difficulty: 'Advanced',
    shortDescription: 'Build machine learning models, extract insights from complex datasets, and drive strategic decisions with AI and statistics.',
    overview: 'Data Scientists combine programming, statistics, and domain knowledge to build predictive models and discover patterns in large datasets. They work at the intersection of statistics, programming, and business strategy.',
    requiredSkills: ['python', 'statistics', 'machine_learning', 'sql', 'data_visualization'],
    skillPriority: { python: 1, statistics: 2, sql: 3, data_visualization: 4, machine_learning: 5 },
    relatedInterests: ['machine_learning_ai', 'data_analytics', 'software_engineering'],
    relevantDegrees: ['Computer Science', 'Information Technology'],
    partlyRelevantDegrees: ['Electrical', 'Mechanical'],
    roadmap: [
      { step: 1, title: 'Python & Data Libraries', description: 'NumPy, Pandas, Matplotlib. Foundation of every data scientist.', duration: '4-6 weeks' },
      { step: 2, title: 'Statistics & Probability', description: 'Distributions, hypothesis testing, Bayesian thinking. Essential for ML.', duration: '4-6 weeks' },
      { step: 3, title: 'SQL for Data Science', description: 'Extract data, aggregate, and join tables for analysis.', duration: '2-3 weeks' },
      { step: 4, title: 'Data Visualisation & EDA', description: 'Seaborn, Plotly. Explore datasets before modelling.', duration: '2-3 weeks' },
      { step: 5, title: 'Machine Learning', description: 'Scikit-learn — regression, classification, clustering, evaluation metrics.', duration: '6-8 weeks' },
      { step: 6, title: 'Projects & Competitions', description: 'Kaggle competitions, build an ML portfolio, deploy a model.', duration: 'Ongoing' },
    ],
    projects: [
      { title: 'House Price Predictor', description: 'Regression model to predict house prices from features. Classic ML project.', difficulty: 'Intermediate' },
      { title: 'Customer Churn Prediction', description: 'Classify whether customers will leave. Practises classification and feature engineering.', difficulty: 'Intermediate' },
      { title: 'Movie Recommendation System', description: 'Collaborative filtering to recommend movies. Practises ML and data pipelines.', difficulty: 'Advanced' },
    ],
    resources: {
      python: [
        { title: 'Python for Data Science – Kaggle', url: 'https://www.kaggle.com/learn/python', type: 'Tutorial' },
      ],
      statistics: [
        { title: 'Statistics – Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'Tutorial' },
      ],
      machine_learning: [
        { title: 'Machine Learning – Kaggle', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', type: 'Tutorial' },
        { title: 'Scikit-learn Documentation', url: 'https://scikit-learn.org/stable/getting_started.html', type: 'Documentation' },
      ],
      sql: [
        { title: 'SQLBolt', url: 'https://sqlbolt.com/', type: 'Practice' },
      ],
      data_visualization: [
        { title: 'Data Visualisation – Kaggle', url: 'https://www.kaggle.com/learn/data-visualization', type: 'Tutorial' },
      ],
    },
  },

  {
    id: 'uiux_designer',
    title: 'UI/UX Designer',
    category: 'Design',
    difficulty: 'Beginner-Friendly',
    shortDescription: 'Design beautiful, user-friendly interfaces and craft experiences that delight users and meet business goals.',
    overview: 'UI/UX Designers create the look and feel of digital products. UI focuses on visual design (colours, typography, layouts) while UX focuses on the user experience (research, flows, usability). Figma is the industry-standard tool.',
    requiredSkills: ['ui_design', 'ux_principles', 'figma', 'wireframing', 'user_research'],
    skillPriority: { ux_principles: 1, wireframing: 2, figma: 3, ui_design: 4, user_research: 5 },
    relatedInterests: ['ui_ux_design', 'web_development', 'software_engineering'],
    relevantDegrees: ['Computer Science', 'Information Technology'],
    partlyRelevantDegrees: ['Electronics', 'Civil', 'Mechanical'],
    roadmap: [
      { step: 1, title: 'UX Principles & Design Thinking', description: 'Empathy maps, user journeys, the 5 stages of design thinking.', duration: '2-3 weeks' },
      { step: 2, title: 'Wireframing', description: 'Sketch low-fidelity screens on paper or with Balsamiq before going to Figma.', duration: '1-2 weeks' },
      { step: 3, title: "Figma \u2013 The Designer's Tool", description: 'Frames, components, auto layout, prototyping. Master the industry tool.', duration: '4-6 weeks' },
      { step: 4, title: 'UI Design Principles', description: 'Colour theory, typography, spacing, visual hierarchy, accessibility.', duration: '2-3 weeks' },
      { step: 5, title: 'User Research', description: 'Interviews, surveys, usability testing. Design for real users, not assumptions.', duration: '2-3 weeks' },
      { step: 6, title: 'Build Portfolio & Apply', description: 'Create 3 case studies showing your design process. Share on Behance or Dribbble.', duration: 'Ongoing' },
    ],
    projects: [
      { title: 'Mobile App Redesign', description: 'Pick a real app you use and redesign its UI in Figma. Classic portfolio piece.', difficulty: 'Beginner' },
      { title: 'E-Commerce Website Design', description: 'Design a product listing, cart, and checkout flow. Practises all UI/UX skills.', difficulty: 'Intermediate' },
      { title: 'Accessibility Audit & Redesign', description: 'Audit an existing site for WCAG compliance and redesign to fix issues.', difficulty: 'Intermediate' },
    ],
    resources: {
      ui_design: [
        { title: 'UI Design Fundamentals – Google UX', url: 'https://www.coursera.org/professional-certificates/google-ux-design', type: 'Tutorial' },
      ],
      ux_principles: [
        { title: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/literature', type: 'Documentation' },
      ],
      figma: [
        { title: 'Figma Tutorials – Official', url: 'https://www.figma.com/resources/learn-design/', type: 'Tutorial' },
        { title: 'Figma for Beginners – YouTube', url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8', type: 'Tutorial' },
      ],
      wireframing: [
        { title: 'Wireframing Guide – Figma', url: 'https://www.figma.com/resource-library/what-is-wireframing/', type: 'Documentation' },
      ],
      user_research: [
        { title: 'UX Research Methods – NNGroup', url: 'https://www.nngroup.com/articles/which-ux-research-methods/', type: 'Documentation' },
      ],
    },
  },

  {
    id: 'cybersecurity_analyst',
    title: 'Cybersecurity Analyst',
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    shortDescription: 'Protect systems, networks, and data from cyber threats. Monitor, detect, and respond to security incidents.',
    overview: 'Cybersecurity Analysts protect an organisation\'s digital assets. They monitor networks for threats, investigate incidents, run vulnerability assessments, and ensure compliance. It is a high-demand, high-impact career.',
    requiredSkills: ['networking', 'linux', 'cybersecurity_fundamentals', 'security_tools', 'problem_solving'],
    skillPriority: { networking: 1, linux: 2, cybersecurity_fundamentals: 3, problem_solving: 4, security_tools: 5 },
    relatedInterests: ['cybersecurity', 'software_engineering', 'cloud_computing'],
    relevantDegrees: ['Computer Science', 'Information Technology', 'Electronics'],
    partlyRelevantDegrees: ['Electrical'],
    roadmap: [
      { step: 1, title: 'Networking Fundamentals', description: 'TCP/IP, DNS, HTTP, firewalls. You cannot secure what you do not understand.', duration: '3-4 weeks' },
      { step: 2, title: 'Linux Command Line', description: 'File system, users, permissions, networking commands. Linux is essential for security work.', duration: '3-4 weeks' },
      { step: 3, title: 'Cybersecurity Fundamentals', description: 'CIA triad, threat models, attack types, encryption basics.', duration: '4-6 weeks' },
      { step: 4, title: 'Security Tools', description: 'Wireshark, Nmap, Metasploit basics, Burp Suite. Hands-on with real tools.', duration: '4-6 weeks' },
      { step: 5, title: 'CTF Challenges & Labs', description: 'TryHackMe, Hack The Box. Practice in safe, legal environments.', duration: 'Ongoing' },
      { step: 6, title: 'Certifications & Jobs', description: 'CompTIA Security+, CEH (Certified Ethical Hacker). Build a lab portfolio.', duration: 'Ongoing' },
    ],
    projects: [
      { title: 'Password Strength Checker', description: 'Build a tool that analyses password strength and suggests improvements.', difficulty: 'Beginner' },
      { title: 'Network Scanner', description: 'Use Python + Scapy to scan a local network and list connected devices.', difficulty: 'Intermediate' },
      { title: 'Home Security Lab', description: 'Set up VMs with Kali Linux and vulnerable targets. Practice penetration testing legally.', difficulty: 'Intermediate' },
    ],
    resources: {
      networking: [
        { title: 'Networking Fundamentals – freeCodeCamp', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', type: 'Tutorial' },
        { title: 'Professor Messer CompTIA Network+', url: 'https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/', type: 'Tutorial' },
      ],
      linux: [
        { title: 'Linux Command Line – freeCodeCamp', url: 'https://www.freecodecamp.org/news/the-linux-commands-handbook/', type: 'Tutorial' },
        { title: 'OverTheWire Bandit (Linux Practice)', url: 'https://overthewire.org/wargames/bandit/', type: 'Practice' },
      ],
      cybersecurity_fundamentals: [
        { title: 'TryHackMe – Pre-Security Path', url: 'https://tryhackme.com/path/outline/presecurity', type: 'Tutorial' },
        { title: 'Cybersecurity for Beginners – SANS', url: 'https://www.sans.org/cyber-security-courses/security-essentials-network-endpoint-cloud/', type: 'Documentation' },
      ],
      security_tools: [
        { title: 'Wireshark Beginners – David Bombal', url: 'https://www.youtube.com/watch?v=lb1Dw0elw0Q', type: 'Tutorial' },
      ],
      problem_solving: [
        { title: 'HackerRank Problem Solving', url: 'https://www.hackerrank.com/domains/algorithms', type: 'Practice' },
      ],
    },
  },

  {
    id: 'cloud_engineer',
    title: 'Cloud Engineer',
    category: 'Cloud',
    difficulty: 'Intermediate',
    shortDescription: 'Design, build, and manage cloud infrastructure on platforms like AWS, GCP, or Azure to power modern applications.',
    overview: 'Cloud Engineers build and manage the infrastructure that powers modern applications. They provision servers, set up networks, automate deployments, and ensure reliability, scalability, and security in the cloud.',
    requiredSkills: ['linux', 'networking', 'cloud_fundamentals', 'git', 'cloud_platforms'],
    skillPriority: { linux: 1, networking: 2, git: 3, cloud_fundamentals: 4, cloud_platforms: 5 },
    relatedInterests: ['cloud_computing', 'devops', 'software_engineering', 'cybersecurity'],
    relevantDegrees: ['Computer Science', 'Information Technology', 'Electronics', 'Electrical'],
    partlyRelevantDegrees: ['Mechanical', 'Civil'],
    roadmap: [
      { step: 1, title: 'Linux & Command Line', description: 'Cloud servers run Linux. Get comfortable with the terminal.', duration: '3-4 weeks' },
      { step: 2, title: 'Networking Basics', description: 'VPCs, subnets, load balancers, DNS. Essential cloud concepts.', duration: '3-4 weeks' },
      { step: 3, title: 'Git & Version Control', description: 'Track infrastructure code. Every cloud engineer needs Git.', duration: '1 week' },
      { step: 4, title: 'Cloud Fundamentals', description: 'Core services: compute, storage, networking, IAM on AWS/GCP/Azure.', duration: '4-6 weeks' },
      { step: 5, title: 'Cloud Platforms – Hands On', description: 'Build real projects on AWS Free Tier. Launch EC2, S3, RDS, Lambda.', duration: '6-8 weeks' },
      { step: 6, title: 'Certifications & Portfolio', description: 'AWS Cloud Practitioner or GCP Associate Cloud Engineer. Document projects.', duration: 'Ongoing' },
    ],
    projects: [
      { title: 'Static Website on S3', description: 'Host a static site on AWS S3 with CloudFront CDN. Beginner cloud project.', difficulty: 'Beginner' },
      { title: 'Serverless API', description: 'Build a REST API with AWS Lambda + API Gateway + DynamoDB.', difficulty: 'Intermediate' },
      { title: 'Three-Tier Architecture', description: 'Deploy a web app with load balancer, app server, and managed database in AWS.', difficulty: 'Advanced' },
    ],
    resources: {
      linux: [
        { title: 'Linux Command Line Basics – Udemy', url: 'https://www.freecodecamp.org/news/the-linux-commands-handbook/', type: 'Tutorial' },
      ],
      networking: [
        { title: 'AWS Networking Fundamentals', url: 'https://aws.amazon.com/getting-started/hands-on/', type: 'Documentation' },
      ],
      cloud_fundamentals: [
        { title: 'AWS Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', type: 'Tutorial' },
        { title: 'Google Cloud Fundamentals', url: 'https://cloud.google.com/training/courses', type: 'Tutorial' },
      ],
      git: [
        { title: 'Git Handbook – GitHub', url: 'https://guides.github.com/introduction/git-handbook/', type: 'Documentation' },
      ],
      cloud_platforms: [
        { title: 'AWS Free Tier Hands-On', url: 'https://aws.amazon.com/free/', type: 'Practice' },
        { title: 'GCP Free Tier', url: 'https://cloud.google.com/free', type: 'Practice' },
      ],
    },
  },

  {
    id: 'devops_engineer',
    title: 'DevOps Engineer',
    category: 'DevOps',
    difficulty: 'Advanced',
    shortDescription: 'Bridge development and operations — automate deployments, build CI/CD pipelines, and keep systems running reliably.',
    overview: 'DevOps Engineers automate the software delivery lifecycle. They build CI/CD pipelines, manage containers with Docker and Kubernetes, provision infrastructure with code, and foster collaboration between development and operations teams.',
    requiredSkills: ['linux', 'git', 'cicd', 'docker', 'cloud_fundamentals'],
    skillPriority: { linux: 1, git: 2, cloud_fundamentals: 3, docker: 4, cicd: 5 },
    relatedInterests: ['devops', 'cloud_computing', 'software_engineering', 'cybersecurity'],
    relevantDegrees: ['Computer Science', 'Information Technology', 'Electronics'],
    partlyRelevantDegrees: ['Electrical'],
    roadmap: [
      { step: 1, title: 'Linux & Scripting', description: 'Bash scripting, system administration, cron jobs. The DevOps foundation.', duration: '3-4 weeks' },
      { step: 2, title: 'Git & Branching Strategies', description: 'GitFlow, trunk-based development. Collaborate like a professional team.', duration: '1-2 weeks' },
      { step: 3, title: 'Cloud Fundamentals', description: 'AWS/GCP/Azure basics — compute, storage, networking, IAM.', duration: '3-4 weeks' },
      { step: 4, title: 'Docker & Containers', description: 'Write Dockerfiles, build images, run containers, Docker Compose.', duration: '3-4 weeks' },
      { step: 5, title: 'CI/CD Pipelines', description: 'GitHub Actions or Jenkins. Automate build, test, and deploy.', duration: '3-4 weeks' },
      { step: 6, title: 'Kubernetes & Advanced Topics', description: 'Orchestrate containers at scale. Learn Helm, monitoring with Prometheus.', duration: '6-8 weeks' },
    ],
    projects: [
      { title: 'Dockerised Web App', description: 'Containerise a Node.js or Python app with Docker. Beginner DevOps project.', difficulty: 'Beginner' },
      { title: 'CI/CD Pipeline with GitHub Actions', description: 'Automate test and deploy workflow for a web app using GitHub Actions.', difficulty: 'Intermediate' },
      { title: 'Kubernetes Cluster Deployment', description: 'Deploy a multi-container application on a local Kubernetes cluster with Minikube.', difficulty: 'Advanced' },
    ],
    resources: {
      linux: [
        { title: 'Linux for DevOps – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=rrB13utjYV4', type: 'Tutorial' },
      ],
      git: [
        { title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', type: 'Practice' },
      ],
      cicd: [
        { title: 'GitHub Actions – Official Docs', url: 'https://docs.github.com/en/actions', type: 'Documentation' },
        { title: 'CI/CD Tutorial – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=1er2cjUq1UI', type: 'Tutorial' },
      ],
      docker: [
        { title: 'Docker for Beginners – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', type: 'Tutorial' },
        { title: 'Official Docker Docs', url: 'https://docs.docker.com/get-started/', type: 'Documentation' },
      ],
      cloud_fundamentals: [
        { title: 'AWS Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', type: 'Tutorial' },
      ],
    },
  },
];

const DEGREE_OPTIONS = [
  'B.Tech', 'B.Sc', 'BCA', 'MCA', 'M.Tech', 'Diploma', 'Other'
];

const BRANCH_OPTIONS = [
  'Computer Science', 'Information Technology', 'Electronics',
  'Electrical', 'Mechanical', 'Civil', 'Other'
];

const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const CAREER_AREAS = [
  'Development', 'Data Science & Analytics', 'UI/UX Design',
  'Cybersecurity', 'Cloud & DevOps', 'Any / Not Sure'
];

module.exports = {
  CAREERS,
  SKILLS_CATALOG,
  INTERESTS_CATALOG,
  DEGREE_OPTIONS,
  BRANCH_OPTIONS,
  EXPERIENCE_LEVELS,
  CAREER_AREAS,
};
