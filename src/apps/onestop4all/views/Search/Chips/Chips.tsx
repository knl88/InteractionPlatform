import { Box, Flex } from "@chakra-ui/react";
import { SystemStyleObject } from "@open-pioneer/chakra-integration";

import { PrimaryColor, PrimaryColor40, PrimaryFont } from "../../../Theme";
import { useSearchState } from "../SearchState";

interface ChipsEntry {
    title: string;
    values: string[];
    deleteCb: () => void;
}

export function Chips() {
    const searchState = useSearchState();
    const chips: ChipsEntry[] = [];

    const st = searchState.searchTerm;
    if (st) {
        chips.push({
            title: "Search term",
            values: [st],
            deleteCb: () => searchState.setSearchTerm("")
        });
    }

    const dataProvider = searchState.selectedDataProvider;
    if (dataProvider.length) {
        const titles = [] as string[];

        dataProvider.forEach((dp) => {
            searchState.dataProviderTitles.forEach((dpt: any) => {
                if (dp === dpt.id) {
                    titles.push(dpt.title);
                }
            });
        });
        chips.push({
            title: "Data provider",
            values: titles,
            deleteCb: () => searchState.setSelectedDataProvider([])
        });
    }

    const spatialFilter = searchState.spatialFilter;
    if (spatialFilter.length) {
        chips.push({
            title: "Spatial Coverage",
            values: spatialFilter.map((e) => `${e.toFixed(4)}`),
            deleteCb: () => searchState.setSpatialFilter([])
        });
    }

    const titleStyles = {
        color: PrimaryColor,
        fontFamily: PrimaryFont,
        fontSize: "14px",
        fontWeight: 700,
        lineHeight: "24px"
    };

    const labelStyles = {
        ...titleStyles,
        fontWeight: 400
    };

    const hoverDeleteStyle: SystemStyleObject = {
        cursor: "pointer",
        borderRadius: "50%",
        bgColor: PrimaryColor40
    };

    function createChip(
        title: string,
        values: string[],
        deletionCb: () => void
    ): import("react").ReactNode {
        return (
            <Flex
                gap={"8px"}
                border={"1px solid"}
                borderColor={PrimaryColor}
                borderRadius="30px"
                padding="6px 8px 6px 12px;"
            >
                <Box __css={titleStyles}>{title}: </Box>
                <Box __css={labelStyles}>{values.join(", ")}</Box>
                <Box onClick={deletionCb} _hover={hoverDeleteStyle}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.87689 16.1164L12 12.9933L15.1231 16.1164C15.2545 16.2478 15.4217 16.3125 15.6198 16.3125C15.8178 16.3125 15.9851 16.2478 16.1164 16.1164C16.2478 15.9851 16.3125 15.8178 16.3125 15.6198C16.3125 15.4217 16.2478 15.2545 16.1164 15.1231L12.9933 12L16.1164 8.87689C16.2478 8.74552 16.3125 8.57825 16.3125 8.38023C16.3125 8.1822 16.2478 8.01493 16.1164 7.88356C15.9851 7.75219 15.8178 7.6875 15.6198 7.6875C15.4217 7.6875 15.2545 7.75219 15.1231 7.88356L12 11.0067L8.87689 7.88356C8.74552 7.75219 8.57825 7.6875 8.38023 7.6875C8.1822 7.6875 8.01493 7.75219 7.88356 7.88356C7.75219 8.01493 7.6875 8.1822 7.6875 8.38023C7.6875 8.57825 7.75219 8.74552 7.88356 8.87689L11.0067 12L7.88356 15.1231C7.75219 15.2545 7.6875 15.4217 7.6875 15.6198C7.6875 15.8178 7.75219 15.9851 7.88356 16.1164C8.01493 16.2478 8.1822 16.3125 8.38023 16.3125C8.57825 16.3125 8.74552 16.2478 8.87689 16.1164Z"
                            fill="#05668D"
                            stroke="#05668D"
                            strokeWidth="0.125"
                        />
                        <rect
                            x="2.625"
                            y="2.625"
                            width="18.75"
                            height="18.75"
                            rx="9.375"
                            stroke="#05668D"
                            strokeWidth="1.25"
                        />
                    </svg>
                </Box>
            </Flex>
        );
    }

    return (
        <Flex gap={"10px"} flexWrap="wrap">
            {chips.map((c, i) => {
                return <Box key={i}>{createChip(c.title, c.values, c.deleteCb)}</Box>;
            })}
        </Flex>
    );
}
