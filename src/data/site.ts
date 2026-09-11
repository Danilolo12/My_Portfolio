export const profile = {
  name: 'Daniel Ramos',
  fullName: 'Daniel Eduardo Ramos Martínez',
  role: 'Senior Full-Stack Engineer',
  focus: 'AI systems & real-time platforms',
  location: 'Medellín, Colombia',
  timezone: 'GMT-5',
  email: 'danieleduardoramos977@gmail.com',
  phone: '+57 312 575 9252',
  /** Adjust if your CV headline changes; every "N+ years" on the site derives from this. */
  careerStart: new Date('2022-02-01'),
  available: true,
  availability: 'Open to senior roles — remote',
  headline:
    'I build systems where the hard part is invisible: RAG pipelines that answer in under three seconds, drone-detection software reading radio spectrum in real time, and a ledger that never loses a cent.',
  bio: [
    'I am a full-stack engineer from Medellín who spends most of his time on the side of a product that users never see — the services, data models and pipelines that decide whether the thing feels fast or feels broken.',
    'The last two years have been unusually varied. At Space-Eyes I shipped defense and monitoring systems: an RF counter-drone desktop app, a maritime surveillance platform wired into satellite tasking, and a wildfire early-warning system with a field mobile app. At Remoti I moved deeper into AI infrastructure, architecting enterprise RAG pipelines and stateful LangGraph agents that call real databases and APIs.',
    'On my own time I build Finymo, a mobile fintech app for Colombia\'s informal lending economy, and Jarvis, a Discord-driven engine that scripts, narrates and renders short-form video end to end.',
    'What I care about: correct money math, honest failure modes, boring deployments, and code that the next person can read.',
  ],
} as const

export const socials = [
  {
    label: 'GitHub',
    handle: '@Danilolo12',
    href: 'https://github.com/Danilolo12',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    handle: 'daniel-ramos',
    href: 'https://www.linkedin.com/in/daniel-ramos-1670252b2/',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    handle: profile.email,
    href: `mailto:${profile.email}`,
    icon: 'mail',
  },
] as const

export const resume = {
  href: '/daniel-ramos-cv.pdf',
  filename: 'Daniel-Ramos-CV.pdf',
} as const

export const nav = [
  { label: 'Work', href: '/#work', id: 'work' },
  { label: 'Experience', href: '/#experience', id: 'experience' },
  { label: 'Stack', href: '/#stack', id: 'stack' },
  { label: 'About', href: '/#about', id: 'about' },
] as const

export const seo = {
  title: `${profile.name} — ${profile.role}`,
  description:
    'Senior full-stack engineer building AI systems, real-time monitoring platforms and fintech products. Python, FastAPI, TypeScript, React and LangGraph.',
  ogImage: '/og.png',
  locale: 'en_US',
} as const
