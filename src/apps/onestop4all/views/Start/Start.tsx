import { Box, Container, Flex } from "@open-pioneer/chakra-integration";
import { SearchBar } from "../../components/SearchBar";
import { Videos } from "./Videos/Videos";
import { useEffect } from "react";
import { useService } from "open-pioneer:react-hooks";
import { SearchService } from "../../services";
import { useSearchState } from "../Search/SearchState";
import { fetchAndStoreDkps } from "../../services/DkpUtils";

export function StartView() {

    const searchSrvc = useService("onestop4all.SearchService") as SearchService;
    const searchState = useSearchState();

    useEffect(() => {
        fetchAndStoreDkps(searchSrvc, searchState);
    }, [searchSrvc]);

    return (
        <Box className="start-view">
            <Box position="relative">
                <Box className="header-image" />
                <Box w="100%" position="absolute" top="-20">
                    <Container maxW={{ base: "100%", custombreak: "80%" }}>
                        <Flex
                            pt={{ base: "90px", custombreak: "60px" }}
                            textAlign="center"
                            justifyContent="flex-end"
                        >
                            <Box
                                maxW={{ base: "90%", custombreak: "50%" }}
                                fontSize={{ base: "18px", custombreak: "24px" }}
                                color="gray.600"
                            >
                                <b>
                                    The central gateway for scientific communities to find, access, and reuse aquatic digital resources.
                                </b>
                            </Box>
                        </Flex>
                    </Container>
                </Box>
            </Box>

            <Box position="absolute" w="100%" mt="-40px">
                <Container maxW={{ base: "100%", custombreak: "80%" }}>
                    <SearchBar />
                </Container>
            </Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Box h="80px" />
                <Videos />
            </Container>
        </Box>
    );
}
