'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const useSetSearchParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParam = (key: string, value: string) => {
    // Create a new URLSearchParams object and append or update the parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    // Update the URL with the new search parameters
    router.push(`${pathname}?${params.toString()}`);
  };

  return setSearchParam;
};

export default useSetSearchParam;
