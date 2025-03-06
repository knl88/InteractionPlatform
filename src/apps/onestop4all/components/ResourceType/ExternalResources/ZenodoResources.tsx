import { Box, Flex, Input } from "@open-pioneer/chakra-integration";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useState, ChangeEvent } from "react";
import { useService } from "open-pioneer:react-hooks";

import { ActionButton } from "../ActionButton/ActionButton";
import { isUrl } from "../Metadata/PersonalInfo";
import { SearchService } from "../../../services";
import { TextFileResponse } from "../../../services/SearchService";

export const ZenodoResources = (props: { metadata: string, repo: string; download: string; }) => {
    const { metadata, repo, download } = props;
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;

    const [urlToImport, setUrlToImport] = useState("");
    const [disableImportToGalaxy, setDisableImportToGalaxy] = useState(true);

    const createTxtFile = async (url: string) => {
        if (isUrl(url)) {
            try {
                searchSrvc.createTxtFile(url)
                    .then((response: void | TextFileResponse) => {
                        if (response && response.textfile && response.textfile.href) {
                            window.open(`https://aqua.usegalaxy.eu/tool_runner?tool_id=aquainfra_importer&URL=${response.textfile.href}`, "_blank");
                        }
                    })
                    .catch ((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.error(error);
                setDisableImportToGalaxy(true);
                return null;
            }
        } else {
            setDisableImportToGalaxy(true);
            return null;
        }
    };

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setUrlToImport(url);
        isUrl(event.target.value) ? setDisableImportToGalaxy(false) : setDisableImportToGalaxy(true);
    };

    const handleGalaxyImport = async (href: string) => {
        const txt = await createTxtFile(href);
        if (txt) {
            window.open(`https://aqua.usegalaxy.eu/tool_runner?tool_id=aquainfra_importer&URL=${txt}`, "_blank");
        }
    };

    return (
        <Box>
            <div className="abstractSectionHeader">Zenodo resources</div>
            <Box>
                <Box pt={3}>
                    <div className="seperator" />
                    <Flex flexDirection="column"> 
                        <Box pt={3}>
                            <ActionButton
                                label="Visit repository"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={() => window.open(repo as string, "_blank")} // Opens the visit link in a new tab
                            />
                        </Box>
                    </Flex>
                </Box>
                <Box pt={3}>
                    <Flex flexDirection="column"> 
                        <Box pt={3}>
                            <ActionButton
                                label="Check metadata"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={() => window.open(metadata as string, "_blank")} // Opens the visit link in a new tab
                            />
                        </Box>
                    </Flex>
                </Box>
                {/*<Box pt={3}>
                    <Flex flexDirection="column"> 
                        <Box pt={3}>
                            <ActionButton
                                label="Import to Galaxy"
                                icon={<DownloadIcon color="white" />}
                                variant="solid"
                                fun={() => handleGalaxyImport(download)}
                            />
                        </Box>
                    </Flex>
                </Box>*/}
            </Box>
            <Box pt={3}>
                <div className="seperator" />
                <Box>
                    <div>
                        <span className="metadataValue">Insert URL to a dataset</span>
                    </div>
                    <Box pt={3}>
                        <Input 
                            value={urlToImport}
                            onChange={handleChange}
                            placeholder="Insert here"
                        />
                    </Box>
                    <ActionButton
                        label="Import to Galaxy"
                        disabled={disableImportToGalaxy}
                        icon={<DownloadIcon color="white" />}
                        variant="solid"
                        fun={() => handleGalaxyImport(urlToImport)} 
                    />
                </Box>
            </Box>
        </Box>
    );
};
