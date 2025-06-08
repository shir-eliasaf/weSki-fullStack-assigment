type Hotel = {
  id: number;
  name: string;
};

interface HotelSearchQuery {
  query: {
    ski_site: number;
    from_date: string;
    to_date: string;
    group_size: number;
  };
}

export {Hotel, HotelSearchQuery };

