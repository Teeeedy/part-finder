import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AlertCircleIcon, Search } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance.js";
import { API_PATHS } from "@/utils/apiPaths.js";
import SearchResults from "../results/SearchResults.tsx";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert.tsx";

interface Make {
  make_id: number;
  make_name: string;
  created_at: string;
}

interface Model {
  model_id: number;
  make_id: number;
  model_name: string;
  created_at: string;
}

interface Type {
  type_id: number;
  type_name: string;
  created_at: string;
}

interface Part {
  part_id: number;
  part_no: string;
  make_id: number;
  model_id: number;
  type_id: number;
  created_at: string;
}

const SearchTool = () => {
  const [makes, setMakes] = useState<Make[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  const [selectedMake, setSelectedMake] = useState<Make | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [searchResults, setSearchResults] = useState<Part[]>([]);

  const [isMakeOpen, setIsMakeOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const [error, setError] = useState("");

  // Pulls initial makes from the backend
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const res = await axiosInstance.get<Make[]>(
          API_PATHS.DASHBOARD.GET_MAKES
        );
        setMakes(res.data);
      } catch (error) {
        console.error("Failed to fetch makes", error);
      }
    };
    fetchMakes();
  }, []);

  // Pulls models based on selected make
  useEffect(() => {
    if (!selectedMake) {
      setModels([]);
      setSelectedModel(null);
      return;
    }
    const getModels = async () => {
      try {
        const res = await axiosInstance.get<Model[]>(
          API_PATHS.DASHBOARD.GET_MODELS(selectedMake.make_id)
        );
        setModels(res.data);
      } catch (error) {
        console.error("Failed to fetch models", error);
      }
    };
    getModels();
  }, [selectedMake]);

  // Pulls Types based on selected make and model
  useEffect(() => {
    if (!selectedMake || !selectedModel) {
      setTypes([]);
      setSelectedType(null);
      return;
    }
    const getTypes = async () => {
      try {
        const res = await axiosInstance.get<Type[]>(
          API_PATHS.DASHBOARD.GET_TYPES(
            selectedMake.make_id,
            selectedModel.model_id
          )
        );
        setTypes(res.data);
      } catch (error) {
        console.error("Failed to fetch types", error);
      }
    };
    getTypes();
  }, [selectedMake, selectedModel]);

  // Handles reselection of make
  const onMakeChange = (makeId: string) => {
    const selected = makes.find((m) => m.make_id.toString() === makeId);
    setSelectedMake(selected || null);
    setSelectedModel(null);
    setSelectedType(null);
    setModels([]);
    setTypes([]);
    setIsMakeOpen(false);
    setIsModelOpen(true);
    setSearchResults([]);
  };

  // Handles reselection of model
  const onModelChange = (modelId: string) => {
    const selected = models.find((m) => m.model_id.toString() === modelId);
    setSelectedModel(selected || null);
    setSelectedType(null);
    setTypes([]);
    setIsModelOpen(false);
    setIsTypeOpen(true);
    setSearchResults([]);
  };

  // Handles reselection of Type
  const onTypeChange = (typeId: string) => {
    const selected = types.find((t) => t.type_id.toString() === typeId);
    setSelectedType(selected || null);
    setIsTypeOpen(false);
    setSearchResults([]);
  };

  // Pulls parts from backend based on selected make, model and type
  const handleSearch = async () => {
    // If you only want to search through hierarchy
    if (!selectedMake || !selectedModel || !selectedType) {
      setError("Must Select Value In All Search Fields.");
      return;
    }
    setError("");

    try {
      const res = await axiosInstance.get<Part[]>(
        API_PATHS.DASHBOARD.GET_PARTS(
          selectedMake ? selectedMake.make_id.toString() : "",
          selectedModel ? selectedModel.model_id.toString() : "",
          selectedType ? selectedType.type_id.toString() : ""
        )
      );
      setSearchResults(res.data);
    } catch (error) {
      console.error("Failed to fetch parts", error);
    }
  };

  // Clear button to clear all search filters except make
  const handleClear = () => {
    setSelectedMake(null);
    setSelectedModel(null);
    setSelectedType(null);
    setModels([]);
    setTypes([]);
    setSearchResults([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-4 mb-8">
      <div className="flex flex-col justify-center items-center rounded-xl shadow-md dark:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
        <Card className="w-full flex justify-center items-center">
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="font-bold text-3xl flex justify-center items-center gap-2">
              Search
              <Search size={25} strokeWidth={3} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col w-full md:flex-row justify-center items-center gap-10">
            {/* Make Selector */}
            <Select
              value={selectedMake?.make_id.toString() || ""}
              onValueChange={onMakeChange}
              disabled={!makes.length}
              open={isMakeOpen}
              onOpenChange={setIsMakeOpen}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent className="max-h-40">
                {makes.map((make) => (
                  <SelectItem
                    key={make.make_id}
                    value={make.make_id.toString()}>
                    {make.make_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Model Selector */}
            <Select
              value={selectedModel?.model_id.toString() || ""}
              onValueChange={onModelChange}
              disabled={!models.length}
              open={isModelOpen}
              onOpenChange={setIsModelOpen}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent className="max-h-40 ">
                {models.map((model) => (
                  <SelectItem
                    key={model.model_id}
                    value={model.model_id.toString()}>
                    {model.model_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Selector */}
            <Select
              value={selectedType?.type_id.toString() || ""}
              onValueChange={onTypeChange}
              disabled={!types.length}
              open={isTypeOpen}
              onOpenChange={setIsTypeOpen}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="max-h-40">
                {types.map((type) => (
                  <SelectItem
                    key={type.type_id}
                    value={type.type_id.toString()}>
                    {type.type_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="flex-col w-full md:flex-row justify-center items-center gap-5">
            <Button onClick={handleSearch} className="w-full md:w-48">
              Search
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="w-full md:w-48">
              Clear
            </Button>
          </CardFooter>

          {/* Error alert for incorrect searches */}
          {error && (
            <Alert
              className="border-none md:flex justify-center items-center"
              variant="destructive">
              <AlertCircleIcon className="mb-1" />
              <AlertTitle>Incorrect Search.</AlertTitle>
              <AlertDescription>
                <p>Please make sure all search fields are selected.</p>
              </AlertDescription>
            </Alert>
          )}
        </Card>
      </div>

      {/* Display parts pulled from backend */}
      {searchResults.length != 0 && (
        <SearchResults
          results={searchResults}
          selectedMake={selectedMake?.make_name || ""}
          selectedModel={selectedModel?.model_name || ""}
          selectedType={selectedType?.type_name || ""}
        />
      )}
    </div>
  );
};

export default SearchTool;
