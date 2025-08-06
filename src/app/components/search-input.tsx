//@ts-nocheck
"use client";

import { TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    async function getSuggestions() {
      try {
        const res = await fetch(
          "http://localhost:3000/api/search/suggestion?q=" + encodeURIComponent(input)
        );
        const data = await res.json();
        if (data.success) {
          setSuggestions(data.suggestions);
        }
      } catch (err) {
        console.error("Suggestion fetch error:", err);
      }
    }

    if (input.trim()) {
      timeoutId = setTimeout(() => {
        getSuggestions();
      }, 500);
    } else {
      setSuggestions([]);
    }

    return () => clearTimeout(timeoutId);
  }, [input]);

  return (
    <form
      action="/search"
      method="GET"
      className="relative flex items-center gap-4 w-full"
    >
      <TextField.Root
        name="q"
        type="text"
        placeholder="Search for jobs..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      >

        <TextField.Slot>
          <Search className="w-4 h-4 text-gray-400" />
        </TextField.Slot>
      </TextField.Root>

      {Array.isArray(suggestions) && suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white shadow-md rounded border z-50">
          {suggestions.map((elem) => (
            <Link
              key={elem.id}
              href={`/search?q=${encodeURIComponent(elem.title)}`}
              className="block px-4 py-2 hover:bg-gray-100 truncate"
            >
              {elem.title}
            </Link>
          ))}
        </div>
      )}
    </form>
  );
}
