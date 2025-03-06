import { Button } from "@open-pioneer/chakra-integration";
import { PrimaryColor } from "../../../../Theme";
import { lineBlue } from "./Styles";

interface DeselectButtonProps {
    onClick: () => void;
    active: boolean;
    text: string;
}
export function CatchmentButton(props: DeselectButtonProps) {
    const { onClick, active, text } = props;
    const bgcolor = active ? PrimaryColor : "rgba(5, 102, 141, 0.6)";
    const hover = active ? { bg: lineBlue } : { bg: "rgba(5, 102, 141, 0.6)" };
    // remove onClick if button is deactivated
    function handleClick() {
        if (active) {
            onClick();
        }
    }
    return (
        <Button bg={bgcolor} _hover={hover} onClick={handleClick} className="catchment-button">
            {text}
        </Button>
    );
}
