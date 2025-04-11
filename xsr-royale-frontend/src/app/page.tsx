"use client";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
  return null; // Optional: ताकि कोई warning न आए
}
