"use client";

import { useQuery } from "@tanstack/react-query";

export default function HomePage() {

  const {
    data,
  } = useQuery({
    queryKey: ["test"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json()),
  });

  return (
    <div>{JSON.stringify(data)}</div>
  );
}