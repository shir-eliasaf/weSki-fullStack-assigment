import React, { useState } from "react";
import './search-button.scss';

interface Props {
    onClick?: () => void;
}

const SearchButton: React.FC<Props> = ({onClick}) => {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    const payload = {
      query: {
        ski_site: 1,
        from_date: "03/04/2025",
        to_date: "03/11/2025",
        group_size: 2
      }
    };

    try {
      const response = await fetch("http://localhost:3000/api/proxy-hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data.hotels || []);
      } else {
        setError("שגיאה בחיפוש מלונות");
      }
    } catch (err: any) {
      console.error(err);
      setError("שגיאה בשרת");
    } finally {
      setLoading(false);
    }
  };
    return (
        <button className="search-button" onClick={handleSearch}>
            Search
        </button>
        
    );
}

export default SearchButton;