import { Box, Button, Flex, Skeleton, Stack } from "@open-pioneer/chakra-integration";
import { useSearchState } from "../../SearchState";
import { useState } from "react";
import { FilterCheckbox } from "./FilterCheckbox";
import { Questionmark } from "../../../../components/Questionmark";

interface SearchTermItem {
    value?: string;
    type?: string;
}

export const RelatedKeywords = (props: {
    list: Array<SearchTermItem>;
    tag: string;
    element: string;
    type?: string;
    loading: boolean;
}) => {
    const { list, tag, element, loading } = props;

    const searchState = useSearchState();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [filterCategories, setFilterCategories] = useState<string[]>([
        "originalMatch",
        "narrower",
        "broader",
        "related"
    ]);

    const itemBorder = (item: SearchTermItem) => {
        if (item.value && selectedItems.includes(item.value)) {
            return "2px solid black";
        } else return "2px solid white";
    };

    function getClassName(item: SearchTermItem) {
        if (item.type != null) {
            switch (item.type) {
                case "originalMatch":
                    return "";
                case "narrower":
                    return "metadataKeywordNarrower";
                case "broader":
                    return "metadataKeywordBroader";
                case "related":
                    return "metadataKeywordRelated";
            }
        } else return element == "keyword" ? "metadataKeyword" : "metadataTheme";
    }

    const shortList: Array<SearchTermItem> = [];

    // let originalIndex = 0;
    // let narrowerIndex = 0;
    let broaderIndex = 0;
    let relatedIndex = 0;

    list.map((item: SearchTermItem) => {
        if (item.type == "originalMatch") {
            shortList.push(item);
        }
        if (item.type == "narrower") {
            shortList.push(item);
        }
        if (item.type == "broader") {
            broaderIndex++;
            if (broaderIndex < 6) shortList.push(item);
        }
        if (item.type == "related") {
            relatedIndex++;
            if (relatedIndex < 6) shortList.push(item);
        }
    });

    const combineSearchTerms = (searchTermList: string[]) => {
        let searchTermsCombined = searchState.searchTerm;
        if (searchTermList.length > 0) {
            searchTermsCombined += ", " + searchTermList.join(", ");
        }
        return searchTermsCombined;
    };

    const updateFilter = (isChecked: boolean, type: string) => {
        if (isChecked && !filterCategories.includes(type)) {
            const tmp = filterCategories.slice();
            tmp.push(type);
            setFilterCategories(tmp);
        } else {
            if (filterCategories.includes(type)) {
                setFilterCategories(filterCategories.filter((item) => item != type));
            }
        }
    };

    const updateSelectedItems = (itemValue: string) => {
        let tmp = selectedItems.slice();
        if (itemValue) {
            if (tmp.includes(itemValue)) {
                tmp = tmp.filter((i) => itemValue != i);
            } else {
                tmp.push(itemValue);
            }
        }
        setSelectedItems(tmp);
    };

    return (
        <Box>
            <span className="relatedTermsTitle">{tag}:</span>
            <Questionmark
                label="Search for terms that are related to your previous search"
                size="sm"
            />
            <Flex align="center">
                <Stack spacing={1} direction="row" wrap="wrap" marginY={3}>
                    <FilterCheckbox
                        label="Original Match"
                        background="rgba(34, 192, 210, 0.2)"
                        filterType="originalMatch"
                        updateFilter={updateFilter}
                    />
                    <FilterCheckbox
                        label="Narrower"
                        background="rgb(255, 222, 173)"
                        filterType="narrower"
                        updateFilter={updateFilter}
                    />
                    <FilterCheckbox
                        label="Broader"
                        background="rgb(230, 230, 250)"
                        filterType="broader"
                        updateFilter={updateFilter}
                    />
                    <FilterCheckbox
                        label="Related"
                        background="rgb(210, 180, 140)"
                        filterType="related"
                        updateFilter={updateFilter}
                    />
                </Stack>
            </Flex>
            <Box maxH={"200px"} overflow={"scroll"} className="custom-scrollbar">
                {loading ? (
                    <Stack pt={3}>
                        <Skeleton height='20px' />
                        <div>Loading related terms...</div>
                        <Skeleton height='20px' />
                    </Stack>
                ) : shortList
                    .filter((item) => {
                        return item.type && filterCategories.includes(item.type);
                    })
                    .map((item: SearchTermItem, j: number) => (
                        <Box
                            className={"metadataKeyword " + getClassName(item)}
                            style={{ border: itemBorder(item) }}
                            key={j}
                            onClick={() => {
                                if (item.value !== undefined) {
                                    updateSelectedItems(item.value);
                                }
                            }}
                            _hover={{ cursor: "pointer" }}
                        >
                            {item.value}
                        </Box>
                    ))}
            </Box>
            <Flex paddingTop="3" width="100%" justifyContent="center">
                <Button
                    className="searchSelectedTerms"
                    onClick={() => {
                        if (selectedItems.length != 0)
                            searchState.setSearchTerm(combineSearchTerms(selectedItems));
                    }}
                    isActive={selectedItems.length == 0}
                >
                    Search for selected terms
                </Button>
            </Flex>
            <div className="seperator" style={{ marginTop: "10px" }}></div>
        </Box>
    );
};
