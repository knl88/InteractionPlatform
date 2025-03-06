import { ZenodoMetadataResponse } from "../../../views/Zenodo/Zenodo";
import { mapFromResourceType, ResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";

export type MinSearchResultItem = {
    title: string;
    abstract: string;
    url: string;
};

export abstract class SearchResultHandler {
    public abstract readonly resourceType: ResourceType;

    public canHandle(item: string): boolean {
        if (item) {
            return item === (mapFromResourceType(this.resourceType) as string);
        }
        return false;
    }

    protected abstract handleExplicit(
        item: SolrSearchResultItem | ZenodoMetadataResponse
    ): Partial<SearchResultItem> & MinSearchResultItem;

    public handle(item: SolrSearchResultItem): SearchResultItem {
        return {
            publishDate: item.datePublished ? new Date(item.datePublished) : undefined,
            updateDate: item.dateModified ? new Date(item.dateModified) : undefined,
            resourceType: this.resourceType,
            ...item,
            ...this.handleExplicit(item)
        };
    }
}
