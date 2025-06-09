import React from "react";

export interface TripInfoProps {
  tripList: number;
  location: string;
  dates: string;
  people: number;
}

const TripInfo: React.FC<TripInfoProps> = ({
  tripList,
  location,
  dates,
  people,
}) => {
  return (
    <div>
      <h2>Trip Details</h2>
      <p>Trip List: {tripList}</p>
      <p>Location: {location}</p>
      <p>Dates: {dates}</p>
      <p>People: {people}</p>
    </div>
  );
};

export default TripInfo;

//need to use sccs
