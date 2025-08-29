# Gemini AI Chatbot Integration

## Setup Instructions

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### 2. Configure Environment

1. Open `backend/.env` file
2. Replace `your-gemini-api-key-here` with your actual API key:
   ```
   GEMINI_API_KEY=AIzaSyBxx... (your actual key)
   ```

### 3. Test the Integration

#### Backend Endpoints:

- **Health Check**: `GET /api/chatbot/health`
- **Send Message**: `POST /api/chatbot/message` (requires auth)
- **Chat History**: `GET /api/chatbot/history` (requires auth, placeholder)

#### Test with curl:

```bash
# Health check (no auth needed)
curl http://localhost:3000/api/chatbot/health

# Send message (requires valid JWT token)
curl -X POST http://localhost:3000/api/chatbot/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"message": "Hello, how are you?"}'
```

### 4. Frontend Features

#### New Components:

- **`Chatbot`**: Main chat interface component
- **`useChatbot`**: Custom hook for chat state management

#### Features:

- Real-time messaging with Gemini AI
- Quick action buttons for common mental health topics
- Error handling and loading states
- Message history with timestamps
- Clear chat functionality
- Authentication integration

### 5. Security Features

- API key stored securely in backend environment
- Authentication required for chat endpoints
- No API key exposure to frontend
- Error message sanitization

### 6. Mental Health Focus

The AI is specifically prompted to:

- Provide supportive, empathetic responses
- Offer practical mental health tips
- Suggest coping strategies and wellness activities
- Remind users it's not a replacement for professional help
- Keep responses concise and meaningful

## Usage

1. **Start Backend**: `npm start` (in backend directory)
2. **Start Frontend**: `npm run dev` (in frontend directory)
3. **Login**: Use your MindConnect account
4. **Access Chatbot**: Click the floating bot icon in the dashboard
5. **Chat**: Type messages or use quick actions

## Error Handling

The system handles:

- Invalid/missing API keys
- Network connectivity issues
- Authentication failures
- Rate limiting
- General API errors

## Future Enhancements

- [ ] Chat history persistence in database
- [ ] Conversation context memory
- [ ] File/image sharing capabilities
- [ ] Voice input/output
- [ ] Personalized responses based on user onboarding data
- [ ] Integration with mood tracking and journal entries
