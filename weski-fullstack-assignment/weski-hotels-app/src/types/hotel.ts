export interface Hotel {
  HotelCode: string;
  HotelName: string;
  HotelDescriptiveContent?: {
    Images?: { URL: string; MainImage?: string }[];
  };
  HotelInfo?: {
    Position?: {
      Latitude?: string;
      Longitude?: string;
      Distances?: { type: string; distance: string }[];
    };
    Rating?: string;
    Beds?: string;
  };
  PricesInfo?: {
    AmountAfterTax: string;
    AmountBeforeTax?: string;
  };
}
