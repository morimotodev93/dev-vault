import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function updateSearchParam(
  router: AppRouterInstance,
  searchParams: URLSearchParams,
  key: string,
  value: string,
) {
  const params = new URLSearchParams(searchParams);

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  params.delete("page");

  const queryString = params.toString();

  router.push(queryString ? `/snippets?${queryString}` : "/snippets");
}
