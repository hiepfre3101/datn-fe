export const formatStringToDate = (isoString: string) => {
   const date = new Date(isoString);
   //cai getMonth tra ve thang tu 0-11 (cdcm :))
   const RETURN_MONTH_FROM_0_11 = 1;
   return `${date.getDate()}/${date.getMonth() + RETURN_MONTH_FROM_0_11}/${date.getFullYear()}`;
};

export const uppercaseFirstLetter = (string: string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};

export const transformCurrency = (value: string | number) => {
   const vndLocale = Intl.NumberFormat('vn', { style: 'currency', currency: 'vnd' });
   return vndLocale.format(Number(value));
};
