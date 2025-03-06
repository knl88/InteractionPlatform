import { Flex, Box } from "@open-pioneer/chakra-integration";
import { Misc } from "../Metadata/Misc";

export const SpatialInformation = (props: { metadataElements: object; bbox: string }) => {
    const metadataElements = Object.values(props.metadataElements);

    return (
        <Box>
            <div className="metadataSectionHeader">Spatial Extent</div>
            {metadataElements.map((e, i) =>
                e.tag == "Bounding box" ? (
                    <Misc key={i} tag={e.tag} val={e.val} />
                ) : e.tag == "Reference systems" ? (
                    <Box key={i}>
                        <div className="seperator"></div>
                        <div>
                            <Flex alignItems="center">
                                <span className="metadataTag">{e.tag}:&nbsp;</span>
                                {e.val.map((elem: number, i: number) => (
                                    <div key={i}>
                                        <span>
                                            {elem}
                                            {i < e.val.length - 1 ? "," : ""}&nbsp;
                                        </span>
                                    </div>
                                ))}
                            </Flex>
                        </div>
                    </Box>
                ) : (
                    <></>
                )
            )}
            {/*<Box pt="22px">
                <Map geometry={bbox} height="70vh" triggerPositioning={0} />
                </Box>*/}
        </Box>
    );
};
