import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    HStack,
    IconButton,
    Link,
    Spacer,
    useDisclosure
} from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { ReactNode, useEffect } from "react";

import { MenuCloseIcon } from "../Icons";
import { MenuHandler } from "../../services";

export function BaseMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const menuHandler = useService("onestop4all.MenuHandler") as MenuHandler;

    useEffect(() => {
        const openMenuListener = menuHandler.on("open-menu", onOpen);
        return () => openMenuListener.destroy();
    }, [menuHandler, onOpen]);

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size={{ base: "customMenu", custombreak: "xs" }}
        >
            <DrawerOverlay bg="var(--chakra-colors-blackAlpha-200)" />
            <DrawerContent className="navigation-menu">
                <HStack padding={{ base: "22px 22px 10px 0px", custombreak: "32px 52px 20px" }}>
                    <Spacer />
                    <IconButton
                        aria-label="Close menu"
                        variant="ghost"
                        colorScheme="teal"
                        icon={<MenuCloseIcon boxSize={8} />}
                        onClick={onClose}
                    />
                </HStack>

                <Box className="separator" />

                {createBlock(
                    "Get connected",
                    <>
                        <MenuLink href="https://aquainfra.eu/about">About us</MenuLink>
                        <MenuLink href="https://aquainfra.eu/partners">Partners</MenuLink>
                        <MenuLink href="https://aquainfra.eu/contact">Contact</MenuLink>
                    </>
                )}

                <Box className="separator" />

                {createBlock(
                    "AquaINFRA Platform",
                    <>
                        <MenuLink href="https://aquainfra.dev.52north.org/search">
                            Search for research data
                        </MenuLink>
                        <MenuLink href="https://aqua.usegalaxy.eu/">AquaINFRA&#39;s Galaxy</MenuLink>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}

function createBlock(header: string, children: ReactNode): ReactNode {
    return (
        <Box className="block" padding={{ base: "30px 20px 10px 20px", custombreak: "10px 10px 0px" }}>
            <Box
                className="block-header"
                fontSize={{ base: "20px", custombreak: "30px" }}
                padding={{ base: "10px 20px 10px 0px", custombreak: "30px 0px" }}
            >
                {header}
            </Box>
            <Box className="block-content">{children}</Box>
        </Box>
    );
}

function MenuLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <Link href={href} target="_blank" rel="noreferrer">
            {children}
        </Link>
    );
}
