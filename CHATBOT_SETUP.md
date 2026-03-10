# A.Tech AI Chatbot Setup Guide

## Overview

The A.Tech AI Chatbot is a modern, intelligent assistant integrated into your portfolio website. It helps visitors learn about your services, projects, and availability, and guides them toward contacting or hiring you.

## Features

✅ **Smart Knowledge Base** - Answers questions about services, technologies, projects, and contact info
✅ **Suggested Questions** - Quick action buttons for common queries
✅ **Lead Capture** - Guides users to contact form when they want to hire
✅ **Project Linking** - Direct links to projects and services pages
✅ **Modern UI** - Premium design matching your wine color theme
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **Smooth Animations** - Framer Motion powered transitions
✅ **OpenAI Integration** - Optional AI-powered responses (works without it too)

## File Structure

```
├── components/
│   └── Chatbot.tsx              # Main chatbot component
├── lib/
│   └── chatbot-knowledge.ts     # Knowledge base and RAG logic
├── app/
│   └── api/
│       └── chatbot/
│           └── route.ts         # API endpoint for chat
└── .env.example                 # Environment variables template
```

## Setup Instructions

### 1. Environment Variables (Optional)

For enhanced AI responses using OpenAI:

1. Copy `.env.example` to `.env.local`
2. Get your OpenAI API key from https://platform.openai.com/api-keys
3. Add it to `.env.local`:

```env
OPENAI_API_KEY=sk-your-key-here
```

**Note:** The chatbot works perfectly without OpenAI using a rule-based system. OpenAI integration provides more natural and contextual responses.

### 2. Verify Integration

The chatbot is already integrated into `app/layout.tsx` and will appear on all pages.

### 3. Customize Knowledge Base

Edit `lib/chatbot-knowledge.ts` to:
- Add more Q&A pairs
- Update services and technologies
- Modify contact information
- Add custom responses

### 4. Customize Appearance

Edit `components/Chatbot.tsx` to:
- Change colors (uses theme system)
- Modify suggested questions
- Adjust animations
- Update greeting message

## How It Works

### Knowledge Base System

The chatbot uses a knowledge base (`chatbot-knowledge.ts`) with structured Q&A pairs. When a user asks a question:

1. **Query Matching** - Searches knowledge base for relevant answers
2. **Context Generation** - Builds context from matching knowledge items
3. **AI Response** - If OpenAI is configured, uses GPT-3.5-turbo with context
4. **Fallback** - If no OpenAI, uses rule-based responses from knowledge base
5. **Action Extraction** - Identifies if user wants to hire, see projects, etc.

### API Flow

```
User Message → /api/chatbot → Knowledge Search → Context Generation → 
OpenAI API (if available) → Response + Action → Frontend
```

## Customization Examples

### Add New Service

Edit `lib/chatbot-knowledge.ts`:

```typescript
{
  category: 'services',
  question: 'Do you offer mobile app development?',
  answer: 'Yes, I develop mobile applications using React Native and Flutter...',
  keywords: ['mobile', 'app', 'ios', 'android'],
  action: {
    type: 'form',
    value: '/contact',
  },
}
```

### Change Greeting Message

Edit `components/Chatbot.tsx`:

```typescript
const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    role: 'assistant',
    content: 'Your custom greeting here...',
    timestamp: new Date(),
  },
])
```

### Add New Suggested Question

Edit `components/Chatbot.tsx`:

```typescript
const suggestedQuestions: SuggestedQuestion[] = [
  { text: 'Your Question', action: { type: 'link', value: '/your-page' } },
  // ... existing questions
]
```

## Advanced Features

### Vector Database Integration (Future Enhancement)

For production-scale deployments, consider:

1. **Pinecone** - Vector database for semantic search
2. **Supabase Vector** - PostgreSQL with pgvector extension
3. **Embeddings** - Use OpenAI embeddings API for better matching

### Rate Limiting

Add rate limiting to `app/api/chatbot/route.ts`:

```typescript
// Example using a simple in-memory store
const rateLimiter = new Map()

// Check rate limit
const userIP = request.headers.get('x-forwarded-for') || 'unknown'
const requests = rateLimiter.get(userIP) || 0
if (requests > 10) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
}
```

### Chat History Storage

Store conversation history in:
- **LocalStorage** (client-side)
- **Database** (server-side)
- **Cookies** (session-based)

## Testing

### Test Questions

Try these to verify everything works:

- "What services do you offer?"
- "Show me your projects"
- "How can I contact you?"
- "Are you available for freelance work?"
- "What technologies do you use?"

### Expected Behaviors

- ✅ Chatbot button appears bottom-right
- ✅ Clicking opens chat window
- ✅ Messages send and receive responses
- ✅ Suggested questions appear on first load
- ✅ Links to projects/services work
- ✅ Mobile responsive design
- ✅ Smooth animations

## Troubleshooting

### Chatbot Not Appearing

1. Check browser console for errors
2. Verify `Chatbot` component is imported in `layout.tsx`
3. Ensure no CSS conflicts (z-index, positioning)

### API Errors

1. Check `app/api/chatbot/route.ts` for errors
2. Verify environment variables if using OpenAI
3. Check network tab for failed requests

### Responses Not Accurate

1. Update knowledge base in `chatbot-knowledge.ts`
2. Add more keywords to existing entries
3. Consider enabling OpenAI for better responses

## Performance Optimization

The chatbot is already optimized with:

- ✅ Lazy loading (only loads when needed)
- ✅ Client-side only (no SSR overhead)
- ✅ Efficient re-renders
- ✅ Minimal bundle size

## Security Considerations

- ✅ API keys stored in environment variables
- ✅ Input validation on API route
- ✅ Error handling prevents information leakage
- ✅ Rate limiting recommended for production

## Support

For issues or questions:
- Check the code comments
- Review the knowledge base structure
- Test with different queries
- Check browser console for errors

## Future Enhancements

Potential improvements:

- [ ] Voice input support
- [ ] Chat history persistence
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] A/B testing for responses
- [ ] Integration with CRM systems
- [ ] Advanced RAG with vector database

---

**Built with ❤️ for A.Tech Portfolio**
