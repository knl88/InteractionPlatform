import { IconButton } from "@open-pioneer/chakra-integration";
import { DeleteIcon } from "@chakra-ui/icons";

interface DrawBboxButtonProps {
    onClick: () => void;
}
export function DeleteBbox(props: DrawBboxButtonProps) {
    const { onClick } = props;
    return (
        <IconButton
            aria-label="rectangle select"
            size="lg"
            position="absolute"
            zIndex="1000"
            right="10px"
            bottom="20px"
            rounded={"lg"}
            title="Click here to delete the bounding box"
            onClick={() => onClick()}
            icon={<DeleteIcon />}
        />
    );
};
