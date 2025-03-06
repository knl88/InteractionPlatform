import { Box, HStack, RadioGroup, Spinner } from "@open-pioneer/chakra-integration";
import { Radio } from "@open-pioneer/chakra-integration";
import { Stack } from "@open-pioneer/chakra-integration";

interface CatchmentOptionsProps {
    onChange: (value: string) => void;
    selectedOption: string;
    loading: boolean;
}

export function CatchmentOptions(props: CatchmentOptionsProps) {
    const { onChange, selectedOption, loading } = props;

    return (
        <RadioGroup 
            defaultValue={selectedOption} 
            onChange={(value) => onChange(value)} 
            marginY={"1%"}
        >
            <Stack spacing={5} direction="row">
                <Radio value="full"><b>Full catchment</b></Radio>
                <Radio value="upstream"><b>Upstream catchment</b></Radio>
            </Stack>
            <Box pt={1}>
                <HStack>
                    <Box>
                        {selectedOption === "full" 
                            ? "Select a polygon and click on 'Apply Bounding Box'. Press 'shift' to select multiple polygons." 
                            : "Set a point on the map and click on 'Compute Catchment', then on 'Apply Bounding Box'."}
                    </Box>
                    {loading && <HStack>
                        <b>Loading...</b>
                        <Spinner size="sm" />
                    </HStack>}
                </HStack>
            </Box>
        </RadioGroup>
    );
}
