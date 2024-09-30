## MyGPT | Ask whatever you want

MyGPT is a web application created with the idea to clone the chatGPT web app.

### Deployed App

- [Live link](https://my-gpt-sand-chi.vercel.app)

### Features

- User registration and login, using google and email
- Creation of new chat
- Chat with the AI chatbot powered by the Gemini API
- Modify previous chat

### Technologies used

- Next.js
- Clerk Auth
- Redux toolkit with RTQ query
- Gemini API
- Supabase
- Typescipt
- Tailwind CSS
- DaisyUi
- React Icons

### How to run the app locally

- Download or clone the project
- Install NodeJs if not installed
- Open the project and install node dependencies: npm install
- Create a .env.local in the root of the project and include the following firebase credentials,
  - EXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  - CLERK_SECRET_KEY
  - NEXT_PUBLIC_CLERK_SIGN_IN_URL
  - NEXT_PUBLIC_CLERK_SIGN_UP_URL
  - NEXT_PUBLIC_GEMINI_API_KEY
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_API
- Run the project : npm run dev
- For building the project : npm run build
