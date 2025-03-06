import { SearchResultHandler } from "./search/result-handler/search-result-handler";
import { DatasetHandler } from "./search/result-handler/dataset-handler";
import { WorkflowHandler } from "./search/result-handler/workflow-handler";
import { SeriesHandler } from "./search/result-handler/series-handler";
import { ModelHandler } from "./search/result-handler/model-handler";
import { ServiceHandler } from "./search/result-handler/service-handler";
import { SoftwareHandler } from "./search/result-handler/software-zenodo-handler";
import { OfflineDataHandler } from "./search/result-handler/offlineData-handler";
import { LiveDataHandler } from "./search/result-handler/liveData-handler";
import { DownloadableDataHandler } from "./search/result-handler/downloadableData-handler";
import { PublicationHandler } from "./search/result-handler/publication-handler";
import { PresentationHandler } from "./search/result-handler/presentation-handler";
import { ImageHandler } from "./search/result-handler/image-handler";
import { VideoHandler } from "./search/result-handler/video-handler";
import { PosterHandler } from "./search/result-handler/poster-handler";
import { OtherHandler } from "./search/result-handler/other-handler";
import { LessonHandler } from "./search/result-handler/lesson-handler";
import { PhysicalObejctHandler } from "./search/result-handler/physicalobject-handler";
import { EventHandler } from "./search/result-handler/event-handler";
import { DkpHandler } from "./search/result-handler/dkp-handler";

export enum ResourceType {
    Dataset = "dataset",
    Series = "series",
    Service = "service",
    NonGeoData = "nonGeographicDataset",
    Unknown = "unknown",
    Software = "software",
    Model = "model",
    LiveData = "liveData",
    OfflineData = "offlineData",
    DownloadableData = "downloadableData",
    Workflow = "workflow",
    Publication = "publication",
    Presentation = "presentation",
    Image = "image",
    Lesson = "lesson",
    Other = "other",
    Poster = "poster",
    Video = "video",
    PhysicalObject = "physicalobject",
    Event = "event",
    DKP = "data-to-knowledge package"
}

const mapping = [
    {
        type: ResourceType.Dataset,
        identifier: "dataset"
    },
    {
        type: ResourceType.OfflineData,
        identifier: "offlineData"
    },
    {
        type: ResourceType.LiveData,
        identifier: "liveData"
    },
    {
        type: ResourceType.DownloadableData,
        identifier: "downloadableData"
    },
    {
        type: ResourceType.Series,
        identifier: "series"
    },
    {
        type: ResourceType.Service,
        identifier: "service"
    },
    {
        type: ResourceType.Model,
        identifier: "model"
    },
    {
        type: ResourceType.Unknown,
        identifier: "unknown"
    },
    {
        type: ResourceType.Software,
        identifier: "software"
    },
    {
        type: ResourceType.Workflow,
        identifier: "workflow"
    },
    {
        type: ResourceType.Publication,
        identifier: "publication"
    },
    {
        type: ResourceType.DKP,
        identifier: "data-to-knowledge package"
    },
    {
        type: ResourceType.Presentation,
        identifier: "presentation"
    },
    {
        type: ResourceType.Other,
        identifier: "other"
    },
    {
        type: ResourceType.Poster,
        identifier: "poster"
    },
    {
        type: ResourceType.Image,
        identifier: "image"
    },
    {
        type: ResourceType.Video,
        identifier: "video"
    },
    {
        type: ResourceType.Lesson,
        identifier: "lesson"
    },
    {
        type: ResourceType.PhysicalObject,
        identifier: "physicalobject"
    },
    {
        type: ResourceType.Event,
        identifier: "event"
    }
];

export function mapToResourceType(identifier: string): ResourceType {
    const match = mapping.find((e) => e.identifier === identifier);
    if (match) {
        return match.type;
    }
    throw new Error(`Could not find a ResourceType to the given identifier: ${identifier}`);
}

export function mapFromResourceType(resourceType: ResourceType): string {
    const match = mapping.find((e) => e.type === resourceType);
    if (match) {
        return match.identifier;
    }
    throw new Error(`Could not find an identifier to the given  ResourceType: ${resourceType}`);
}

const searchResultHandlers: SearchResultHandler[] = [
    new DatasetHandler(),
    new WorkflowHandler(),
    new SoftwareHandler(),
    new SeriesHandler(),
    new ModelHandler(),
    new ServiceHandler(),
    new DownloadableDataHandler(),
    new OfflineDataHandler(),
    new LiveDataHandler(),
    new PublicationHandler(),
    new PresentationHandler(),
    new ImageHandler(),
    new VideoHandler(),
    new PosterHandler(),
    new OtherHandler(),
    new LessonHandler(),
    new PhysicalObejctHandler(),
    new EventHandler(),
    new DkpHandler()
];

export function getHandler(result: string): SearchResultHandler {
    if (!result) {
        result = "dataset";
    }
    const match = searchResultHandlers.find((h) => h.canHandle(result));
    if (match) {
        return match;
    } else {
        throw new Error(
            "Unknown search item, please implement a handler: " + JSON.stringify(result)
        );
    }
}

export function getResourceType(result: string): ResourceType {
    return getHandler(result).resourceType;
}
