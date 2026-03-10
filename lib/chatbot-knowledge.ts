/**
 * Knowledge Base for A.Tech AI Assistant
 * Contains structured information about Sanni Akeem and services
 */

export interface KnowledgeItem {
  category: string
  question: string
  answer: string
  keywords: string[]
  action?: {
    type: 'link' | 'form' | 'email'
    value: string
  }
}

export const knowledgeBase: KnowledgeItem[] = [
  // Developer Info
  {
    category: 'developer',
    question: 'Who is Sanni Akeem?',
    answer: 'I\'m Sanni Akeem, a Full Stack Developer and the founder of A.Tech. I specialize in building scalable, modern, and high-impact digital solutions including web applications, SaaS platforms, and AI-powered systems.',
    keywords: ['who', 'sanni akeem', 'developer', 'founder', 'about'],
  },
  {
    category: 'developer',
    question: 'What is A.Tech?',
    answer: 'Welcome to A.Tech! We are a full stack development team specializing in professional, modern, and tech-focused solutions for businesses and startups. I founded A.Tech to deliver high-quality digital solutions.',
    keywords: ['a.tech', 'brand', 'company', 'what is'],
  },

  // Services
  {
    category: 'services',
    question: 'What services do you offer?',
    answer: 'A.Tech offers comprehensive development services:\n\n• Frontend Development - Building user interfaces with React, Next.js, TypeScript\n• Backend Development - Server-side development with Node.js, Python\n• Full-Stack Development - Complete end-to-end solutions\n• Database & Data Layer - PostgreSQL, MongoDB database design and optimization\n• DevOps & Infrastructure - Deployment, CI/CD, cloud infrastructure\n• Maintenance & Support - Ongoing support and updates\n• Consultation / Technical Advisory - Expert guidance and technical consulting\n\nWhich service are you most interested in? Select from the dropdown below:',
    keywords: ['services', 'what do you offer', 'what can you do', 'offerings', 'what services'],
    action: {
      type: 'link',
      value: '/services',
    },
  },
  {
    category: 'skills',
    question: 'What skills do you have?',
    answer: 'A.Tech specializes in the following skills and technologies:\n\n**Frontend:**\n• React\n• Next.js\n• TypeScript\n• TailwindCSS\n\n**Backend:**\n• Node.js\n• Python\n\n**Databases:**\n• PostgreSQL\n• MongoDB\n\n**Other Technologies:**\n• Web3/Blockchain\n• AI APIs\n• Cloud Services\n\nA.Tech works with modern tech stacks to build scalable, high-performance applications.',
    keywords: ['skills', 'technologies', 'tech stack', 'what can you do', 'expertise', 'capabilities'],
    action: {
      type: 'link',
      value: '/services',
    },
  },
  {
    category: 'deliverables',
    question: 'What are your delivery timelines?',
    answer: 'A.Tech offers flexible delivery timelines based on project scope:\n\n**Quick Deliveries:**\n• ASAP (Rush projects) - For urgent needs\n• 1-2 weeks - Small projects or MVPs\n• 2-4 weeks - Medium complexity projects\n\n**Standard Projects:**\n• 4-6 weeks - Full-featured applications\n• 6-8 weeks - Complex systems\n• 8-12 weeks - Enterprise-level solutions\n\n**Long-term Projects:**\n• 3-6 months - Large-scale platforms\n• 6+ months - Ongoing development\n\nTimeline depends on project complexity, features, and requirements. What timeline are you working with? Select from the dropdown below:',
    keywords: ['timeline', 'delivery', 'deliverables', 'how long', 'duration', 'timeframe', 'when', 'deadline'],
    action: {
      type: 'form',
      value: '/contact',
    },
  },
  {
    category: 'skills-deliverables',
    question: 'What skills and deliverables do you offer?',
    answer: '**Skills & Technologies:**\n• Frontend: React, Next.js, TypeScript, TailwindCSS\n• Backend: Node.js, Python\n• Databases: PostgreSQL, MongoDB\n• Web3/Blockchain, AI APIs, Cloud Services\n\n**Services:**\n• Frontend Development\n• Backend Development\n• Full-Stack Development\n• Database & Data Layer\n• DevOps & Infrastructure\n• Maintenance & Support\n• Consultation\n\n**Delivery Timelines:**\n• ASAP, 1-2 weeks, 2-4 weeks (Quick)\n• 4-6 weeks, 6-8 weeks, 8-12 weeks (Standard)\n• 3-6 months, 6+ months (Long-term)\n\nWould you like to discuss a specific project?',
    keywords: ['skills and deliverables', 'what can you deliver', 'capabilities and timeline', 'services and timeline'],
    action: {
      type: 'form',
      value: '/contact',
    },
  },
  {
    category: 'services',
    question: 'Can you build a website or app for me?',
    answer: 'Yes! A.Tech can build custom websites, web applications, and mobile apps tailored to your needs. They work with modern technologies like React, Next.js, Node.js, and Python to create scalable solutions.',
    keywords: ['build', 'website', 'app', 'application', 'create', 'develop'],
    action: {
      type: 'form',
      value: '/contact',
    },
  },
  {
    category: 'services',
    question: 'Do you offer full stack development?',
    answer: 'Yes, Full Stack Development is one of A.Tech\'s core services. They handle both frontend (React, Next.js, TypeScript) and backend (Node.js, Python, PostgreSQL, MongoDB) development.',
    keywords: ['full stack', 'fullstack', 'frontend', 'backend', 'both'],
  },
  {
    category: 'services',
    question: 'Can you integrate AI into my project?',
    answer: 'Absolutely! A.Tech specializes in AI integrations and can add AI features like chatbots, automation, data analysis, and machine learning capabilities to your applications.',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'chatbot', 'automation'],
  },
  {
    category: 'services',
    question: 'Do you build trading bots or crypto applications?',
    answer: 'Yes, A.Tech develops trading bots, crypto applications, and Web3 solutions. They work with blockchain technologies and cryptocurrency APIs to build automated trading systems and decentralized applications.',
    keywords: ['trading', 'bot', 'crypto', 'cryptocurrency', 'blockchain', 'web3', 'defi'],
  },

  // Technologies
  {
    category: 'technologies',
    question: 'What technologies do you use?',
    answer: 'A.Tech works with modern tech stacks including: Frontend (React, Next.js, TypeScript, TailwindCSS), Backend (Node.js, Python), Databases (PostgreSQL, MongoDB), Web3/Blockchain, AI APIs, and various cloud services.',
    keywords: ['technologies', 'tech stack', 'tools', 'languages', 'frameworks', 'what do you use'],
    action: {
      type: 'link',
      value: '/services',
    },
  },
  {
    category: 'technologies',
    question: 'Do you use React and Next.js?',
    answer: 'Yes, React and Next.js are A.Tech\'s primary frontend frameworks. They use them to build fast, SEO-friendly, and scalable web applications.',
    keywords: ['react', 'next.js', 'nextjs', 'frontend'],
  },
  {
    category: 'technologies',
    question: 'What databases do you work with?',
    answer: 'A.Tech works with both SQL (PostgreSQL) and NoSQL (MongoDB) databases, choosing the right solution based on project requirements.',
    keywords: ['database', 'postgresql', 'mongodb', 'sql', 'nosql', 'data'],
  },

  // Projects
  {
    category: 'projects',
    question: 'Show me your projects',
    answer: 'You can view A.Tech\'s portfolio of projects on the Projects page. They\'ve built various web applications, SaaS platforms, and automation tools for different clients.',
    keywords: ['projects', 'portfolio', 'work', 'show me', 'examples', 'what have you built'],
    action: {
      type: 'link',
      value: '/projects',
    },
  },
  {
    category: 'projects',
    question: 'What projects have you completed?',
    answer: 'A.Tech has completed various projects including web applications, SaaS platforms, trading bots, crypto applications, and AI-powered systems. Check out their Projects page to see detailed case studies.',
    keywords: ['completed', 'done', 'finished', 'past work', 'case studies'],
    action: {
      type: 'link',
      value: '/projects',
    },
  },

  // Contact
  {
    category: 'contact',
    question: 'How can I contact you?',
    answer: 'You can reach A.Tech via email at ayorfe2@gmail.com, or visit their GitHub (github.com/ytagrowthhub) and Twitter (@haryor6). You can also fill out the contact form on the Contact page.',
    keywords: ['contact', 'email', 'reach', 'get in touch', 'how to contact'],
    action: {
      type: 'link',
      value: '/contact',
    },
  },
  {
    category: 'contact',
    question: 'What is your email?',
    answer: 'A.Tech\'s email is ayorfe2@gmail.com. Feel free to reach out for project inquiries, collaborations, or any questions.',
    keywords: ['email', 'email address', 'mail'],
    action: {
      type: 'email',
      value: 'ayorfe2@gmail.com',
    },
  },
  {
    category: 'contact',
    question: 'Where can I find you on social media?',
    answer: 'You can find A.Tech on GitHub (github.com/ytagrowthhub) and Twitter/X (@haryor6).',
    keywords: ['social media', 'github', 'twitter', 'linkedin', 'social'],
  },

  // Availability
  {
    category: 'availability',
    question: 'Are you available for freelance work?',
    answer: 'Yes, A.Tech is currently available for freelance projects, startup collaborations, and long-term development work. They\'d be happy to discuss your project requirements.',
    keywords: ['available', 'freelance', 'hire', 'work', 'collaboration'],
    action: {
      type: 'form',
      value: '/contact',
    },
  },
  {
    category: 'availability',
    question: 'Can we schedule a meeting?',
    answer: 'Absolutely! Please send an email to ayorfe2@gmail.com with your preferred time and meeting details, or fill out the contact form and A.Tech will get back to you.',
    keywords: ['meeting', 'schedule', 'call', 'discuss', 'consultation'],
    action: {
      type: 'form',
      value: '/contact',
    },
  },
  {
    category: 'availability',
    question: 'Are you available?',
    answer: 'Yes, A.Tech is currently available for new projects. They work on freelance projects, startup collaborations, and long-term development engagements.',
    keywords: ['available', 'free', 'open', 'taking on'],
    action: {
      type: 'form',
      value: '/contact',
    },
  },

  // Rates/Pricing
  {
    category: 'pricing',
    question: 'What are your rates?',
    answer: 'Pricing depends on project scope, complexity, and timeline. A.Tech offers flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Contact them for a customized quote.',
    keywords: ['rates', 'pricing', 'cost', 'price', 'how much', 'budget'],
    action: {
      type: 'form',
      value: '/contact',
    },
  },
  {
    category: 'pricing',
    question: 'How much do you charge?',
    answer: 'A.Tech\'s rates vary based on project requirements. They provide customized quotes after understanding your needs. Please reach out via the contact form or email for a detailed estimate.',
    keywords: ['charge', 'cost', 'price', 'fee', 'how much'],
    action: {
      type: 'form',
      value: '/contact',
    },
  },
]

