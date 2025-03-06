import { ResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { MinSearchResultItem, SearchResultHandler } from "./search-result-handler";

export class LessonHandler extends SearchResultHandler {
    resourceType = ResourceType.Lesson;

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
