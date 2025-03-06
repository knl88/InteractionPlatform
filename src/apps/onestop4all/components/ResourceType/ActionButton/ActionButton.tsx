import { Button, Icon } from "@open-pioneer/chakra-integration";
import { PrimaryColor } from "../../../Theme";

export const ActionButton = (props: { label: string; icon: any; variant: string; fun: () => void; disabled?:boolean; }) => {
    const { label, icon, variant, fun, disabled } = props;
    return (
        <Button
            className="actionButton"
            onClick={() => fun()}
            variant={variant}
            border="3px solid #05668D"
            w={{ base: "200px", custombreak: "100%" }}
            isDisabled={disabled}
        >
            <Icon boxSize={6} color={PrimaryColor}>
                {icon}
            </Icon>
            <div
                className={
                    variant == "solid" ? "actionButtonLabelSolid" : "actionButtonLabelOutline"
                }
            >
                {label}
            </div>
        </Button>
    );
};
