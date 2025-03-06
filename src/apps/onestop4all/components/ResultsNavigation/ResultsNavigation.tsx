import { Box, Flex, SystemStyleObject } from "@open-pioneer/chakra-integration";

import {
    ResultsNavigationLeft,
    ResultsNavigationLeftLeft,
    ResultsNavigationRight,
    ResultsNavigationRightRight
} from "../Icons";

export interface ResultsNavigationProps {
    result: number;
    of: number;
    label_result: string;
    label_of: string;
    stepBack?: () => void;
    stepToStart?: () => void;
    stepFoward?: () => void;
    stepToEnd?: () => void;
}

export const ResultsNavigation = (props: ResultsNavigationProps) => {
    const { result, of, label_result, label_of, stepBack, stepFoward, stepToEnd, stepToStart } =
        props;

    const canStepBack = result > 1;
    const canStepForward = result < of;

    const navigationHoverStyle: SystemStyleObject = {
        cursor: "pointer"
    };

    return (
        <Flex alignItems="center">
            <Box
                _hover={canStepBack ? navigationHoverStyle : {}}
                onClick={() => {
                    canStepBack && stepToStart && stepToStart();
                }}
                opacity={canStepBack ? "1" : "0.3"}
            >
                <ResultsNavigationLeftLeft />
            </Box>

            <Box className="resultsNavigationLine seperator" mr="16px" />

            <Box
                _hover={canStepBack ? navigationHoverStyle : {}}
                onClick={() => {
                    canStepBack && stepBack && stepBack();
                }}
                opacity={canStepBack ? "1" : "0.3"}
            >
                <ResultsNavigationLeft />
            </Box>

            <Box className="resultsNavigationLine seperator" mr="16px" />

            <Box className="resultsNavigationText">
                {label_result} <span className="resultHit">{result}</span> {label_of}{" "}
                <span className="resultHit">{of}</span>
            </Box>

            <Box className="resultsNavigationLine seperator" ml="16px" />

            <Box
                _hover={canStepForward ? navigationHoverStyle : {}}
                onClick={() => {
                    canStepForward && stepFoward && stepFoward();
                }}
                opacity={canStepForward ? "1" : "0.3"}
            >
                <ResultsNavigationRight />
            </Box>

            <Box className="resultsNavigationLine seperator" ml="16px" />

            <Box
                _hover={canStepForward ? navigationHoverStyle : {}}
                onClick={() => {
                    canStepForward && stepToEnd && stepToEnd();
                }}
                opacity={canStepForward ? "1" : "0.3"}
            >
                <ResultsNavigationRightRight />
            </Box>
        </Flex>
    );
};
