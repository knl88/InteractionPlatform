import { Box, Button, Flex, SystemStyleObject } from "@open-pioneer/chakra-integration";

import { RelatedIdentifier } from "../../../views/Zenodo/Zenodo";
import { isUrl } from "../Metadata/PersonalInfo";

export const RelatedContentEntry = (props: RelatedIdentifier) => {
    const item = props;

    function direct() {
        isUrl(item.identifier) 
            ? window.open(item.identifier, `_blank`) 
            : item.scheme === "doi" 
                ? window.open("https://doi.org/" + item.identifier, `_blank`) 
                : "";
    }

    const hoverStyle: SystemStyleObject = {
        cursor: "pointer",
        backgroundColor: "var(--primary-primary-transparent-background)"
    };

    return (
        <Box className="relatedContentEntry" _hover={hoverStyle} onClick={direct}>
            <Box className="relatedContentTitle">
                {item.relation}
            </Box>
            <Flex className="relatedContentLink" rel="noreferrer">
                <Button className="relatedContentButton">
                    <span className="relatedContentLabel">
                        {item.resource_type ? item.resource_type : "this item"}
                    </span>
                </Button>
            </Flex>
        </Box>
    );
};
