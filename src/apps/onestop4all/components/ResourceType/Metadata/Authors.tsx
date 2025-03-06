import { Box } from "@open-pioneer/chakra-integration";
import { PersonalInfo } from "./PersonalInfo";

export interface Author {
    name: string;
    orcid?: string;
    affiliation?: string;
}

const AuthorEntry = (props: Author) => {
    const { name, orcid, affiliation } = props;
    return (
        <>
            <PersonalInfo name={name} orcid={orcid} affiliation={affiliation} />
            &nbsp;
        </>
    );
};

export const Authors = (props: { authors: Author[]; tag?: string }) => {
    const authors = props.authors;
    const tag = props.tag;

    return (
        <Box className="metadataSection">
            {tag ? <span className="metadataTag">{tag}:&nbsp;</span> : null}
            {authors.map((elem: Author, j: number) => (
                <div className="author" key={j}>
                    <AuthorEntry
                        key={j}
                        name={elem.name}
                        orcid={elem.orcid}
                        affiliation={elem.affiliation}
                    />
                </div>
            ))}
        </Box>
    );
};
