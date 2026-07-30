export const education = [
    {
        institution: "광운대학교",
        detail: "인공지능융합대학 소프트웨어학부",
        period: "2024 – Present",
        icon: "laptop-outline" as const,
    },
    {
        institution: "성일고등학교",
        detail: "일반 인문계",
        period: "2021 – 2024",
        icon: "school-outline" as const,
    },
];

export const certifications = [
    {
        name: "정보처리기능사 (현. 프로그래밍기능사)",
        year: "2017",
        icon: "code-slash-outline" as const,
    },
    {
        name: "GTQ 그래픽기술자격 1급",
        year: "2017",
        icon: "brush-outline" as const,
    },
    {
        name: "컴퓨터활용능력 2급",
        year: "2016",
        icon: "desktop-outline" as const,
    },
];

export interface Skill {
    name: string;
    iconName: string;
    featured?: boolean;
}

export interface SkillCategory {
    title: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Languages",
        skills: [
            { name: "JavaScript", iconName: "nodejs", featured: true },
            { name: "TypeScript", iconName: "typescript" },
            { name: "Kotlin", iconName: "kotlin" },
            { name: "Java", iconName: "java", featured: true },
            { name: "Python", iconName: "python" },
            { name: "C", iconName: "c++" },
        ],
    },
    {
        title: "Web",
        skills: [
            { name: "Next.js", iconName: "nextjs2", featured: true },
            { name: "React", iconName: "react" },
            { name: "Tailwind CSS", iconName: "tailwindcss", featured: true },
            { name: "PWA", iconName: "pwa" },
        ],
    },
    {
        title: "Mobile",
        skills: [
            { name: "Android", iconName: "android", featured: true },
            { name: "Jetpack Compose", iconName: "webpack" },
            { name: "React Native", iconName: "reactnative" },
        ],
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js (Express)", iconName: "nodejs2", featured: true },
            { name: "NestJS", iconName: "nestjs" },
            { name: "Spring Boot", iconName: "spring" },
            { name: "FastAPI", iconName: "fastgpt" },
        ],
    },
    {
        title: "Database",
        skills: [
            { name: "Firebase", iconName: "firebase" },
            { name: "Supabase", iconName: "supabase" },
            { name: "MongoDB", iconName: "mongodb" },
            { name: "MySQL", iconName: "mysql" },
            { name: "Redis", iconName: "redis" },
        ],
    },
    {
        title: "DevOps",
        skills: [
            { name: "Oracle Cloud", iconName: "oracle" },
            { name: "Cloudflare", iconName: "cloudflare" },
            { name: "AWS", iconName: "aws" },
            { name: "Docker", iconName: "docker" },
            { name: "Git", iconName: "git" },
            { name: "GitHub Actions", iconName: "github" },
            { name: "Traefik", iconName: "traefikproxy" },
            { name: "Vercel", iconName: "vercel" },
            { name: "Notion", iconName: "notion" },
        ],
    },
    {
        title: "AI",
        skills: [
            { name: "Claude", iconName: "claude" },
            { name: "Codex", iconName: "openai" },
            { name: "Hugging Face", iconName: "huggingface" },
            { name: "Ollama", iconName: "ollama" },
        ],
    },
];
