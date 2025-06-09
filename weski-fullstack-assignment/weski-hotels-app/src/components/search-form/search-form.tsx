import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import React, { useState } from "react";

import "./search-form.scss";
import GuestsSelect from "./guests-select/guests-select";
import SearchButton from "./search-button/search-button";
import ResortsSelect from "./resorts-select/resorts-select";

const SearchForm: React.FC = () => {
  const [skiSiteId, setSkiSiteId] = useState<number>(1);
  const [groupSize, setGroupSize] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(dayjs().toDate());
  const [endDate, setEndDate] = useState<Date | null>(
    dayjs().add(7, "days").toDate()
  );
  const [hotels, setHotels] = useState<any[]>([]);

  const formatDate = (date: Date | null): string => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  const query = {
    skiSiteId: skiSiteId,
    fromDate: formatDate(startDate),
    toDate: formatDate(endDate),
    groupSize: groupSize,
  };

  return (
    <div className="search-form">
      <ResortsSelect value={skiSiteId} onChange={(id) => setSkiSiteId(id)} />
      <GuestsSelect value={groupSize} onChange={(size) => setGroupSize(size)} />

      <DatePicker
        className="search-form-date-picker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        enableTabLoop={false}
      />
      <DatePicker
        className="search-form-date-picker"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        enableTabLoop={false}
      />

      <SearchButton {...query} />
      {hotels.length > 0 && (
        <div className="search-results">
          <h3>Found {hotels.length} hotels:</h3>
          {hotels.map((hotel) => (
            <div key={hotel.HotelCode}>
              <strong>{hotel.HotelName}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
