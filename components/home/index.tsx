"use client";
import { Suspense } from "react";
import Header from "../header";
import FilterForm from "../form";

export default function Main() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<>Loading...</>}>
        <Header />
        <FilterForm />
      </Suspense>
    </main>
  );
}
