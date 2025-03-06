import { Box, SimpleGrid, Text } from "@open-pioneer/chakra-integration";

export const Videos = () => {
    const videos = [
        {
            title: "Video 6: The AquaINFRA Interaction Platform - Integration with Galaxy and DDAS",
            src: "https://www.youtube.com/embed/KPdFnbUIASU?si=pJ7eZisduX9dutRK",
        },
        {
            title: "Video 5: Ontology-based search and further filter options",
            src: "https://www.youtube.com/embed/D4gWc-RXUsU?si=qN3DZWOvqYFhhBIw",
        },
        {
            title: "Video 4: Importing data to Galaxy, option 2",
            src: "https://www.youtube.com/embed/roDOc1qkJdc?si=yN3F5ulDs9uRYKBl&amp;start=1",
        },
        {
            title: "Video 3: Searching with the help of catchment areas",
            src: "https://www.youtube.com/embed/fpaEtw35MoI?si=9Wikv8JGvH0BgM4M",
        },
        {
            title: "Video 2: Importing data to Galaxy, option 1",
            src: "https://www.youtube.com/embed/92VtJhJZA_Q?si=6SKcccEVXYdfuPhQ",
        },
        {
            title: "Video 1: Searching for datasets",
            src: "https://www.youtube.com/embed/-SRh9k44IRo?si=5VsH34-Qs6RZdvGc",
        },
    ];

    return (
        <Box>
            {/* Header Section */}
            <Box textAlign="center" mb={{ base: "5%", custombreak: "2%" }}>
                <Text fontSize="xl" fontWeight="bold" color="gray.700">
                    Check out some videos explaining the key features of this platform
                </Text>
            </Box>

            {/* Video Grid */}
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
                {videos.map((video, index) => (
                    <Box key={index}>
                        <Text fontSize="md" fontWeight="semibold" mb={2}>
                            {video.title}
                        </Text>
                        <iframe
                            width="100%"
                            height="315"
                            src={video.src}
                            title={`YouTube video player - ${video.title}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ borderRadius: "8px", boxShadow: "0px 2px 8px rgba(0,0,0,0.15)" }}
                        />
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};
