import { Box, Flex } from "@open-pioneer/chakra-integration";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ZenodoResources } from "../../components/ResourceType/ExternalResources/ZenodoResources";
import { RelatedContent } from "../../components/ResourceType/RelatedIdentifier/RelatedIdentifier";
import { DkpResources } from "../../components/ResourceType/ExternalResources/DkpResources";

export interface RelatedIdentifier {
    identifier: string;
    relation: string;
    resource_type: string;
    scheme: string;
}
export interface ZenodoMetadataResponse {
    title: string;
    updated: string;
    doi_url: string;
    provider: string;
    dkps: any;
    recid: string;
    files: [{
        links:{
            self: string;
        }
    }];
    links?: {
        self: string;
        doi: string;
        archive: string;
    };
    metadata: {
        description: string;
        creators: [{
            affiliation: string;
            orcid: string;
            name: string;
        }];
        keywords: string[];
        publication_date: string;
        language: string[];
        resource_type: {
            title: string;
            type: string;
        };
        access_right: string;
        license: {
            id: string;
        };
        version: string;
        custom?: {
            "code:codeRepository": string;
            "code:programmingLanguage": {
                id: string;
                title: {
                    en: string;
                }
            }
        },
        related_identifiers?: RelatedIdentifier[]
    };
}

export interface ZenodoViewProps {
    item: ZenodoMetadataResponse;
}

export function ZenodoView(props: ZenodoViewProps) {
    const metadata = props.item;

    const programmingLanguages = metadata.metadata.custom?.["code:programmingLanguage"]
        ? Array.isArray(metadata.metadata.custom["code:programmingLanguage"])
            ? metadata.metadata.custom["code:programmingLanguage"].map(lang => lang.title?.en || "Unknown")
            : [metadata.metadata.custom["code:programmingLanguage"].title?.en || "Unknown"]
        : "";

    const useGalaxyIdentifier = metadata.metadata.related_identifiers?.find(
        (identifier) => identifier.identifier.includes("usegalaxy") && identifier.identifier.includes("workflow")
    );
    
    return (
        <Box>
            {/* Desktop view */}
            <Flex gap="10%" hideBelow="custombreak">
                <Box w="65%">
                    {metadata.title ? (
                        <Box className="title" pt="15px">
                            {metadata.title}
                        </Box>
                    ) : null}
                    <Box pt="30px">{getMetadata()}</Box>
                    {metadata.metadata.description ? (
                        <Box pt="80px">
                            <Abstract abstractText={metadata.metadata.description} />
                        </Box>
                    ) : null}
                    {useGalaxyIdentifier && (
                        <Box pt="40px">
                            <iframe
                                title="Galaxy Workflow Embed"
                                style={{ width: "100%", height: "700px", border: "none" }}
                                src={useGalaxyIdentifier.identifier + "&embed=true&buttons=true&about=false&heading=false&minimap=true&zoom_controls=true&initialX=-20&initialY=-20&zoom=0.6"}
                            ></iframe>
                        </Box>
                    )}
                    {metadata.metadata.related_identifiers ? <Box pt={10}>
                        <RelatedContent relatedContentItems={metadata.metadata.related_identifiers} />
                    </Box> : null}
                </Box>
                <Box w="25%">
                    {metadata.dkps ? (
                        <Box pt="8px">
                            <DkpResources dkps={metadata.dkps} />
                        </Box>
                    ) : "null"}
                    {metadata.links && metadata.links.doi ? (
                        <Box pt="40px">
                            <ZenodoResources metadata={metadata.links.self} repo={metadata.links.doi} download={metadata.links.archive}/>
                        </Box>
                    ) : null}
                </Box>
            </Flex>
            {/* Mobile view */}
            <Box hideFrom="custombreak">
                {metadata.title ? (
                    <Box className="title" pt="15px">
                        {metadata.title}
                    </Box>
                ) : null}
                <Box pt="30px">{getMetadata()}</Box>
                {metadata.metadata.description ? (
                    <Box pt="40px">
                        <Abstract abstractText={metadata.metadata.description} />
                    </Box>
                ) : null}
                {metadata.dkps ? (
                    <Box pt="8px">
                        <DkpResources dkps={metadata.dkps} />
                    </Box>
                ) : "null"}
                {metadata.links && metadata.links.doi ? (
                    <Box pt="40px">
                        <ZenodoResources metadata={metadata.links.self} repo={metadata.links.doi} download={metadata.links.archive}/>
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
                        element: "author",
                        tag: metadata.metadata.creators?.length > 1 ? "Authors" : "Author",
                        val: metadata.metadata.creators
                    },
                    {
                        element: "provider",
                        tag: "Provider",
                        val: metadata.provider
                    },
                    {
                        element: "keyword",
                        tag: Array.isArray(metadata.metadata.keywords) && metadata.metadata.keywords?.length > 1 ? "Keywords" : "Keyword",
                        val: metadata.metadata.keywords
                    },
                    {
                        element: "datePublished",
                        tag: "Published",
                        val: metadata.metadata.publication_date ? new Date(metadata.metadata.publication_date).toLocaleDateString() : ""
                    },
                    {
                        element: "datePublished",
                        tag: "Updated",
                        val: new Date(metadata.updated).toLocaleDateString()
                    },
                    {
                        element: "programmingLanguages",
                        tag: programmingLanguages.length > 1 ? "Programming Languages" : "Programming Language",
                        val: programmingLanguages
                    },
                    {
                        element: "language",
                        tag: Array.isArray(metadata.metadata.language) && metadata.metadata.language?.length > 1 ? "Languages" : "Language",
                        val: metadata.metadata.language
                    },
                    {
                        element: "type",
                        tag: "Type",
                        val: metadata.metadata.resource_type?.title
                    },
                    {
                        element: "rights",
                        tag: "Access rights",
                        val: metadata.metadata.access_right
                    },
                    {
                        element: "license",
                        tag: "License",
                        val: metadata.metadata.license?.id
                    },
                    {
                        element: "doi",
                        tag: "DOI",
                        val: metadata.doi_url
                    },
                    {
                        element: "version",
                        tag: "Version",
                        val: metadata.metadata.version
                    }
                ]}
                visibleElements={3}
                expandedByDefault={false}
            />
        );
    }
}
