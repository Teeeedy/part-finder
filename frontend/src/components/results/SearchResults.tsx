import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface SearchResultsProps {
  results: {
    part_id: number;
    part_no: string;
    make_id: number;
    model_id: number;
    type_id: number;
    created_at: string;
  }[];
  selectedMake: string;
  selectedModel: string;
  selectedType: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  selectedMake,
  selectedModel,
  selectedType,
}) => {
  if (results.length === 0)
    return <p className="text-center mt-4">No parts found.</p>;

  return (
    <div className="mt-6 w-full max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      {results.map((result) => (
        <Card
          className="shadow-md dark:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
          key={result.part_id}>
          <CardHeader>
            <CardTitle>Part No: {result.part_no}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {selectedType} for {selectedMake} {selectedModel}
            </p>
          </CardContent>
          <CardFooter>
            <p>Part ID: {result.part_id}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
