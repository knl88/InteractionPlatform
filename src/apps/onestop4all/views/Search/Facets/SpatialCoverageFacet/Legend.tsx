import { Box } from "@open-pioneer/chakra-integration";
import { Flex } from "@open-pioneer/chakra-integration";

export function Legend() {
    return (
        <Box className="legend-box">
            <p className="legend-header"> Legend </p>
            <Flex direction={"column"} gap={"1vh"}>
                <Flex className="legend-entry">
                    <Flex marginTop={"-0.3vh"} width="5vh">
                        <img src="/area.svg" alt="Catchment area" />
                    </Flex>
                    Catchment area
                </Flex>
                <Flex className="legend-entry">
                    <Flex marginTop={"-0.3vh"} width="5vh">
                        <img src="/areaSelected.svg" alt="Selected area" />
                    </Flex>
                    Selected area
                </Flex>
                <Flex className="legend-entry">
                    <Flex marginTop={"-0.3vh"} width="5vh">
                        <img src="/bbox.svg" alt="Bounding box" />
                    </Flex>
                    Bounding box
                </Flex>
            </Flex>
        </Box>
    );
}
