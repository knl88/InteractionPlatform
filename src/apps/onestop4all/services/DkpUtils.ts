export function getComponentLabel(type: string) {
    return type === "SoftwareSourceCode" 
        ? "Toolbox"
        : type === "SoftwareApplication" 
            ? "Virtual Lab"
            : type === "WebAPI" 
                ? "Web API" 
                : type === "ComputationalWorkflow"
                    ? "Workflow"
                    : type;
}

export function getComponentIcon(type: string) {
    const icons: Record<string, string> = {
        SoftwareSourceCode: "/toolbox.svg",
        SoftwareApplication: "/virtuallab.svg",
        WebAPI: "/cloud.svg",
        ComputationalWorkflow: "/workflow.svg",
        Dataset: "/data.svg"
    };
    return icons[type] || "";
}

export function parseRoCrate(roCrate: any) {
    const graph = roCrate["@graph"];
    const findById = (id: string) => graph.find((item: any) => item["@id"] === id);
    const rootDataset = graph.find((item: any) => item["@id"] === "./");

    const dkp_components = rootDataset?.hasPart?.map((part: any) => {
        const resource = findById(part["@id"]);
        let identifier: string[] = [];
        
        if (resource?.identifier) {
            if (typeof resource.identifier === "string") {
                identifier = [resource.identifier];
            } else if (Array.isArray(resource.identifier)) {
                identifier = resource.identifier.map((id: any) =>
                    typeof id === "string" ? id : findById(id["@id"])?.name || null
                ).filter(Boolean);
            } else if (resource.identifier["@id"]) {
                const resolvedIdentifier = findById(resource.identifier["@id"])?.name || null;
                if (resolvedIdentifier) identifier.push(resolvedIdentifier);
            }
        }

        identifier.sort();

        return {
            identifier,
            name: resource?.name || null,
            type: resource?.["@type"]?.[0] || null,
            image: findById(resource?.image?.["@id"])?.name || null
        };
    });

    return dkp_components;
}

export function findAssociatedDkp(dkps: any[], resource_id: string): any[] {
    //const dkp_elements = dkps[0]["@graph"];
    const associatedDkps: any[] = [];

    function searchObject(obj: any): boolean {
        for (const key in obj) {
            if (typeof obj[key] === "string" && obj[key].includes(resource_id)) {
                return true;
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
                if (Array.isArray(obj[key])) {
                    if (obj[key].some((item:any) => 
                        (typeof item === "string" && item.includes(resource_id)) || 
                        (typeof item === "object" && item !== null && searchObject(item))
                    )) {
                        return true;
                    }
                } else if (searchObject(obj[key])) {
                    return true;
                }
            }
        }
        return false;
    }

    dkps?.forEach((dkp: any, key: number) => {
        if (searchObject(dkps[key]["@graph"])) {
            associatedDkps.push(dkp);
        }
    });

    return associatedDkps;
}

export async function fetchAndStoreDkps(searchSrvc: any, searchState: any) {
    try {
        const result = await searchSrvc.getDataToKnowledgePackages();
        if (!result) return;

        const dkps = result.hits.hits;
        const fetchedDkps = await Promise.all(
            dkps.map(async (element: any) => {
                const roCrateUrl = `https://zenodo.org/api/records/${element.recid}/files/ro-crate-metadata.json/content`;
                try {
                    const response = await fetch(roCrateUrl);
                    if (!response.ok) throw new Error(`Failed to fetch RO-Crate: ${response.statusText}`);
                    return await response.json();
                } catch (error) {
                    console.error(error);
                    return null;
                }
            })
        );
        searchState.setDkps(fetchedDkps);
    } catch (error) {
        console.error("Error fetching DKPs:", error);
    }
}
