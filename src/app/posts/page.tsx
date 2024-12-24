'use client';


import { useEffect, useState } from 'react';

interface Post {
  
  id: number;
  title: string;
  body: string;
  imageUrl: string;
} 

const FetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await fetch('/api/external');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        const placeholderImage = 'https://via.placeholder.com/400x200';
        setPosts(
          data.map((post: any) => ({
            ...post,
            imageUrl: post.imageUrl || placeholderImage,
          }))
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent rounded-full border-blue-600" role="status"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Latest Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <img
              src={post.imageUrl}
              alt={post.title}
              height={200}
              width={400}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
            <a
              href={`https://jsonplaceholder.typicode.com/posts/${post.id}`}
              className="block mt-4 text-blue-600 hover:underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchPosts;
