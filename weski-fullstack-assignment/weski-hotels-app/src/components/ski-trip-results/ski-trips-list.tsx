import React from "react";

import { Hotel } from "../../types/hotel";
import SkiTripCard from "./ski-trip-card";

interface SkiCardsListProps {
  skiTrips: Hotel[];
  skiResort: string;
}

const SkiCardsList: React.FC<SkiCardsListProps> = ({ skiTrips, skiResort }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skiTrips.map((hotel) => (
        <SkiTripCard
          id={hotel.HotelCode}
          destination={skiResort}
          hotelName={hotel.HotelName}
          price={Number(hotel.PricesInfo?.AmountAfterTax)}
          rate={Number(hotel.HotelInfo?.Rating)}
        />
      ))}
    </div>
  );
};

export default SkiCardsList;

//need to use sccs
