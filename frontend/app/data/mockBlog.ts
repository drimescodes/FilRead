import samurai from "@/public/samurai_champloo.jpg";
export const mockBlogs = [
    {
      id: 1,
      title: "Sample Blog Post",
      slug: "sample-blog-post",
      tag: "Technology",
      date_added: "2023-10-01",
      reading_time: 5,
      image: samurai,
      description: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `.repeat(10),
      author: "John Doe",
    },
    {
      id: 2,
      title: "Another Post",
      slug: "another-post",
      tag: "Lifestyle",
      date_added: "2023-10-02",
      reading_time: 3,
      image: samurai,
      description: "<p>Another sample content.</p>",
      author: "Jane Doe",
    },
  ];