import { IModels } from '@/types/IModels';
import Link from 'next/link';
import fetch from 'node-fetch';

interface ResultPageProps {
  params: { makeId: string; year: string };
}

export async function generateStaticParams() {
  const makeIds = ['440', '441', '442']; 
  const years = ['2020', '2021', '2022']; 

  const params = makeIds.flatMap((makeId) =>
    years.map((year) => ({
      makeId,
      year,
    }))
  );

  return params;
}

export default async function Result({ params }: ResultPageProps) {
  const { makeId, year } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Error fetching data
        </h1>
        <p>Failed to fetch models for make ID {makeId} and year {year}.</p>
      </div>
    );
  }

  const data = await res.json() as { Results: IModels[] };
  const models: IModels[] = data.Results || [];

  return (
<div className="min-h-screen p-6 bg-gray-100 relative">
<Link href={"/"}>
      <button
        className={`w-fit p-4 rounded-lg font-semibold text-white bg-black hover:scale-110
        }`}
      >
        Back to Home page
      </button>
    </Link>
  <h1 className="text-3xl font-bold mb-4 text-center text-black p-12">
    Results for Make ID: {makeId} - Year: {year}
  </h1>
  {models.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <div key={model.Model_ID} className="p-4 bg-white shadow-md rounded-md border border-gray-300">
          <p className="text-lg font-semibold text-gray-800">{model.Model_Name}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="mt-10">
      <p className="text-center text-gray-700 font-medium">
        No models found for the selected make and year.
      </p>
    </div>
  )}
</div>

  );
}
