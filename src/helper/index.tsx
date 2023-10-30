export const formatStringToDate = (isoString: string) => {
   const date = new Date(isoString);
   //cai getMonth tra ve thang tu 0-11 (cdcm :))
   const RETURN_MONTH_FROM_0_11 = 1;
   return `${date.getDate()}/${date.getMonth() + RETURN_MONTH_FROM_0_11}/${date.getFullYear()}`;
};
