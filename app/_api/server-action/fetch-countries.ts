"use server";

import { ICountriesResponse } from "@/app/_interface/general.interface";
import axios from "axios";

export const fetchCountries = async (): Promise<ICountriesResponse> => {
  const response = await axios({
    url: "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code",
    method: "GET",
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("[Fetch Countries]", error);
    });

  return response;
};
