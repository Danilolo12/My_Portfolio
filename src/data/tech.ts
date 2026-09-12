/**
 * Brand colours for the technology chips. Anything not listed here renders in
 * the neutral style on purpose — generic capabilities ("REST", "Web scraping")
 * have no brand, and leaving them grey keeps the recognisable logos legible.
 *
 * Values are the official brand hex where one exists, nudged lighter when the
 * official colour is too dark to read on a near-black background.
 */
const TECH_COLORS: Record<string, string> = {
  // Languages
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#4B8BBE',
  Dart: '#0175C2',
  PHP: '#8892BF',

  // Frontend & mobile
  React: '#61DAFB',
  'React Native': '#61DAFB',
  'Next.js': '#D4D4D8',
  Astro: '#FF5D01',
  Expo: '#8B7BF7',
  'EAS Build': '#8B7BF7',
  Flutter: '#54C5F8',
  'Tailwind CSS': '#38BDF8',
  'TanStack Query': '#FF4154',
  Vite: '#8A7BFF',

  // Backend
  'Node.js': '#6CC24A',
  Express: '#A1A1AA',
  NestJS: '#E0234E',
  Django: '#44B78B',
  FastAPI: '#0FA79A',
  GraphQL: '#E10098',
  RabbitMQ: '#FF6600',
  SQLAlchemy: '#D8574B',
  Prisma: '#7C86F0',
  Zod: '#4B8FE0',
  Alembic: '#8FB03E',
  'Discord.py': '#5865F2',

  // AI
  LangGraph: '#22C3A6',
  LangChain: '#3BD4B0',
  OpenAI: '#10A37F',
  Whisper: '#10A37F',
  'faster-whisper': '#10A37F',
  Gemini: '#9A7CD4',
  Qdrant: '#E24A6B',
  pgvector: '#5B8DEF',
  ChromaDB: '#F2C94C',
  Pydantic: '#E92063',
  ElevenLabs: '#C084FC',

  // Data
  PostgreSQL: '#5B8DEF',
  MySQL: '#5A93B8',
  MongoDB: '#47A248',
  Supabase: '#3ECF8E',
  Firebase: '#FFCA28',
  Redis: '#FF5A47',

  // Platform
  Docker: '#2496ED',
  AWS: '#FF9900',
  'AWS Glue': '#FF9900',
  GCP: '#4285F4',
  'Cloud Functions': '#4285F4',
  'Azure DevOps': '#3399E6',
  'GitHub Actions': '#4C9AFF',
  pytest: '#3AA3D6',

  // Media & tooling
  Remotion: '#3B9BF5',
  FFmpeg: '#4CAF50',
  Figma: '#F24E1E',
  Postman: '#FF6C37',
  Jira: '#3B7DDD',
}

export function techColor(name: string): string | undefined {
  return TECH_COLORS[name]
}