/**
 * Get relevant knowledge items based on user query
 */
export function findRelevantKnowledge(query: string): KnowledgeItem[] {
  const lowerQuery = query.toLowerCase()
  const matches: { item: KnowledgeItem; score: number }[] = []

  knowledgeBase.forEach((item) => {
    let score = 0

    // Check keyword matches
    item.keywords.forEach((keyword) => {
      if (lowerQuery.includes(keyword)) {
        score += 2
      }
    })

    // Check question similarity
    if (item.question.toLowerCase().includes(lowerQuery) || lowerQuery.includes(item.question.toLowerCase())) {
      score += 3
    }

    // Check answer content
    if (item.answer.toLowerCase().includes(lowerQuery)) {
      score += 1
    }

    if (score > 0) {
      matches.push({ item, score })
    }
  })

  // Sort by score and return top matches
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((m) => m.item)
}

/**
 * Generate context for AI from knowledge base
 */
export function generateContext(query: string): string {
  const relevant = findRelevantKnowledge(query)
  
  if (relevant.length === 0) {
    return `You are an AI assistant chatbot for A.Tech, a full stack development company. You help visitors learn about A.Tech's services, skills, deliverables, and how to get started.

CRITICAL RULES:
1. ALWAYS ANSWER THE USER'S ORIGINAL QUESTION FIRST. Never ignore or divert from what they asked.
2. You are a BOT/ASSISTANT. Always refer to A.Tech in third person ("A.Tech offers", "they provide", "their services"). Never say "I" or "we" as if you are A.Tech itself.
3. AFTER answering their question, ask follow-up questions about their needs (project type, timeline, budget, etc.) to better assist them.
4. Be CONVERSATIONAL and helpful. Provide complete answers, then engage with follow-up questions.

Services A.Tech offers:
• Frontend Development
• Backend Development
• Full-Stack Development
• Database & Data Layer
• DevOps & Infrastructure
• Maintenance & Support
• Consultation / Technical Advisory

Skills & Technologies:
• Frontend: React, Next.js, TypeScript, TailwindCSS
• Backend: Node.js, Python
• Databases: PostgreSQL, MongoDB
• Web3/Blockchain, AI APIs, Cloud Services

Delivery Timelines:
• Quick: ASAP, 1-2 weeks, 2-4 weeks
• Standard: 4-6 weeks, 6-8 weeks, 8-12 weeks
• Long-term: 3-6 months, 6+ months

Contact: Email - ayorfe2@gmail.com, GitHub - github.com/ytagrowthhub, Twitter - @haryor6

Be friendly, professional, conversational, and helpful. Ask questions about user needs before providing detailed information. Always speak as an AI assistant helping users learn about A.Tech.`
  }

  const contextParts = relevant.map((item) => `Q: ${item.question}\nA: ${item.answer}`)
  
  return `You are an AI assistant chatbot for A.Tech, a full stack development company. You help visitors learn about A.Tech's services, skills, deliverables, and how to get started.

IMPORTANT: You are a BOT/ASSISTANT. Always refer to A.Tech in third person ("A.Tech offers", "they provide", "their services"). Never say "I" or "we" as if you are A.Tech itself. Say things like "A.Tech offers..." or "They specialize in...".

Relevant information:
${contextParts.join('\n\n')}

Additional context:
- Services A.Tech offers: Frontend Development, Backend Development, Full-Stack Development, Database & Data Layer, DevOps & Infrastructure, Maintenance & Support, Consultation
- Skills: React, Next.js, TypeScript, TailwindCSS, Node.js, Python, PostgreSQL, MongoDB, Web3, Blockchain, AI APIs
- Delivery Timelines: ASAP, 1-2 weeks, 2-4 weeks, 4-6 weeks, 6-8 weeks, 8-12 weeks, 3-6 months, 6+ months
- Contact: Email - ayorfe2@gmail.com, GitHub - github.com/ytagrowthhub, Twitter - @haryor6

CRITICAL RULES:
1. ALWAYS ANSWER THE USER'S ORIGINAL QUESTION FIRST. Never ignore or divert from what they asked.
2. AFTER answering their question completely, ask follow-up questions about their needs (project type, timeline, budget, etc.).
3. Be friendly, professional, conversational, and helpful. Provide complete answers, then engage with follow-up questions.
4. Keep responses concise but informative. Always speak as an AI assistant helping users learn about A.Tech.
5. If asked about projects, suggest visiting /projects. If asked about hiring, suggest the contact form at /contact.`
}
