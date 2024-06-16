import { QueryParams } from "CustomTypes";

export const buildQueryString = (params: QueryParams): string => {
    const queryParams = new URLSearchParams();

    if (params.page) {
        queryParams.append("page", params.page.toString());
    }

    if (params.limit) {
        queryParams.append("limit", params.limit.toString());
    }

    if (params.keyword) {
        queryParams.append("keyword", params.keyword);
    }

    if (params.fieldName) {
        queryParams.append("fieldName", params.fieldName);
    }

    if (params.category) {
        queryParams.append("category", params.category.toString());
    }

    if (params.order) {
        queryParams.append("order", params.order);
    }

    if (params.orderBy) {
        queryParams.append("orderBy", params.orderBy);
    }

    return queryParams.toString();
};