"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/components/Spinner";
import { Blog } from "@/app/types/blog";
import { getApiUrl } from "@/utils/api";
import { withAuth } from "@/components/withAuth";
import { useAuthStore } from "@/app/store/authStore";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const API_BASE_URL = getApiUrl();
  const {accessToken} = useAuthStore();

useEffect(() => {
    fetchBlogs();
}, []);


  const fetchBlogs = async () => {
    try {
        const response = await axios.get<Blog[]>(`${API_BASE_URL}/user/blogs`, {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Make sure you have access to the accessToken
          }
        });
        setBlogs(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: "Error",
            description: "Failed to fetch blogs. Please try again later.",
            variant: "destructive"
          });
        }
      } finally {
        setPageLoading(false);
      }
    };
  
  

  const handleDelete = async (slug: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${slug}`);
      setBlogs(blogs.filter((blog) => blog.slug !== slug));
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (pageLoading) {
    return (
      <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-8 h-8 " />
    );
  }



  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Manage Your Blogs</h1>
      {blogs.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">{"You haven't created any blogs yet."}</p>
          <Button onClick={() => router.push("/admin/create_blog")}>
            Create Your First Blog
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog.id} className="bg-readreblack-2 border-readreblack-4">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-readrepurple-5">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {/* {blog.description} */}
                  <p dangerouslySetInnerHTML={{ __html: blog.description }} className="leading-relaxed text-white rendered-text" />
      
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => router.push(`/admin/edit-blog/${blog.slug}`)}
                  className="bg-readrepurple-5 hover:bg-readrepurple-6 hover:bg-opacity-90"
                >
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your blog.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(blog.slug)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

}
export default withAuth(ManageBlogs);
