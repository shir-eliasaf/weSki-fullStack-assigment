import React from "react";

import NavBar from "./components/navbar/nav-bar";
import SkiTripCard, {
  SkiTripCardProps,
} from "./components/ski-trip-results/ski-trip-card";
import TripInfo, {
  TripInfoProps,
} from "./components/ski-trip-results/trip-info";
// import { HotelsProvider } from "./context/hotel-context";

const trip: SkiTripCardProps = {
  destination: "La Plagne",
  hotelName: "Hotel Banyan",
  price: 1485,
  rate: 4,
  id: "2",
};
const tripDetails: TripInfoProps = {
  tripList: 22,
  location: "La Plagne",
  dates: "Dec 1 - Dec 12",
  people: 2,
};
const App: React.FC = () => {
  return (
    <div className="app">
      <NavBar />
      <TripInfo {...tripDetails} />
      <SkiTripCard {...trip} />
    </div>
  );
};

export default App;

//remove the examples
