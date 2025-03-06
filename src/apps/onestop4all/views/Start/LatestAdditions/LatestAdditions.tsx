/*import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";

import { Box, Flex, SimpleGrid } from "@open-pioneer/chakra-integration";
import { LatestAddition } from "./LatestAddition";
import { SearchService, ZenodoResultItem } from "../../../services/SearchService";

export const LatestAdditions = () => {
    const searchSrvc = useService("onestop4all.SearchService") as SearchService; 
    //const [aquaResources, setAquaResources] = useState<AquaResources>();
    const [aquaResources, setAquaResources] = useState<ZenodoResultItem[]>();

    useEffect(() => {
        //setLoading(true);
        searchSrvc.getLatestAdditionsFromZenodo().then((result: any) => {
            //console.log("meta: ", result);
            if (result) {
                //console.log(result);
                setAquaResources(result.hits.hits);
                //setResourceType(getResourceType(result.properties.type));
                //setLoading(false);
            } else {
                throw new Error("Unexpected response: " + JSON.stringify(result));
            }
        });
    }, [searchSrvc]);

    const demonstratorEntries = ["Title 1", "Title 2", "Title 3"];

    if (demonstratorEntries.length > 2) {
        return (
            <Box className="how-to">
                <Box className="text-centered-box">
                    <Box className="text-centered-box-header">
                        Take a look at our latest additions
                    </Box>
                    <Box className="text-centered-box-text">
                        The resources listed below were produced in the context of the AquaINFRA
                        project.
                    </Box>
                </Box>
                <SimpleGrid columns={[1, 2, 3]} spacing={10} padding={"0px 100px"} marginTop={"1%"}>
                    {aquaResources?.map((aquaResource, index) => (
                        <Flex key={index}>
                            <LatestAddition aquaResource={aquaResource} key={index} />
                        </Flex>
                    ))}
                </SimpleGrid>
            </Box>
        );
    } else {
        return null;
    }
};
*/