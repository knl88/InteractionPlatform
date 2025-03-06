import "@open-pioneer/runtime";

import { ResourceType } from "./ResourceTypeUtils";
import { DataProvider } from "../views/Search/Facets/DataProviderFacet/DataProviderFacet";

export interface SearchResultItem {
    id: string;
    title?: string;
    resourceType?: ResourceType;
    publishDate?: Date;
    updateDate?: Date;
    locality?: string;
    abstract?: string;
    url?: string;
    properties: {
        title: string;
        type: string;
        aicollection: string;
        description?: string;
    };
}

export interface SearchRequestParams {
    searchTerm?: string;
    resourceTypes?: string[];
    subjects?: string[];
    dataProvider?: string[];
    downloadOption: boolean;
    //pageSize?: number;
    //pageStart?: number;
    spatialFilter?: number[];
    temporalFilter?: TemporalFilter;
    temporalConfig?: TemporalConfig;
    sorting?: string;
}

export interface TemporalConfig {
    startYear: number;
    endYear: number;
    gap: string;
}

export interface TemporalFilter {
    startYear: number;
    endYear: number;
}

export interface TemporalFacet {
    dateStr: string;
    count: number;
}

export interface SolrSearchResultItem {
    id: string;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    time: string;
    provider: string;
    properties: {
        title: string;
        type: string;
        aicollection: string;
        description: string;
    };
}

export interface Facets {
    provider: DataProvider[];
}

export interface SearchResult {
    count: number;
    results: SearchResultItem[];
    facets: Facets;
}

export interface TextFileResponse {
    jobID: string,
    textfile: {
        href: string;
    };
}

const oapirUrl = import.meta.env.VITE_OAPIR_URL;
const zenodoUrl = "https://zenodo.org/api/records";

export class SearchService {
    doSearch(searchParams: SearchRequestParams): Promise<SearchResult> {
        const queryParams = this.createQueryParams();

        this.addSearchterm(searchParams.searchTerm, queryParams);

        this.addSearchResultsLimit(queryParams);

        this.addSpatialFilter(searchParams.spatialFilter, queryParams);

        this.addDataProvider(searchParams.dataProvider, queryParams);

        this.addDownloadOption(searchParams.downloadOption, queryParams);

        const url = `${oapirUrl}/search?${queryParams.toString()}`;

        return fetch(url).then((response) =>
            response.json().then((responseData) => {
                const response = responseData;

                if (response.numberMatched !== undefined && response.features !== undefined) {
                    return {
                        count: response.features.length,
                        results: response.features,
                        facets: {
                            provider: searchParams.dataProvider?.map((dp) => {
                                return { title: dp };
                            })
                        }
                    } as SearchResult;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    getZenodoMetadata(provider: string, id: string) {
        if (!provider || !id) {
            return Promise.reject(new Error("Invalid resourceId"));
        }
        const url = `${zenodoUrl}/${id}`;
        return fetch(url).then((response) =>
            response.json().then((responseData) => {
                if (responseData) {
                    return { response: responseData, provider: provider };
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    getDdasMetadata(provider: string, id: string) {
        if (!provider || !id) {
            return Promise.reject(new Error("Invalid resourceId"));
        }
        const url = `${oapirUrl}/collections/${provider}/items/${id}`;
        return fetch(url).then((response) =>
            response.json().then((responseData) => {
                if (responseData) {
                    return { response: responseData, provider: provider };
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    getDataToKnowledgePackages() {
        const url = `${zenodoUrl}/?communities=aquainfra&q=keywords:%22Data-To-Knowledge%20Package%22`;
        return fetch(url).then((response) =>
            response.json().then((responseData) => {
                if (responseData) {
                    return responseData;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    getDataProvider() {
        const url = oapirUrl + "/collections?f=json&lang=en-US";
        return fetch(url).then((response) =>
            response.text().then((responseData: string) => {
                if (responseData) {
                    return responseData;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    getRelatedSearchterms(keyword: string) {
        const baseUrl = "https://vm2558.kaj.pouta.csc.fi/rcsearch?keyword=";
        const url = baseUrl + keyword + "&broader=true&narrower=true&related=true";
        return fetch(url).then((response) =>
            response.text().then((responseData: string) => {
                if (responseData) {
                    return responseData;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    createTxtFile(url: string) {
        const data = {
            inputs: {
                link_from_ddas: url
            }
        };

        return fetch("https://aqua.igb-berlin.de/pygeoapi-dev/processes/get-ddas-galaxy-link-textfile/execution", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        })
            .then((response) => response.json().then((responseData: TextFileResponse) => {
                if (responseData) {
                    return responseData;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            }))
            .catch((error) => console.error(error));
    }

    getKnowledgePackages() {
        const url = "https://sandbox.zenodo.org/api/records?communities=aquainfra&q=keywords:%22Data-To-Knowledge%20Package%22";

        return fetch(url).then((response) =>
            response.json().then((responseData: object) => {
                if (responseData) {
                    return responseData;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    processCatchment(lon:number, lat: number) {
        const url = "https://aqua.igb-berlin.de/pygeoapi-dev/processes/get-upstream-dissolved/execution";
        
        const data = {
            inputs: {
                lon: lon,
                lat: lat,
                comment: "..."
            }
        };

        return fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        })
            .then((response) => response.json().then((result) => {
                if (result) {
                    return result;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(result));
                }
            }))
            .catch((error) => console.error(error));
    }

    private addSpatialFilter(spatialFilter: number[] | undefined, queryParams: URLSearchParams) {
        if (spatialFilter && spatialFilter.length > 0) {
            if (spatialFilter.length === 4) {
                const [minLat, minLon, maxLat, maxLon] = spatialFilter;
                queryParams.set("bbox", `${minLat},${minLon},${maxLat},${maxLon}`);
            }
        }
    }

    private addDataProvider(dataProvider: string[] | undefined, queryParams: URLSearchParams) {
        if (dataProvider?.length) {
            queryParams.set("collections", `${dataProvider.map((e) => `${e}`).join(",")}`);
        }
    }

    private addDownloadOption(downloadOption: boolean, queryParams: URLSearchParams) {
        if (downloadOption) {
            queryParams.set("rdl", `${downloadOption}`);
        }
    }

    private addSearchResultsLimit(
        /*pageSize: number | undefined,
        pageStart: number | undefined,*/
        queryParams: URLSearchParams
    ) {
        queryParams.set("limit", "100");
    }

    private addSearchterm(searchTerm: string | undefined, queryParams: URLSearchParams) {
        if (searchTerm) {
            queryParams.set("q", searchTerm);
        }
    }

    private createQueryParams(): URLSearchParams {
        const queryParams: URLSearchParams = new URLSearchParams();
        return queryParams;
    }
}

declare module "@open-pioneer/runtime" {
    interface ServiceRegistry {
        "onestop4all.SearchService": SearchService;
    }
}
