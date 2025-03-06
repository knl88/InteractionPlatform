/*import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authors } from "../../../components/ResourceType/Metadata/Authors";
import { ResourceIcon } from "../ResourceEntry/ResourceIcons";
import { Flex } from "@open-pioneer/chakra-integration";
import { ZenodoResultItem } from "../../../services/SearchService";

export const LatestAddition = (props: { aquaResource: ZenodoResultItem }) => {
    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate();

    const aquaResource = props.aquaResource;

    const handleClick = (recid: string) => {
        navigate(`/result/zenodo:${recid}`);
        window.scroll(0, 0);
    };

    const stripHtmlTags = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    return (
        <div style={{ width: "100%" }}>
            <Box
                className={`how-to-entry ${hovered ? "hover" : "default"}`}
                onMouseLeave={() => setHovered(false)}
                onMouseEnter={() => setHovered(true)}
                onClick={() => {
                    handleClick(aquaResource.recid);
                }}
            >
                <Box>
                    <Flex gap={1} className="latestAdditionHeader">
                        <ResourceIcon
                            type={aquaResource.metadata.resource_type.type}
                            size={24}
                            color={"#05668D"}
                        />
                        <Box>{aquaResource.metadata.resource_type.type.toUpperCase()}</Box>
                    </Flex>
                    <Box className="frame">
                        <div className="seperator"></div>
                        <Box className="heading">{aquaResource.title}</Box>
                        <Box
                            className="abstract"
                            dangerouslySetInnerHTML={{
                                __html: stripHtmlTags(aquaResource.metadata.description)
                            }}
                        ></Box>
                        <div className="seperator"></div>
                        <Authors authors={aquaResource.metadata.creators} />
                    </Box>
                </Box>
            </Box>
        </div>
    );
};
*/