import GeneratorForm from "@/components/GeneratorForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-center">
        AI Content Studio
      </h1>

      <GeneratorForm />
    </main>
  );
}