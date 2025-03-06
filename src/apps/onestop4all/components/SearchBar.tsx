import { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Flex, IconButton, Input } from "@open-pioneer/chakra-integration";
import { UrlSearchParameterType, UrlSearchParams, useSearchState } from "../views/Search/SearchState";
import { SearchIcon } from "./Icons";

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const searchState = useSearchState();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setSearchTerm(searchState.searchTerm);
    }, [searchState.searchTerm]);

    const startSearch = () => {
        searchState.setSearchTerm(searchTerm);
        searchState.setSelectedDataProviderTmp(searchState.selectedDataProvider);
    
        if (location.pathname.endsWith("/search")) return;
    
        const params: UrlSearchParams = {
            [UrlSearchParameterType.Searchterm]: searchTerm,
            [UrlSearchParameterType.DataProvider]: searchState.selectedDataProvider,
            [UrlSearchParameterType.DownloadOption]: `${searchState.downloadOption}`
        };
    
        navigate({
            pathname: "/search",
            search: `?${createSearchParams({...params})}`
        });
    };

    return (
        <Box borderWidth={{ base: "10px", custombreak: "15px" }} borderColor="rgba(5, 102, 141, 0.7)">
            <Flex direction={{ base: "column", custombreak: "row" }} bg="white" align="center" p={2} gap={2}>
                <Input
                    placeholder="Search for research data"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && startSearch()}
                    borderColor="gray.300"
                    flex={1}
                    px={4}
                />
                <Button
                    leftIcon={<SearchIcon boxSize={6} />}
                    variant="solid"
                    onClick={startSearch}
                    isLoading={!searchState.isLoaded}
                    loadingText="Searching..."
                >
                    Search
                </Button>
            </Flex>
        </Box>
    );
}
