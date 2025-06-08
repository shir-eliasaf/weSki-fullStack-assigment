import React from "react";
import { Hotel } from "../../types/hotel";

interface Props {
  hotels: Hotel[];
}

const ResultsList: React.FC<Props> = ({ hotels }) => {
  if (!hotels.length) {
    return <p>No hotels found for the selected filters</p>;
  }

  return (
    <div className="results-list">
      {hotels.map((hotel) => {
        const distanceToCenter = hotel.HotelInfo?.Position?.Distances?.find(
          d => d.type === "city_center"
        )?.distance;

        return (
          <div className="hotel-card" key={hotel.HotelCode}>

            <div className="hotel-details">
              <h3>{hotel.HotelName}</h3>
              <p>Rating: {hotel.HotelInfo?.Rating}stars</p>
              <p>Beds: {hotel.HotelInfo?.Beds}</p>
              <p>Price: €{hotel.PricesInfo?.AmountAfterTax}</p>
              {distanceToCenter && (
                <p>Distance to center: {distanceToCenter}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsList;
