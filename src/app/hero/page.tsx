import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-purpleAccent">Welcome to PostMaster</h1>
      <p className="mt-4 text-lg">Explore dynamic posts, profiles, and visuals in a sleek dark theme!</p>
      <Link href="/">
        <p className="mt-6 px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-700">View Posts</p>
      </Link>
    </main>
  );
}
 