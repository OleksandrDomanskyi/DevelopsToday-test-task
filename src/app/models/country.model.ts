export interface Country {
  countryCode: "string",
  name: "string"
}

export interface CountriesResponse {
  data: Country[];
}