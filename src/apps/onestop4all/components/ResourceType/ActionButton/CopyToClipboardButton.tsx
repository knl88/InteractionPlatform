import { useState, useEffect } from "react";
import { ActionButton } from "./ActionButton";
import { LinkIcon } from "@chakra-ui/icons";

export const CopyToClipboardButton = (props: { data: string; label: string }) => {
    const { data, label } = props;
    const [btnText, setBtnText] = useState(label);
    useEffect(() => {
        setBtnText(label);
    }, [label]);

    const copyToClipBoard = (message: string) => {
        if (message) {
            navigator.clipboard.writeText(message);
            setBtnText("copied to clipboard");

            setTimeout(() => {
                setBtnText(label);
            }, 2000);
        } else {
            setBtnText("Copy to clipboard failed");
        }
    };

    return (
        <ActionButton
            label={btnText}
            icon={<LinkIcon color="#05668D" />}
            variant="outline"
            fun={() => copyToClipBoard(data)}
        />
    );
};
