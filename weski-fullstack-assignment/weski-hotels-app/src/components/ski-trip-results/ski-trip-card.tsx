import React from "react";

export interface SkiTripCardProps {
  destination: string;
  hotelName: string;
  picture?: string;
  price: number;
  rate: number;
  id: string;
}

const SkiTripCard: React.FC<SkiTripCardProps> = ({
  destination,
  hotelName,
  picture,
  price,
  rate,
  id,
}) => {
  return (
    <div className="flex max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border">
      <div className="w-1/2">
        <img
          src={picture}
          alt={hotelName}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {hotelName}
          </h2>
          <div className="flex items-center text-yellow-400 mb-2 space-x-1">
            {Array.from({ length: rate }).map((_, i) => (
              <span key={i}>*</span>
            ))}
          </div>
          <div className="flex items-center text-gray-500 mb-6">
            {destination}
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">£{price}</span>
          <span className="text-gray-500 text-sm"> /per person</span>
        </div>
      </div>
    </div>
  );
};

export default SkiTripCard;

//the impliment of skiTripCard, wierd class names, need to change and use sccs
