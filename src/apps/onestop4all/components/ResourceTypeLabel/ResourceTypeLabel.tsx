import { Box, Flex, Skeleton } from "@open-pioneer/chakra-integration";

import { ResourceType } from "../../services/ResourceTypeUtils";
import {
    DatasetIcon,
    DocumentsIcon,
    EventIcon,
    ImageIcon,
    LearningResourceIcon,
    OtherIcon,
    SeriesIcon,
    ToolSoftwareIcon,
    VideoIcon,
    WorkflowIcon,
    DkpIcon
} from "../Icons";

export function ResourceTypeLabel(props: {
    resType: ResourceType | undefined;
    loading: boolean;
    iconAlign: "left" | "right";
}) {
    const { resType, loading = false, iconAlign } = props;

    return (
        <Flex
            whiteSpace="nowrap"
            textTransform="uppercase"
            fontWeight="700"
            color="#666666"
            letterSpacing="0.8px"
            alignItems="center"
            gap="12px"
        >
            {loading ? (
                <Skeleton>Loading...</Skeleton>
            ) : (
                <>
                    {iconAlign === "left" && <Box>{getIcon()}</Box>}
                    <Box>{resType}</Box>
                    {iconAlign === "right" && <Box>{getIcon()}</Box>}
                </>
            )}
        </Flex>
    );

    function getIcon() {
        switch (resType) {
            case ResourceType.Dataset:
                return <DatasetIcon />;
            case ResourceType.Series:
                return <SeriesIcon />;
            case ResourceType.Software:
                return <ToolSoftwareIcon />;
            case ResourceType.DKP:
                return <DkpIcon />;
            case ResourceType.Workflow:
                return <WorkflowIcon />;
            case ResourceType.Publication:
            case ResourceType.Poster:
            case ResourceType.Presentation:
                return <DocumentsIcon />;
            case ResourceType.Image:
                return <ImageIcon />;
            case ResourceType.Event:
                return <EventIcon />;
            case ResourceType.Other:
                return <OtherIcon />;
            case ResourceType.Video:
                return <VideoIcon />;
            case ResourceType.Lesson:
                return <LearningResourceIcon />;
            default:
                return <></>;
        }
    }
}
