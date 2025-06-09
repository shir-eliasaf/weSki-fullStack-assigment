// src/context/hotel-context.tsx

import React, { createContext, useState } from "react";

interface Hotel {
  HotelCode: string;
  HotelName: string;
  [key: string]: any;
}

interface HotelsContextType {
  hotels: Hotel[];
  setHotels: React.Dispatch<React.SetStateAction<Hotel[]>>;
}

export const HotelsContext = createContext<HotelsContextType>({
  hotels: [],
  setHotels: () => {},
});

export const HotelsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  return (
    <HotelsContext.Provider value={{ hotels, setHotels }}>
      {children}
    </HotelsContext.Provider>
  );
};
