import { Box } from "@open-pioneer/chakra-integration";

export const Keywords = (props: { list: Array<string>; tag: string; element: string }) => {
    const { list, tag, element } = props;

    const createQuery = (element: string, elem: string) => {
        if (element === "keyword") {
            return "/search?searchterm=" + elem;
        } else if (element === "theme") {
            return "/search?subjects=" + elem;
        } else {
            return "/";
        }
    };

    const seen = new Set();
    const uniqueList = list.filter(item => {
        if (item == null) {
            return false;
        }
        const trimmedItem = item.trim();
        if (!trimmedItem) {
            return false;
        }
        const lowerCaseItem = trimmedItem.toLowerCase();
        if (seen.has(lowerCaseItem)) {
            return false;
        } else {
            seen.add(lowerCaseItem);
            return true;
        }
    });

    return (
        <Box className="metadataSection">
            <div className="seperator"></div>
            <span className="metadataTag">
                {tag}
                :&nbsp;
            </span>
            {uniqueList.map((item: string, j: number) => (
                <a
                    href={createQuery(element, item)}
                    className={element === "keyword" ? "metadataKeyword" : "metadataTheme"}
                    key={j}
                    style={{marginRight:"1%"}}
                >
                    {item}
                </a>
            ))}
        </Box>
    );
};
