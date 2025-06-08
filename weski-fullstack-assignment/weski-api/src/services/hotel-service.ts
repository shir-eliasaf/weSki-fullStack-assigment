import axios, { AxiosResponse } from 'axios';
import {externalApiUrls} from '../config/external-api-urls'

const getGroupSizes = (requestedSize: number, maxSize: number = 10): number[] => {
  const sizes: number[] = [];
  for (let size = requestedSize; size <= maxSize; size++) {
    sizes.push(size);
  }
  return sizes;
};

const uniqueHotels = (allAccommodations: any[]): Map<string, any> => {
  const uniqueMap = new Map<string, any>();
  allAccommodations.forEach((hotel) => {
    if (!uniqueMap.has(hotel.HotelCode)) {
      uniqueMap.set(hotel.HotelCode, hotel);
    }
  });
  return uniqueMap;
};

const sortHotels = (uniqueMap: Map<string, any>) => {
  return Array.from(uniqueMap.values()).sort((a, b) => {
    const priceA = parseFloat(a.PricesInfo?.AmountAfterTax || '0');
    const priceB = parseFloat(b.PricesInfo?.AmountAfterTax || '0');
    return priceA - priceB;
  });
};

export const fetchHotels = async (query: {
  ski_site: string;
  from_date: string;
  to_date: string;
  group_size: number;
}) => {
  const { ski_site, from_date, to_date, group_size } = query;

  const groupSizesToTry = getGroupSizes(group_size);

  const allRequests:  Promise<AxiosResponse<any>>[] = [];

  for (const apiUrl of externalApiUrls) {
    for (const size of groupSizesToTry) {
      allRequests.push(
        axios.post(apiUrl, {
          query: {
            ski_site,
            from_date,
            to_date,
            group_size: size,
          },
        })
      );
    }
  }

  const responses = await Promise.allSettled(allRequests);

  const allAccommodations: any[] = [];

  responses.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const body = result.value.data?.body;
      if (body?.accommodations && Array.isArray(body.accommodations)) {
        allAccommodations.push(...body.accommodations);
      }
    } else {
      console.warn(`Request ${index} failed:`, result.reason);
    }
  });

  const unique = uniqueHotels(allAccommodations);
  return sortHotels(unique);
};
