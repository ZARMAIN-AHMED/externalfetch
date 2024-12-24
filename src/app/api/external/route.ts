// app/api/external/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetching posts from the JSONPlaceholder API
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    // Fetching images from the JSONPlaceholder photos API
    const imageResponse = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10'); // Limit to 10 images for better performance
    const images = await imageResponse.json();

    // Assigning a random image to each post
    const postsWithImages = posts.map((post: any) => {
      // Random image logic: Assign a random image from the fetched list of images
      const randomImage = images[Math.floor(Math.random() * images.length)];
      return {
        ...post,
        imageUrl: randomImage.url,
      };
    }); 

    // Returning posts with image URLs
    return NextResponse.json(postsWithImages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts and images' }, { status: 500 });
  }
} 
