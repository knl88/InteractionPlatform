import { numberInputAnatomy } from "@chakra-ui/anatomy";
import {
    createMultiStyleConfigHelpers,
    defineStyleConfig,
    extendTheme
} from "@open-pioneer/chakra-integration";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    numberInputAnatomy.keys
);

export const PrimaryColor = "#05668D";
export const PrimaryColor40 = "#05668D40";
export const PrimaryFont = "Arial";

export const ActiveControlColor = "#22C0D2";

export const BorderColor = "#CCCCCC";

export const Theme = extendTheme({
    breakpoints: {
        custombreak: "1000px"
    },
    components: {
        Button: defineStyleConfig({
            baseStyle: {
                borderRadius: "0px"
            },
            variants: {
                solid: {
                    bg: PrimaryColor,
                    color: "white",
                    textTransform: "uppercase",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                    _hover: {
                        bg: PrimaryColor
                    }
                }
            }
        }),
        Link: defineStyleConfig({
            baseStyle: {
                color: PrimaryColor,
                fontWeight: 700
            }
        }),
        Drawer: defineStyleConfig({
            sizes: {
                customMenu: {
                    dialog: { maxWidth: "360px" }
                }
            }
        }),
        NumberInput: defineMultiStyleConfig({
            variants: {
                custom: definePartsStyle({
                    field: {
                        border: "2px solid",
                        borderRadius: 0,
                        borderColor: ActiveControlColor,
                        color: ActiveControlColor,
                        fontWeight: "bold"
                    },
                    stepper: {
                        border: 0,
                        borderColor: "purple.200"
                    }
                })
            }
        })
    }
});
