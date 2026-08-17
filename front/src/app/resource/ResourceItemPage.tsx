import type {ResourceEntity} from "../../types/Entities";
import ResourceItem from "./ResourceItem";
import {RESOURCE_API_PATH, RESOURCE_PAGE_ROUTE} from "../../utils/consts";
import createItemPage from "../../components/ItemPageGenerator";

const ResourceItemPage = createItemPage<ResourceEntity>(RESOURCE_API_PATH, RESOURCE_PAGE_ROUTE,
    'resource.itemTitle', ResourceItem, true )

export default ResourceItemPage