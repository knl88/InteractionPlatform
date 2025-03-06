import { Box, Button, Flex } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { SelectableDataProvider, UrlSearchParameterType, useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";
import { SearchService } from "../../../../services";
import { useSearchParams } from "react-router-dom";

export interface DataProvider {
    title: string;
}

export interface ProviderWithResults {
    id: string;
    count: number;
}

export function DataProviderFacet() {
    const searchState = useSearchState();
    const [entries, setEntries] = useState<SelectableDataProvider[]>([]);
    const [allSelected, setAllSelected] = useState(true);
    const [providerWithResults, setProviderWithResults] = useState<ProviderWithResults[]>();
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        searchSrvc.getDataProvider().then((res) => {
            if (res) {
                const sortedEntries = JSON.parse(res).collections.sort(
                    (a: DataProvider, b: DataProvider) =>
                        a.title.toLocaleUpperCase().localeCompare(b.title.toLocaleUpperCase())
                );
                let filteredEntries = sortedEntries.filter((entry: any) => entry.id !== "dataeurope");
                filteredEntries = filteredEntries.filter((entry: any) => entry.id !== "gbif");
                setEntries(filteredEntries);

                const ids = filteredEntries.map((entry: any) => entry.id);
                if (searchState.selectedDataProvider.length === 0) {
                    searchState.setSelectedDataProvider(ids);
                    searchState.setSelectedDataProviderTmp(ids);
                }
                setAllSelected(true);
                const providerTitles = filteredEntries.map((se: any) => {
                    return { title: se.title, id: se.id, description: se.description };
                });
                searchState.setDataProviderTitles(providerTitles);
                setLoading(false);
            }
        }).catch((e) => {
            console.error("Error fetching data providers:", e);
            setLoading(false);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setProviderWithResults([]);
        if (searchState.selectedDataProvider.length > 0) {
            const providerWithResults: ProviderWithResults[] = [];
            const providerTitles = searchState.dataProviderTitles;
            const { searchTerm, downloadOption, spatialFilter } = searchState;
            let i = 0;
            providerTitles.length && searchState.searchTerm.trim() !== "" && providerTitles.map((elem: any, key: number) => {
                searchSrvc.doSearch({
                    searchTerm,
                    dataProvider: [elem.id],
                    downloadOption,
                    spatialFilter
                }).then((res) => {
                    i++;
                    if (res.count > 0) {
                        providerWithResults.push({ id: elem.id, count: res.count });
                    }
                    if (providerTitles.length === i) {
                        setProviderWithResults(providerWithResults);
                    }
                }).catch((e: any) => {
                    console.log(e);
                    i++;
                });
            });
        }
    }, [
        searchState.dataProviderTitles,
        searchState.searchTerm,
        searchState.downloadOption,
        searchState.spatialFilter
    ]);

    function dataProviderToggled(checked: boolean, entry: any) {
        searchState.setDataProviderTriggered(false);
        if (checked) {
            searchState.setSelectedDataProvider([...searchState.selectedDataProvider, entry.id]);
        } else {
            searchState.setSelectedDataProvider(
                searchState.selectedDataProvider.filter((e: any) => e !== entry.id)
            );
        }
    }

    useEffect(() => {
        const checkedDataProvider = searchState.selectedDataProvider;
        const requestDataProvider = searchParams.getAll(UrlSearchParameterType.DataProvider);
    
        const areArraysEqual = (arr1: string[], arr2: string[]) => {
            if (arr1.length !== arr2.length) return false;
            return new Set(arr1).size === new Set([...arr1, ...arr2]).size;
        };
    
        searchState.setDataProviderTriggered(areArraysEqual(checkedDataProvider, requestDataProvider));
    }, [searchState.selectedDataProvider, searchParams]);
    

    const toggleAllSelection = () => {
        searchState.setDataProviderTriggered(false);
        if (allSelected) {
            searchState.setSelectedDataProvider([]);
        } else {
            searchState.setSelectedDataProvider(entries.map(({ id }) => id));
        }
        setAllSelected(!allSelected);
    };

    if (loading) return null;

    return (
        entries.length > 0 ? (
            <FacetBase  title={searchState.dataProviderTriggered ? "Data provider" : <span style={{color: "red"}}>*Press &quot;search&quot; to update request!*</span>} expanded>
                <SimpleGrid columns={[1, 2]} spacing={3} marginTop={"1%"}>
                    {entries.map((entry: any, i) =>
                        entry.id !== "dataeurope" ? (
                            <Flex key={i}>
                                <FacetCheckbox
                                    label={entry.title}
                                    description={entry.description}
                                    isChecked={searchState.selectedDataProvider.includes(entry.id)}
                                    onChange={(event) =>
                                        dataProviderToggled(event.target.checked, entry)
                                    }
                                    count={providerWithResults?.find(result => result.id === entry.id)?.count}
                                />
                            </Flex>
                        ) : null
                    )}
                </SimpleGrid>
                {entries.length > 0 ? (
                    <Box pt={5}>
                        <Button w={"100%"} onClick={toggleAllSelection}>
                            {allSelected ? "Uncheck all data providers" : "Select all data providers"}
                        </Button>
                    </Box>
                ) : null}
            </FacetBase>
        ) : (
            <Box color={"red"}>
                No data providers available. Either the DDAS is down or your wifi connection is instable. Please contact m.konkol [at] 52north.org.
            </Box>
        )
    );
}

