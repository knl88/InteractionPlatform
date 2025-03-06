import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@chakra-ui/react";

export interface DemonstratorEntryMetadata {
    name: string;
    description: string;
    id: string;
}

export interface DemonstratorEntryResult {
    response: {
        docs?: [
            {
                mainTitle: string;
                description: string;
                id: string;
            }
        ];
    };
}

export const DemonstratorEntry = (props: { title: string; id: string; }) => {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    
    const {title, id} = props;

    const handleClick = (id: string) => {
        navigate(`/result/` + id.split("/")[1]?.replace(".", ":")); //replace is needed as DDAS separates by colon, zenodo by point
        window.scroll(0, 0);
    };

    return (
        <Box 
            display="flex" 
            width="100%" 
            flexWrap="wrap"
        >
            <Box
                className={`how-to-entry ${hovered ? "hover" : "default"}`}
                onMouseLeave={() => setHovered(false)}
                onMouseEnter={() => setHovered(true)}
                onClick={() => handleClick(id)}
                boxShadow="md"
                backgroundColor={hovered ? "gray.100" : "white"}
            >
                <Box className="frame" display="flex" flexDirection="column" height="100%">
                    <Box className="heading" fontSize="lg">{title}</Box>
                    <Badge colorScheme="purple">Data-to-Knowledge Package</Badge>
                </Box>
            </Box>
        </Box>
    );
};
