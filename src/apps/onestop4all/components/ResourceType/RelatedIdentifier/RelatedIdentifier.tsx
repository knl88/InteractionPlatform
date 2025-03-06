/* eslint-disable */
import { Box, Flex, Divider } from "@open-pioneer/chakra-integration";
import { SimpleGrid } from "@chakra-ui/react";

import { RelatedContentEntry } from "./RelatedIdentifierEntry";
import { RelatedIdentifier } from "../../../views/Zenodo/Zenodo";

export const RelatedContent = (props: { relatedContentItems: RelatedIdentifier[] }) => {
    const relatedContentItemsList = Object.values(props.relatedContentItems);

    return (
        <Box className="relatedContentSection">
            <Flex alignItems="center" gap="40px" display="flex">
                <Box className="relatedContentSectionHeader">
                    Related content
                </Box>
            </Flex>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={10} width={"100%"}>
                {relatedContentItemsList.map((e, i) =>
                    e.resource_type || e.relation || e.identifier ? (
                        <Flex key={i}>
                            <Divider className="relatedContentLine" orientation="vertical" />
                            <RelatedContentEntry {...e} />
                        </Flex>
                    ) : null
                )}
            </SimpleGrid>
        </Box>
    );
};
