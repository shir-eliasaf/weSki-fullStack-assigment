import React, { useState } from "react";
import "./search-button.scss";

interface Props {
  skiSiteId: number;
  groupSize: number;
  fromDate: string;
  toDate: string;
}

const SearchButton: React.FC<Props> = ({
  skiSiteId,
  groupSize,
  fromDate,
  toDate,
}) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setResults([]);

    const query = {
      ski_site: skiSiteId,
      from_date: fromDate,
      to_date: toDate,
      group_size: groupSize,
    };

    const url = new URL("http://localhost:3000/api/sse-hotels");
    url.searchParams.append("ski_site", String(query.ski_site));
    url.searchParams.append("from_date", query.from_date);
    url.searchParams.append("to_date", query.to_date);
    url.searchParams.append("group_size", String(query.group_size));

    const eventSource = new EventSource(url.toString());
    eventSource.onmessage = (event) => {
      const hotel = JSON.parse(event.data);
      setResults((prev) => [...prev, hotel]);
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      eventSource.close();
      setLoading(false);
    };
  };

  return (
    <>
      <button className="search-button" onClick={handleSearch}>
        {loading ? "Searching..." : "Search"}
      </button>

      <ul>
        {results.map((hotel, index) => (
          <li key={index}>{hotel?.HotelName || "Unnamed Hotel"}</li>
        ))}
      </ul>
    </>
  );
};

export default SearchButton;
