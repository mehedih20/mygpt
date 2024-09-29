import Link from "next/link";

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h2 className="text-6xl font-bold my-2">Welcome to MyGPT</h2>
          <p className="py-6 text-lg">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link href="/chat" className="btn btn-warning animate-pulse">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
