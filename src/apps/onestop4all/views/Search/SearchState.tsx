import { useService } from "open-pioneer:react-hooks";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ResourceType } from "../../services/ResourceTypeUtils";
import { SearchResult, SearchService } from "../../services/SearchService";

export enum UrlSearchParameterType {
    Searchterm = "searchterm",
    SpatialFilter = "spatialfilter",
    PageSize = "pageSize",
    PageStart = "pageStart",
    SortingFilter = "sort",
    DataProvider = "dataProvider",
    DownloadOption = "rdl"
}

export interface UrlSearchParams {
    [UrlSearchParameterType.Searchterm]?: string;
    [UrlSearchParameterType.SpatialFilter]?: string;
    [UrlSearchParameterType.PageSize]?: string;
    [UrlSearchParameterType.PageStart]?: string;
    [UrlSearchParameterType.SortingFilter]?: string;
    [UrlSearchParameterType.DataProvider]?: string[];
    [UrlSearchParameterType.DownloadOption]?: string;
}

export const SortOptions: SortOption[] = [
    { label: "Relevanz", term: "" },
    { label: "Title (A-Z)", term: "mainTitle asc" },
    { label: "Title (Z-A)", term: "mainTitle desc" }
];

export interface SelectableDataProvider {
    id: string;
    selected: boolean;
    title: string;
}

export interface SortOption {
    label: string;
    term: string;
}

export interface ISearchState {
    searchTerm: string;
    setSearchTerm(searchTerm: string): void;
    downloadOption: boolean;
    setDownloadOption(downloadOption: boolean): void;
    selectedDataProvider: string[];
    setSelectedDataProvider(dataProvider: string[]): void;
    selectedDataProviderTmp: string[];
    setSelectedDataProviderTmp(dataProvider: string[]): void;
    dkps: any[] | undefined;
    setDkps(dkps: any[]): void;
    dataProviderTriggered: boolean;
    setDataProviderTriggered(dataProviderTriggered: boolean): void;
    relatedTerms: any;
    setRelatedTerms(obj: any): void;
    relatedTermsKeyword: string | undefined;
    setRelatedTermsKeyword(rtkw: string): void;
    dataProviderTitles: string[];
    setDataProviderTitles(dataProviderTitles: string[]): void;
    selectableDataProvider: SelectableDataProvider[];
    spatialFilter: number[];
    setSpatialFilter(sf: number[]): void;
    pageSize: number;
    setPageSize(pageSize: number): void;
    pageStart: number;
    setPageStart(pageSize: number): void;
    searchResults: SearchResult | undefined;
    isLoaded: boolean;
    sorting: SortOption | undefined;
    setSorting(sortOption: SortOption): unknown;
    search(): void;
}

export const SearchStateContext = createContext<ISearchState | undefined>(undefined);

export interface SearchFilter {
    searchTerm?: string;
}

export const useSearchState = () => {
    const context = useContext(SearchStateContext);
    if (context === undefined) {
        throw new Error(
            "SearchStateContext was not provided. Make sure your component is a child of SearchState."
        );
    }
    return context;
};

