import { getFunctionaries } from "@/lib/api";

export default async function Home() {
  const functionaries = await getFunctionaries();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        HIMAFORTIC UNESA Functionaries 2024/2025
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {functionaries.map((person) => (
          <div key={person.id} className="border rounded-lg p-4 shadow-md bg-card text-card-foreground">
            <h2 className="text-xl font-semibold">{person.attributes.name}</h2>
            <p className="text-muted-foreground">{person.attributes.position}</p>
            <div className="text-sm mt-2">
              <p>NIM: {person.attributes.NIM}</p>
              <p>Class of: {person.attributes.class_year}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
