import { Box, SimpleGrid } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";

import { DemonstratorEntry } from "./DemonstratorEntry";
import { SearchService } from "../../../services";
import { useEffect, useState } from "react";
import { ZenodoMetadataResponse } from "../../Zenodo/Zenodo";

export const DemonstratorEntries = () => {
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;
    const [demonstrators, setDemonstrators] = useState<ZenodoMetadataResponse[]>([]);

    useEffect(() => {
        searchSrvc.getDataToKnowledgePackages().then((result: any) => {
            if (result) {
                setDemonstrators(result.hits.hits);
            } else {
                console.error("Unexpected response:", result);
            }
        });
    }, [searchSrvc]);

    return (
        <Box className="how-to">
            <Box className="text-centered-box" marginBottom={{ base: "5%", custombreak: "0%" }}>
                <Box className="text-centered-box-header">
                    Browse through our ready-to-use demonstrators
                </Box>
            </Box>
            <SimpleGrid
                columns={[1, 2, 3]}
                spacing={5}
                marginTop={"1%"}
            >
                {demonstrators.map((demonstrator: any, index: number) => (
                    <DemonstratorEntry
                        key={index}
                        title={demonstrator.metadata.title || "Untitled"}
                        id={demonstrator.doi}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
};
