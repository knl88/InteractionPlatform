import { Box, Text, Link } from "@open-pioneer/chakra-integration";
import { FC } from "react";

export const Feedback: FC<{ fontSize: string }> = ({ fontSize }) => {
    return (
        <Box w="100%" textAlign="center">
            <Text fontSize={fontSize}>
                This platform is a beta version. Do you have feedback? Tell us{" "}
                <Link
                    href="https://docs.google.com/document/d/1GPDQSZjHOXkzKJW1q3k4GshlPcFaK4t5OpvWzXnUdpg/edit?usp=sharing"
                    isExternal
                    textDecoration="underline"
                    aria-label="Provide feedback on Google Docs"
                >
                    here!
                </Link>
            </Text>
        </Box>
    );
};
