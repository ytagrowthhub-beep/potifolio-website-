import { NextRequest, NextResponse } from 'next/server'
import { generateContext, findRelevantKnowledge } from '@/lib/chatbot-knowledge'

/**
 * Chatbot API Route
 * Handles chat messages and returns AI-generated responses
 * 
 * For production, integrate with OpenAI API or similar LLM service
 * For now, uses a rule-based system with the knowledge base
 */

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Generate context from knowledge base
    const context = generateContext(message)
    const relevantKnowledge = findRelevantKnowledge(message)

    // Check if we have OpenAI API key
    const openaiApiKey = process.env.OPENAI_API_KEY

    let response: string
    let action: { type: string; value: string } | undefined
    let interactive: { type: string; options?: string[] } | undefined

    const lowerMessage = message.toLowerCase()
    
    // First, generate the response to their question
    // Then add interactive elements and follow-up questions if relevant

    if (openaiApiKey) {
      // Use OpenAI API for better responses
      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: context,
              },
              ...(conversationHistory || []),
              {
                role: 'user',
                content: message,
              },
            ],
            temperature: 0.7,
            max_tokens: 300,
          }),
        })

        if (openaiResponse.ok) {
          const data = await openaiResponse.json()
          response = data.choices[0]?.message?.content || 'I apologize, but I could not generate a response.'
        } else {
          throw new Error('OpenAI API error')
        }
      } catch (error) {
        console.error('OpenAI API error:', error)
        // Fallback to rule-based response
        response = generateRuleBasedResponse(message, relevantKnowledge)
      }
    } else {
      // Use rule-based system (no API key)
      response = generateRuleBasedResponse(message, relevantKnowledge)
    }

    // IMPORTANT: Answer their question first, then add follow-ups
    // Extract action from relevant knowledge
    if (relevantKnowledge.length > 0 && relevantKnowledge[0].action) {
      action = relevantKnowledge[0].action
    }

    // Add follow-up questions and interactive elements AFTER answering their question
    // Check if user is asking about services - add dropdown AFTER answering
    if (
      (lowerMessage.includes('service') ||
        lowerMessage.includes('what do you offer') ||
        lowerMessage.includes('what can you do') ||
        lowerMessage.includes('services') ||
        lowerMessage.includes('tell me about')) &&
      !response.toLowerCase().includes('which service') &&
      !response.toLowerCase().includes('select')
    ) {
      // Add follow-up question to the response AFTER answering
      response += '\n\nWhich service are you most interested in? You can select from the dropdown below:'
      interactive = {
        type: 'services-dropdown',
        options: [
          'Frontend Development',
          'Backend Development',
          'Full-Stack Development',
          'Database & Data Layer',
          'DevOps & Infrastructure',
          'Maintenance & Support',
          'Consultation / Technical Advisory',
        ],
      }
    }

    // Check if user is asking about timeline - add dropdown AFTER answering
    if (
      (lowerMessage.includes('timeline') ||
        lowerMessage.includes('delivery') ||
        lowerMessage.includes('how long') ||
        lowerMessage.includes('deliverables') ||
        lowerMessage.includes('when') ||
        lowerMessage.includes('deadline')) &&
      !response.toLowerCase().includes('what timeline') &&
      !response.toLowerCase().includes('select')
    ) {
      // Add follow-up question to the response AFTER answering
      response += '\n\nWhat timeline are you working with? Select from the dropdown below:'
      interactive = {
        type: 'timeline-dropdown',
        options: [
          'ASAP',
          '1-2 weeks',
          '2-4 weeks',
          '4-6 weeks',
          '6-8 weeks',
          '8-12 weeks',
          '3-6 months',
          '6+ months',
        ],
      }
    }

    // Add general follow-up questions for project-related queries (AFTER answering)
    if (
      (lowerMessage.includes('build') ||
        lowerMessage.includes('create') ||
        lowerMessage.includes('develop') ||
        lowerMessage.includes('project') ||
        lowerMessage.includes('website') ||
        lowerMessage.includes('app')) &&
      !interactive &&
      !response.toLowerCase().includes('what type') &&
      !response.toLowerCase().includes('tell me more') &&
      !response.toLowerCase().includes('could you tell me')
    ) {
      response += '\n\nTo better assist you, could you tell me:\n• What type of project are you working on?\n• What\'s your timeline?\n• What\'s your budget range?'
    }

    // Check for specific intents that should trigger actions
    if (
      (lowerMessage.includes('hire') ||
        lowerMessage.includes('work together') ||
        lowerMessage.includes('available')) &&
      !action
    ) {
      action = { type: 'form', value: '/contact' }
      if (!response.includes('contact form')) {
        response += '\n\nWould you like to fill out our contact form so A.Tech can get back to you?'
      }
    }

    if (
      (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) &&
      !action &&
      !lowerMessage.includes('hire')
    ) {
      action = { type: 'link', value: '/projects' }
    }

    if (
      (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) &&
      !action &&
      !interactive
    ) {
      action = { type: 'link', value: '/services' }
    }

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        
        // Stream the response word by word for real-time effect
        const words = response.split(' ')
        
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i < words.length - 1 ? ' ' : '')
          const data = JSON.stringify({
            type: 'chunk',
            content: chunk,
          })
          
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          
          // Small delay to simulate typing
          await new Promise((resolve) => setTimeout(resolve, 20))
        }
        
        // Send final data with action and interactive
        const finalData = JSON.stringify({
          type: 'done',
          action,
          interactive,
        })
        controller.enqueue(encoder.encode(`data: ${finalData}\n\n`))
        
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chatbot API error:', error)
    return NextResponse.json(
      {
        error: 'An error occurred while processing your message. Please try again.',
      },
      { status: 500 }
    )
  }
}

/**
 * Generate rule-based response when OpenAI is not available
 */
function generateRuleBasedResponse(
  message: string,
  relevantKnowledge: ReturnType<typeof findRelevantKnowledge>
): string {
  const lowerMessage = message.toLowerCase()

  // If we have relevant knowledge, use it
  if (relevantKnowledge.length > 0) {
    return relevantKnowledge[0].answer
  }

  // Fallback responses for common queries
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! 👋 I'm the A.Tech AI assistant. I can help you learn about A.Tech's services, skills, deliverables, projects, or how to get started. How can I assist you today?"
  }

  if (lowerMessage.includes('thank')) {
    return "You're welcome! Feel free to ask if you need anything else about A.Tech's services or skills."
  }

  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
    return 'Goodbye! Feel free to reach out anytime. You can contact A.Tech directly at ayorfe2@gmail.com or fill out the contact form.'
  }

  // Default response
  return `I'm the A.Tech AI assistant, here to help you learn about A.Tech's services, skills, and deliverables. 

You can ask me about:
• Services A.Tech offers
• Skills and technologies
• Delivery timelines
• Projects and portfolio
• Contact information
• How to get started

Or visit the website to explore more. How can I assist you?`
}
