import { Box, Flex, Image, SimpleGrid, Heading, Text } from "@open-pioneer/chakra-integration";
import { useEffect, useState } from "react";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ZenodoResources } from "../../components/ResourceType/ExternalResources/ZenodoResources";
import { RelatedContent } from "../../components/ResourceType/RelatedIdentifier/RelatedIdentifier";
import { ZenodoMetadataResponse } from "./Zenodo";
import { getComponentIcon, getComponentLabel, parseRoCrate } from "../../services/DkpUtils";

export interface ZenodoViewProps {
    item: ZenodoMetadataResponse;
}

export interface Identifier {
    res_type: string;
    identifier: string[];
}

export function DkpView({ item: metadata }: ZenodoViewProps) {
    const roCrateUrl = "https://zenodo.org/api/records/"+metadata.recid+"/files/ro-crate-metadata.json/content";
    const [roCrate, setRoCrate] = useState<any[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [identifier, setIdentifier] = useState<Identifier>();

    useEffect(() => {
        async function fetchRoCrate() {
            try {
                const response = await fetch(roCrateUrl);
                if (!response.ok) throw new Error(`Failed to fetch RO-Crate: ${response.statusText}`);
                const roCrateData = await response.json();
                setRoCrate(parseRoCrate(roCrateData));
            } catch (error) {
                console.error(error);
            } 
        }
        fetchRoCrate();
    }, []);

    const programmingLanguages = extractProgrammingLanguages(metadata);
    const useGalaxyIdentifier = metadata.metadata.related_identifiers?.find(id =>
        id.identifier.includes("usegalaxy") && id.identifier.includes("workflow")
    );

    function extractProgrammingLanguages(metadata: any): string[] {
        const languages = metadata.metadata.custom?.["code:programmingLanguage"];
        if (!languages) return [];
        return Array.isArray(languages) ? languages.map(lang => lang.title?.en || "Unknown") : [languages.title?.en || "Unknown"];
    }

    function renderGalaxyEmbed(identifier: any) {
        return (
            <Box pt="40px">
                <iframe
                    title="Galaxy Workflow Embed"
                    style={{ width: "100%", height: "700px", border: "none" }}
                    src={`${identifier}&embed=true&buttons=true&about=false&heading=false&minimap=true&zoom_controls=true&initialX=-20&initialY=-20&zoom=0.6`}
                />
            </Box>
        );
    }

    return (
        <Box>
            <Box hideBelow="custombreak">
                <Flex gap="10%">
                    <Box w="65%">
                        {metadata.title && <Box className="title" pt="15px">{metadata.title}</Box>}
                        <Box pt="30px">{renderMetadata()}</Box>
                        {metadata.metadata.description && (
                            <Box pt="80px">
                                <Abstract abstractText={metadata.metadata.description} />
                            </Box>
                        )}
                        <Box pt="30px">{renderDkpComponent()}</Box>
                        {useGalaxyIdentifier && renderGalaxyEmbed(useGalaxyIdentifier.identifier)}
                        {metadata.metadata.related_identifiers && (
                            <Box pt={10}>
                                <RelatedContent relatedContentItems={metadata.metadata.related_identifiers} />
                            </Box>
                        )}
                    </Box>
                    <Box w="25%">
                        {metadata.links?.doi && (
                            <Box pt="40px">
                                <ZenodoResources metadata={metadata.links.self} repo={metadata.links.doi} download={metadata.links.archive} />
                            </Box>
                        )}
                    </Box>
                </Flex>
            </Box>

            <Box hideFrom="custombreak">
                {metadata.title && <Box className="title" pt="15px">{metadata.title}</Box>}
                <Box pt="30px">{renderMetadata()}</Box>
                {metadata.metadata.description && (
                    <Box pt="40px">
                        <Abstract abstractText={metadata.metadata.description} />
                    </Box>
                )}
                <Box pt="30px">{renderDkpComponent()}</Box>
                {metadata.links?.doi && (
                    <Box pt="40px">
                        <ZenodoResources metadata={metadata.links.self} repo={metadata.links.doi} download={metadata.links.archive} />
                    </Box>
                )}
            </Box>

            {showPopup && (
                <Box position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)" zIndex="10">
                    <Box bg="white" p="20px" borderRadius="8px" maxWidth="430px" margin="auto" marginTop="20%">
                        <Box padding={3} textAlign="center">
                            <b>
                                Where do you want to check the 
                                {identifier?.res_type === "ComputationalWorkflow" 
                                    ? " Workflow" 
                                    : identifier?.res_type === "WebAPI" 
                                        ? " Web API" 
                                        : identifier?.res_type === "SoftwareSourceCode"
                                            ? " Toolbox"
                                            : identifier?.res_type === "SoftwareApplication"
                                                ? " Virtual lab"
                                                : identifier?.res_type === "Dataset"
                                                    ? " Dataset"
                                                    : " " + identifier?.res_type
                                }
                            </b>
                        </Box>
                        {identifier?.identifier && identifier.identifier.map((id, index) => {
                            let label: any;
                            
                            if (id.includes("github.com")) {
                                label = <img src="/github_btn.png" alt="Galaxy" style={{ height: "45px" }} />;
                            } else if (id.includes("usegalaxy")) {
                                label = <img src="/galaxy_btn.png" alt="Galaxy" style={{ height: "35px" }} />;
                            } else if (id.includes("aquainfra.dev")) {
                                label = <img src="/aqua_btn.png" alt="Galaxy" style={{ height: "25px" }} />;
                            } else if (id.includes("zenodo")) {
                                label = <img src="/zenodo_btn.png" alt="Galaxy" style={{ height: "60px" }} />;
                            } else if (id.includes("aquainfra.ogc")) {
                                label = <img src="/pygeoapi_btn.png" alt="Galaxy" style={{ height: "45px" }} />;
                            } else {
                                label = id.length > 20 ? id.substring(0, 30) + "..." : id;
                            }

                            return (
                                <Box key={index} mb="10px" display="flex" justifyContent="center">
                                    <Box 
                                        as="button" 
                                        onClick={() => window.open(id, "_blank")} 
                                        style={{ 
                                            width: "70%", 
                                            padding: "10px", 
                                            backgroundColor: "#5CE65C",
                                            color: "black", 
                                            //borderRadius: "5px", 
                                            textAlign: "center", 
                                            display: "flex", 
                                            justifyContent: "center", 
                                            alignItems: "center",
                                            maxHeight: "45px",
                                            transition: "background-color 0.3s, transform 0.2s",
                                        }}
                                        onMouseOver={(e:any) => {
                                            e.currentTarget.style.backgroundColor = "#BFF4BE";
                                            e.currentTarget.style.transform = "scale(1.05)";
                                        }}
                                        onMouseOut={(e:any) => {
                                            e.currentTarget.style.backgroundColor = "#5CE65C";
                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                    >
                                        {label}
                                    </Box>
                                </Box>
                            );
                        })}

                        <Box mt="10px" display="flex" justifyContent="center">
                            <Box as="button" onClick={() => setShowPopup(false)} style={{ width: "70%", padding: "10px", backgroundColor: "#ff6347", color: "white", borderRadius: "5px", textAlign: "center" }}>
                                Close
                            </Box>
                        </Box>
                    </Box>
                </Box>            
            )}
        </Box>
    );

    function renderMetadata() {
        return (
            <Metadata
                metadataElements={[
                    { element: "author", tag: metadata.metadata.creators?.length > 1 ? "Authors" : "Author", val: metadata.metadata.creators },
                    { element: "provider", tag: "Provider", val: metadata.provider },
                    { element: "keyword", tag: metadata.metadata.keywords?.length > 1 ? "Keywords" : "Keyword", val: metadata.metadata.keywords },
                    { element: "datePublished", tag: "Published", val: new Date(metadata.metadata.publication_date || "").toLocaleDateString() },
                    { element: "datePublished", tag: "Updated", val: new Date(metadata.updated).toLocaleDateString() },
                    { element: "programmingLanguages", tag: programmingLanguages.length > 1 ? "Programming Languages" : "Programming Language", val: programmingLanguages },
                    { element: "language", tag: metadata.metadata.language?.length > 1 ? "Languages" : "Language", val: metadata.metadata.language },
                    { element: "type", tag: "Type", val: metadata.metadata.resource_type?.title },
                    { element: "rights", tag: "Access rights", val: metadata.metadata.access_right },
                    { element: "license", tag: "License", val: metadata.metadata.license?.id },
                    { element: "doi", tag: "DOI", val: metadata.doi_url },
                    { element: "version", tag: "Version", val: metadata.metadata.version }
                ]}
                visibleElements={3}
                expandedByDefault={false}
            />
        );
    }

    function renderDkpComponent() {
        return (
            <>
                <Box className="metadataSectionHeader" pt={5} mb={5}>
                    <b>Virtual Research Environment</b>
                </Box>
                {renderComponents(roCrate.slice(3, 6), 0, "ComputationalWorkflow")}

                <Box className="metadataSectionHeader" pt={50} mb={5}>
                    <b>Reproducible Basis</b>
                </Box>
                {renderComponents(roCrate.slice(0, 3), 3, "SoftwareSourceCode")}
            </>
        );
    }

    function handleIdentifier(type: string, identifier: string[]) {
        if (!identifier) return null;
        if (identifier.length > 1) {
            setShowPopup(true);
            setIdentifier({res_type: type, identifier: identifier});
        } else {
            window.open(identifier[0], "_blank");
        }
    }

    function renderComponents(components: any[], startIndex: number, priority: string) {
        const sortedComponents = [...components].sort((a, b) =>
            a.type === priority ? -1 : b.type === priority ? 1 : 0
        );
    
        return (
            <SimpleGrid columns={[1, 2, 3]} gap={10}>
                {sortedComponents.length > 0 ? (
                    sortedComponents.map((component, index) => (
                        <Box
                            key={index + startIndex}
                            //w="95%"
                            bg={hoveredIndex === index + startIndex ? "gray.100" : "#05668D"}
                            p={4}
                            borderRadius="none"
                            className={`how-to-entry ${hoveredIndex === index + startIndex ? "hover2" : "default"}`}
                            onMouseEnter={() => setHoveredIndex(index + startIndex)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            cursor="pointer"
                            onClick={() => handleIdentifier(component.type, component.identifier)}
                        >
                            <Box bg="white" borderRadius="full" p={2}>
                                <Image
                                    src={getComponentIcon(component.type)}
                                    alt={component.name || "Component"}
                                    borderRadius="full"
                                    w="40%"
                                    maxH="170px"
                                    m="0 auto"
                                />
                            </Box>
                            <Box color="white" fontSize={25}>
                                <b><u>{getComponentLabel(component.type)}</u></b>
                            </Box>
                            <Heading size="md" color="white">{component.name || "Unnamed Component"}</Heading>
                        </Box>
                    ))
                ) : (
                    <Text>No components found in the RO-Crate.</Text>
                )}
            </SimpleGrid>
        );
    }    
}
