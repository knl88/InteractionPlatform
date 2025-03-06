import { useEffect, useState } from "react";
import { useService } from "open-pioneer:react-hooks";
import { RelatedKeywords } from "./RelatedKeywords";
import { useSearchState } from "../../SearchState";
import { UpIcon, DownIcon } from "../../../../components/Icons";
import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    Box,
    Flex
} from "@open-pioneer/chakra-integration";
import { SearchService } from "../../../../services";

export const RelatedTerms = () => {
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;
    const [myJson, setMyJson] = useState<Array<object>>([]);
    const searchState = useSearchState();
    const [expanded, setExpanded] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (searchState.relatedTerms && searchState.searchTerm === searchState.relatedTermsKeyword) {
            setLoading(false);
            setMyJson(searchState.relatedTerms);
        } else {
            searchSrvc.getRelatedSearchterms(searchState.searchTerm).then((res: any) => {
                const json: JSON = JSON.parse(res);
                const tmpJson: Array<object> = [];
                Object.entries(json).forEach((entry) => {
                    const [key, object] = entry;
                    tmpJson.push({
                        type: object.type,
                        value: object.value 
                    });
                });
                setLoading(false);
                setMyJson(tmpJson);
                searchState.setRelatedTerms(tmpJson);
                searchState.setRelatedTermsKeyword(searchState.searchTerm);
            });
        }
    }, [searchState.searchTerm]);

    return (
        <Box className="relatedTermsBox">
            <Accordion allowMultiple defaultIndex={expanded ? [0] : [1]}>
                <AccordionItem borderTopWidth={0} borderBottomWidth={0}>
                    <AccordionPanel px={0} pt={0}>
                        <RelatedKeywords
                            list={myJson}
                            tag="Related terms"
                            element="keyword"
                            loading={loading}
                        />
                    </AccordionPanel>
    
                    <AccordionButton justifyContent="center" onClick={() => setExpanded(!expanded)} mb="2%">
                        <Flex alignItems="center" direction="column" gap="4px" mx="40%">
                            {expanded ? (
                                <>
                                    <Box>
                                        <UpIcon />
                                    </Box>
                                    <Box className="metadataShowHide">Hide related terms</Box>
                                </>
                            ) : (
                                <>
                                    <Box className="metadataShowHide">Show related terms</Box>
                                    <Box>
                                        <DownIcon />
                                    </Box>
                                </>
                            )}
                        </Flex>
                    </AccordionButton>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};
