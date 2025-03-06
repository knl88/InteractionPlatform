import { Box } from "@open-pioneer/chakra-integration";
import { useEffect, useState } from "react";

import { ResultsNavigation } from "../../../components/ResultsNavigation/ResultsNavigation";
import { useSearchState } from "../SearchState";

export function ResultPaging() {
    const [page, setPage] = useState<number>();
    const [pageCount, setPageCount] = useState<number>();
    const searchState = useSearchState();

    useEffect(() => {
        if (searchState.searchResults) {
            setPage(searchState.pageStart + 1);
            const pages = Math.ceil(searchState.searchResults.count / searchState.pageSize);
            setPageCount(pages);
        }
    }, [searchState.pageSize, searchState.pageStart, searchState.searchResults]);

    function stepBack(): void {
        if (page) {
            searchState.setPageStart(page - 2);
        }
    }

    function stepForward(): void {
        if (page) {
            searchState.setPageStart(page);
        }
    }

    function stepToEnd(): void {
        if (pageCount) {
            searchState.setPageStart(pageCount - 1);
        }
    }

    function stepToStart(): void {
        searchState.setPageStart(0);
    }

    function renderPaging(): import("react").ReactNode {
        if (page !== undefined && pageCount !== undefined) {
            return (
                <ResultsNavigation
                    result={page}
                    of={pageCount}
                    label_result="Page"
                    label_of="of"
                    stepBack={stepBack}
                    stepFoward={stepForward}
                    stepToEnd={stepToEnd}
                    stepToStart={stepToStart}
                />
            );
        } else {
            return <></>;
        }
    }

    return <Box>{renderPaging()}</Box>;
}
