import axios, { AxiosResponse } from "axios";
import Agent from "agentkeepalive";
import { HttpsAgent } from "agentkeepalive";
import { externalApiUrls } from "../config/external-api-urls";

const httpAgent = new Agent({ maxSockets: 100 });
const httpsAgent = new HttpsAgent({ maxSockets: 100 });

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const isHttps = config.url?.startsWith("https://");
  if (isHttps) {
    config.httpsAgent = httpsAgent;
  } else {
    config.httpAgent = httpAgent;
  }
  return config;
});

const getGroupSizes = (requestedSize: number, maxSize = 10): number[] => {
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
    const priceA = parseFloat(a.PricesInfo?.AmountAfterTax || "0");
    const priceB = parseFloat(b.PricesInfo?.AmountAfterTax || "0");
    return priceA - priceB;
  });
};

export const streamHotels = async function* (query: {
  ski_site: string;
  from_date: string;
  to_date: string;
  group_size: number;
}) {
  const { ski_site, from_date, to_date, group_size } = query;
  const groupSizesToTry = getGroupSizes(group_size);
  const sentHotelCodes = new Set<string>();

  for (const apiUrl of externalApiUrls) {
    for (const size of groupSizesToTry) {
      try {
        const response = await axiosInstance.post(apiUrl, {
          query: {
            ski_site,
            from_date,
            to_date,
            group_size: size,
          },
        });

        const accommodations = response.data?.body?.accommodations || [];
        for (const hotel of accommodations) {
          if (!sentHotelCodes.has(hotel.HotelCode)) {
            sentHotelCodes.add(hotel.HotelCode);
            yield hotel;
          }
        }
      } catch (error: any) {
        console.warn(`Stream request failed for ${apiUrl}`, error.message);
      }
    }
  }
};

export const fetchHotels = async (query: {
  ski_site: string;
  from_date: string;
  to_date: string;
  group_size: number;
}) => {
  const hotels: any[] = [];
  for await (const hotel of streamHotels(query)) {
    hotels.push(hotel);
  }
  const unique = uniqueHotels(hotels);
  return sortHotels(unique);
};

//use utils (getGroupSizes, uniqueHotels, sortHotels functions), seperate the axiosInstance.create (lines 9-19) to another file
