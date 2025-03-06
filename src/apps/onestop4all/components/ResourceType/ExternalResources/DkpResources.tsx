import { Box } from "@open-pioneer/chakra-integration";
import { ActionButton } from "../ActionButton/ActionButton";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const DkpResources = ({ dkps }: { dkps: any[] }) => {
    if (!dkps?.length) return null;

    return (
        <Box pt={5}>
            <div className="abstractSectionHeader">Data-to-Knowledge Package</div>
            {dkps.map((dkp, i) => {
                const graph = dkp["@graph"]?.[1];
                if (!graph) return null;

                return (
                    <Box key={i} pt={3}>
                        <div className="seperator" />
                        {graph.name && (
                            <div>
                                <span className="metadataTag">Title: </span>
                                <span className="metadataValue">{graph.name}</span>
                            </div>
                        )}
                        <Box pt={3}>
                            <ActionButton
                                label="Visit"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={() => window.open(graph.url?.["@id"], "_blank")}
                            />
                        </Box>
                        <div className="seperator" style={{ marginTop: "10px" }} />
                    </Box>
                );
            })}
        </Box>
    );
};
