import { Image } from "@open-pioneer/chakra-integration";

export function isUrl(url: string) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}

export function isEmail(address: string) {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(address);
}

export const MetadataUrl = (props: { item: string; type: string }) => {
    const { item, type } = props;
    return (
        <a
            href={type == "mail" ? "mailto: " : "" + item}
            className="metadataLink"
            rel="noreferrer"
            target="_blank"
        >
            {item}
        </a>
    );
};

export const PersonalInfo = (props: { name: string; orcid?: string; affiliation?: string }) => {
    const { name, orcid, affiliation } = props;

    return (
        <>
            {name ? name : ""}
            {orcid && orcid[0] !== "" ? (
                <a
                    href={isUrl(orcid) ? orcid : "https://orcid.org/" + orcid}
                    rel="noreferrer"
                    target="_blank"
                >
                    <Image className="orcid" alt="Bg icon" src="/orcid.png" />
                </a>
            ) : null}
            {affiliation ? <span style={{ marginLeft: "0.5em" }}>{affiliation}</span> : ""}
        </>
    );
};
