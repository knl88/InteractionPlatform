import { FormControl, FormLabel } from "@open-pioneer/chakra-integration";
import { Switch } from "@chakra-ui/react";
import { useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";

export function DownloadOptionFacet() {
    const searchState = useSearchState();

    const handleSwitcherChange = () => {
        searchState.setDownloadOption(!searchState.downloadOption);
    };

    return (
        <FacetBase title="Download links" expanded>
            <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='download-links' mb='0' style={{color: "#05668D", fontFamily: "Arial" , fontSize: "16px", fontWeight: "700"}}>
                    Show only entries that have a download link?
                </FormLabel>
                <Switch id='download-links' onChange={handleSwitcherChange} isChecked={searchState.downloadOption ? true : false} />
            </FormControl>
        </FacetBase>
    );
}
