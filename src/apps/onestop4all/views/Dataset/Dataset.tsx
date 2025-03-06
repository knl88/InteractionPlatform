import { Box, Flex } from "@open-pioneer/chakra-integration";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem } from "../../services/SearchService";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ExternalResources } from "../../components/ResourceType/ExternalResources/ExternalResources";
import { Map } from "../../components/ResourceType/Map/Map";
import { DkpResources } from "../../components/ResourceType/ExternalResources/DkpResources";

export interface LinkObject {
    href: string;
    title: string;
    description: string;
    protocol: string;
    type: string;
}

export interface ResourceGeometry {
    type: string;
    coordinates: number[][];
}

export interface Properties {
    title: string;
    type: string;
    aicollection: string;
    description: string;
    created: string;
    keywords: string;
    language: string;
    rights: string;
    formats: string;
}

export interface DatasetMetadataResponse extends SolrSearchResultItem {
    properties: Properties;
    geometry: ResourceGeometry;
    id: string;
    time: string;
    type: string;
    links: LinkObject[];
    dkps?: any[];
}

export interface DatasetViewProps {
    item: DatasetMetadataResponse;
}

export function DatasetView(props: DatasetViewProps) {
    const metadata = props.item;
    
    return (
        <Box>
            {/* Desktop view */}
            <Flex gap="10%" hideBelow="custombreak">
                <Box w="65%">
                    {metadata.properties.title ? (
                        <Box className="title" pt="15px">
                            {metadata.properties.title}
                        </Box>
                    ) : null}
                    <Box pt="30px">{getMetadata()}</Box>
                    {metadata.properties.description ? (
                        <Box pt="80px">
                            <Abstract abstractText={metadata.properties.description} />
                        </Box>
                    ) : null}
                    {metadata.geometry ? (
                        <Box pt="80px">
                            <Map geometry={metadata.geometry} mapId="desktop" />
                        </Box>
                    ) : null}
                </Box>
                <Box w="25%">
                    {metadata.dkps ? (
                        <Box pt="8px">
                            <DkpResources dkps={metadata.dkps} />
                        </Box>
                    ) : null}
                    {metadata.links ? (
                        <Box pt="8px">
                            <ExternalResources links={metadata.links} />
                        </Box>
                    ) : null}
                </Box>
            </Flex>
            {/* Mobile view */}
            <Box hideFrom="custombreak">
                {metadata.properties.title ? (
                    <Box className="title" pt="15px">
                        {metadata.properties.title}
                    </Box>
                ) : null}
                <Box pt="30px">{getMetadata()}</Box>
                {metadata.properties.description ? (
                    <Box pt="40px">
                        <Abstract abstractText={metadata.properties.description} />
                    </Box>
                ) : null}
                {metadata.geometry ? (
                    <Box pt="40px">
                        <Map geometry={metadata.geometry} mapId="mobile" />
                    </Box>
                ) : null}
                {metadata.description ? (
                    <Box pt="40px">
                        <Abstract abstractText={metadata.description} />
                    </Box>
                ) : null}
                {metadata.dkps ? (
                    <Box pt="8px">
                        <DkpResources dkps={metadata.dkps} />
                    </Box>
                ) : null}
                {metadata.links ? (
                    <Box pt="40px">
                        <ExternalResources links={metadata.links} />
                    </Box>
                ) : null}
            </Box>
        </Box>
    );

    function getMetadata() {
        return (
            <Metadata
                metadataElements={[
                    {
                        element: "provider",
                        tag: "Provider",
                        val: metadata.provider
                    },
                    {
                        element: "keyword",
                        tag: metadata.properties.keywords?.length > 1 ? "Keywords" : "Keyword",
                        val: metadata.properties.keywords
                    },
                    {
                        element: "language",
                        tag: metadata.properties.language?.length > 1 ? "Languages" : "Language",
                        val: metadata.properties.language
                    },
                    {
                        element: "type",
                        tag: "Type",
                        val: metadata.properties.type
                    },
                    {
                        element: "datePublished",
                        tag: "Published",
                        val: new Date(metadata.properties.created).toLocaleDateString()
                    },
                    {
                        element: "Rights",
                        tag: "Rights",
                        val: metadata.properties.rights
                    },
                    {
                        element: "Formats",
                        tag: metadata.properties.formats?.length > 1 ? "Formats" : "Format",
                        val: metadata.properties.formats
                    }
                ]}
                visibleElements={2}
                expandedByDefault={false}
            />
        );
    }
}
