import { Box, ChakraProvider, Container, Flex } from "@open-pioneer/chakra-integration";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { BaseMenu } from "./components/BaseMenu/BaseMenu";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Theme } from "./Theme";
import { Result } from "./views/Result/Result";
import { SearchView } from "./views/Search/Search";
import { SearchState } from "./views/Search/SearchState";
import { StartView } from "./views/Start/Start";
import { FourOFour } from "./views/FourOFour/FourOFour";

const basePath = "/";

const router = createBrowserRouter([
    {
        path: `${basePath}`,
        element: <Layout />,
        children: [
            {
                path: ``,
                element: <StartView />
            },
            {
                path: `search`,
                element: <SearchView />
            },
            {
                path: `result/:id`,
                element: <Result />
            },
            {
                path: "*",
                element: <FourOFour />
            }
        ]
    }
]);

export function AppUI() {
    return <RouterProvider router={router} />;
}

function Layout() {
    return (
        <>
            <ChakraProvider theme={Theme}>
                <BaseMenu />
                <SearchState>
                    <Flex as="header" position="fixed" w="100%" bg="white" zIndex="1000">
                        <Container maxW={{ base: "100%", custombreak: "80%" }}>
                            <Header />
                        </Container>
                    </Flex>
                    <Box as="main" w="100%" pt="152px">
                        <Outlet />       
                    </Box>
                </SearchState>
                <Box as="footer" w="100%">
                    <Footer />
                </Box>
            </ChakraProvider>
        </>
    );
}
