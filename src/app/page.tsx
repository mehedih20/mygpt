import Link from "next/link";

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-svh">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h2 className="text-6xl font-bold my-2">Welcome to MyGPT</h2>
          <p className="py-6 text-lg">
            MyGPT helps you with everything from answering questions to solving
            problems, all in a conversational way. It&apos;s intuitive, learns
            with you, and delivers personalized responses for seamless
            interactions.
          </p>
          <Link href="/chat" className="btn btn-info">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
