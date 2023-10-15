export const paramTransformer = (raw: Record<string, boolean | string | number | undefined>) => {
   if (typeof raw === 'object' && !Array.isArray(raw)) {
      let rawConverted = raw;
      for (const key in raw) {
         const keyConverted = ['_', ...Array.from(key)].join('').toString();
         if (keyConverted && rawConverted) {
            rawConverted = { ...raw, [keyConverted]: raw[key] };
            rawConverted[key] = undefined;
         }
      }
      return rawConverted;
   }
   return raw;
};
