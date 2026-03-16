import type { Post, PostCreate, PostUpdate } from "../types/post";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json();
}

export function fetchPosts(): Promise<Post[]> {
  return request("/api/posts");
}

export function fetchPost(id: number): Promise<Post> {
  return request(`/api/posts/${id}`);
}

export function createPost(data: PostCreate): Promise<Post> {
  return request("/api/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updatePost(id: number, data: PostUpdate): Promise<Post> {
  return request(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deletePost(id: number): Promise<void> {
  return request(`/api/posts/${id}`, { method: "DELETE" });
}
