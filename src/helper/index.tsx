export const formatStringToDate = (isoString: string) => {
   const date = new Date(isoString);
   return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
