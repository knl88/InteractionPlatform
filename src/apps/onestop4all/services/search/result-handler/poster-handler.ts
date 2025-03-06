import { ResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { MinSearchResultItem, SearchResultHandler } from "./search-result-handler";

export class PosterHandler extends SearchResultHandler {
    resourceType = ResourceType.Poster;

    protected handleExplicit(
        item: SolrSearchResultItem
    ): Partial<SearchResultItem> & MinSearchResultItem {
        return {
            title: item.properties.title,
            abstract: item.properties.description,
            url: ""
        };
    }
}
