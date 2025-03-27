export const getGloballyFilteredData = <T extends object>(data: T[], globalFilter: string) => data.filter(
  (item) => Object.values(item)
    .some((value) => value
      .toString()
      .toLowerCase()
      .includes(globalFilter.toLowerCase())),
);
