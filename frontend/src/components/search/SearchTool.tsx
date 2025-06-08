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
import { Search } from "lucide-react";

const SearchTool = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");

  const handleSearch = () => {
    // TBD
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6  space-y-4 mb-8">
      <div className="flex flex-col justify-center items-center rounded-xl gap-5 shadow-md dark:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
        <Card className="w-full flex justify-center items-center">
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="font-bold text-3xl flex justify-center items-center gap-2">
              Search
              <Search size={25} strokeWidth={3} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col w-full md:flex-row justify-center items-center gap-10">
            {/* Make Selector */}
            <Select onValueChange={setMake}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue className="text-center" placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Item">Item</SelectItem>
              </SelectContent>
            </Select>

            {/* Model Selector*/}
            <Select onValueChange={setModel}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Item">Item</SelectItem>
              </SelectContent>
            </Select>

            {/* Type  Selector*/}
            <Select onValueChange={setType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Item">Item</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="flex-col w-full md:flex-row justify-center items-center gap-5">
            <Button className="w-full md:w-48">Search</Button>
            <Button variant="outline" className="w-full md:w-48">
              Clear
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SearchTool;