export const SearchState = (props: PropsWithChildren) => {
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;
    const [searchParams] = useSearchParams();

    // init search results and loading state
    const [searchResults, setSearchResults] = useState<SearchResult>();
    const [isLoaded, setIsLoaded] = useState(true);

    // init search term
    const [searchTerm, setSearchTerm] = useState<string>(
        searchParams.get(UrlSearchParameterType.Searchterm) || ""
    );

    // init page size
    const pSize = parseInt(searchParams.get(UrlSearchParameterType.PageSize) || "20");
    const [pageSize, setPageSize] = useState<number>(pSize);

    // init page start
    const pStart = parseInt(searchParams.get(UrlSearchParameterType.PageStart) || "0");
    const [pageStart, setPageStart] = useState<number>(pStart);

    // init selected dataProvider
    const [selectableDataProvider, setSelectableDataProvider] = useState<SelectableDataProvider[]>(
        []
    );

    // init selected data provider
    const dPr: string[] = [];
    const urlDp = searchParams.getAll(UrlSearchParameterType.DataProvider);
    if (urlDp?.length) {
        urlDp.forEach((e) => e && dPr.push(e));
    }
    const [selectedDataProvider, setSelectedDataProvider] = useState<string[]>(dPr);
    const [selectedDataProviderTmp, setSelectedDataProviderTmp] = useState<string[]>(dPr);

    const [relatedTerms, setRelatedTerms] = useState<any>();
    const [relatedTermsKeyword, setRelatedTermsKeyword] = useState<string>();

    const [dkps, setDkps] = useState<any[]>();
    const [dataProviderTriggered, setDataProviderTriggered] = useState<boolean>(true);

    //init download option
    const [downloadOption, setDownloadOption] = useState<boolean>(false);

    // init spatial filter
    let sp: number[] = [];
    const coordString = searchParams.get(UrlSearchParameterType.SpatialFilter);
    if (coordString) {
        const coords = coordString.split(",").map((c) => Number.parseFloat(c));
        if (coords.length === 4) {
            sp = coords;
        }
    }
    const [spatialFilter, setSpatialFilter] = useState(sp);
    const [dataProviderTitles, setDataProviderTitles] = useState<string[]>([]);

    // sorting
    const sortString = searchParams.get(UrlSearchParameterType.SortingFilter);
    const sortMatch = SortOptions.find((so) => so.term === sortString);
    const sort = sortMatch || SortOptions[0];
    const [sorting, setSorting] = useState<SortOption | undefined>(sort);

    function search() {
        setIsLoaded(false);
        setDataProviderTriggered(true);
        selectedDataProvider.length > 0 && searchTerm.trim() !== ""
            ? searchSrvc
                .doSearch({
                    searchTerm,
                    dataProvider: selectedDataProvider.map((e:any) => e.id ? e.id : e),
                    downloadOption,
                    spatialFilter,
                    sorting: sorting?.term
                })
                .then((result) => {
                    setIsLoaded(true);
                    setSearchResults(result);
                    const dataProviderFacet = result.facets.provider.map((dataprovider) => {
                        return {
                            id: dataprovider.title,
                            title: dataprovider.title,
                            selected:
                                selectableDataProvider.findIndex(
                                    (selectabledataprovider) =>
                                        selectabledataprovider.title === dataprovider.title
                                ) >= 0
                        };
                    });
                    setSelectableDataProvider(dataProviderFacet);
                })
                .catch((error) => {
                    setIsLoaded(true);
                    console.error(error);
                })
            : setIsLoaded(true);
        setSearchResults(undefined);
    }

    const state: ISearchState = {
        searchTerm,
        setSearchTerm: (value) => {
            setSearchTerm(value);
            setPageStart(0);
        },
        spatialFilter,
        setSpatialFilter: (value) => {
            setSpatialFilter(value);
            setPageStart(0);
        },
        pageSize,
        setPageSize: (value) => {
            setPageSize(value);
            setPageStart(0);
        },
        pageStart,
        setPageStart,
        searchResults,
        isLoaded,
        sorting,
        setSorting(sortOption) {
            setSorting(sortOption);
            setPageStart(0);
        },
        search,
        setSelectedDataProvider,
        selectedDataProvider,
        selectedDataProviderTmp,
        setSelectedDataProviderTmp,
        relatedTerms,
        setRelatedTerms,
        dkps,
        setDkps,
        dataProviderTriggered,
        setDataProviderTriggered,
        relatedTermsKeyword,
        setRelatedTermsKeyword,
        selectableDataProvider,
        setDataProviderTitles,
        dataProviderTitles,
        downloadOption,
        setDownloadOption
    };

    return (
        <>
            <SearchStateContext.Provider value={state}>
                {props.children}
            </SearchStateContext.Provider>
        </>
    );
};
