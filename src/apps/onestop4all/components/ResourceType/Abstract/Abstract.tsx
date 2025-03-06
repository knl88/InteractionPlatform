import { Box } from "@open-pioneer/chakra-integration";
import { LinkItUrl } from "react-linkify-it";

export const Abstract = (props: { abstractText: string }) => {
    const { abstractText } = props;
    return (
        <Box>
            <div className="abstractSectionHeader">Abstract</div>
            <LinkItUrl>
                <Box className="abstractText" dangerouslySetInnerHTML={{__html: abstractText}} />
            </LinkItUrl>
        </Box>
    );
};
