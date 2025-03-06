import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    SystemStyleObject
} from "@open-pioneer/chakra-integration";
import { CSSProperties, PropsWithChildren } from "react";

import { DropdownArrowIcon } from "../../../../components/Icons";

export interface FacetBaseProps {
    title: string | React.ReactNode;
    expanded?: boolean;
}

export function FacetBase(props: PropsWithChildren<FacetBaseProps>) {
    const { title, children, expanded } = props;

    const labelStyles: CSSProperties = {
        paddingInline: 0,
        flex: 1,
        textAlign: "left",
        fontFamily: "Arial",
        fontSize: "14px",
        fontWeight: 700,
        letterSpacing: "0.6px",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        opacity: 0.5
    };

    function getIconStyles(expanded: boolean): SystemStyleObject {
        return {
            transform: expanded ? "rotate(-180deg)" : undefined,
            transition: "transform 0.2s",
            transformOrigin: "center"
        };
    }

    return (
        <Accordion allowMultiple defaultIndex={expanded ? [0] : []}>
            <AccordionItem border="0px">
                {({ isExpanded }) => (
                    <>
                        <AccordionButton
                            _hover={{ bg: "white" }}
                            gap="8px"
                            position="relative"
                            padding="0"
                        >
                            <Box style={labelStyles}>{title}</Box>
                            <Box className="seperator"></Box>
                            <DropdownArrowIcon
                                position="absolute"
                                right="12px"
                                bg="white"
                                padding="0 6px"
                                boxSize="7"
                                __css={getIconStyles(isExpanded)}
                            ></DropdownArrowIcon>
                        </AccordionButton>
                        <AccordionPanel padding="0">
                            <Box padding="8px 0">{children}</Box>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
}
