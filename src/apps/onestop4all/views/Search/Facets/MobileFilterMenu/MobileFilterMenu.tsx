import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    HStack,
    IconButton,
    Spacer,
    useDisclosure
} from "@open-pioneer/chakra-integration";
import { ClassAttributes, useEffect } from "react";

import { MenuCloseIcon } from "../../../../components/Icons";
import { SpatialCoverageFacet } from "../SpatialCoverageFacet/SpatialCoverageFacet";
import { DataProviderFacet } from "../DataProviderFacet/DataProviderFacet";
import { DownloadOptionFacet } from "../DownloadOptionFacet/DownloadOptionFacet";

export interface MobileFilterMenuProps {
    openMenu: boolean;
    menuClosed: () => void;
}

export function MobileFilterMenu(props: MobileFilterMenuProps & ClassAttributes<HTMLDivElement>) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { openMenu } = props;

    function closeMenu(): void {
        props.menuClosed();
        onClose();
    }

    useEffect(() => {
        if (openMenu) {
            onOpen();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openMenu]);

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={() => closeMenu()}
            size={{ base: "customMenu", custombreak: "md" }}
            blockScrollOnMount={false}
        >
            <DrawerOverlay bg={"var(--chakra-colors-blackAlpha-200)"} />
            <DrawerContent className="navigation-menu">
                <HStack padding={{ base: "52px 52px 0px", custombreak: "52px 52px 100px" }}>
                    <Spacer></Spacer>
                    <IconButton
                        aria-label="Search database"
                        variant="ghost"
                        colorScheme="teal"
                        icon={<MenuCloseIcon boxSize={8} />}
                        onClick={() => closeMenu()}
                    />
                </HStack>
                <Box padding="0px 16px" overflow="auto">
                    <Box padding={"64px 0px 32px"}>
                        <DataProviderFacet />
                    </Box>
                    <DownloadOptionFacet />
                    <Box padding={"32px 0px"}>
                        <SpatialCoverageFacet mapId="spatial-filter-mobile-map" />
                    </Box>
                </Box>
            </DrawerContent>
        </Drawer>
    );
}
