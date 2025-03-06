import { Box, Flex } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "../Icons";

export function BackToSearchLink({ visible }: { visible: boolean }) {
    const navigate = useNavigate();

    return (
        <Flex
            fontSize="14px"
            textTransform="uppercase"
            letterSpacing="0.6px"
            alignItems="center"
            gap="12px"
            onClick={() => navigate({ pathname: "/search" })}
            _hover={{ cursor: "pointer" }}
            display={visible ? "flex" : "none"}
        >
            <BackIcon />
            <Box display="flex" alignItems="center">
                <Box fontWeight="700" color="var(--primary-primary-main)" marginRight="4px">
                    Back
                </Box>
                <Box whiteSpace="nowrap">to result list</Box>
            </Box>
        </Flex>
    );
}
