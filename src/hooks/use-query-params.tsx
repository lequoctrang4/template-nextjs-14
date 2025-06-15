import { useSearchParams } from 'next/navigation';

export default function useQueryParams() {
  const query = useSearchParams();

  // Convert ReadonlyURLSearchParams to a regular object
  const queryObject = Array.from(query.keys()).reduce(
    (acc, key) => {
      const values = query.getAll(key); // Get all values for the key
      acc[key] = values.length > 1 ? values : values[0]; // Convert single values to string, keep arrays as is
      return acc;
    },
    {} as Record<string, string | string[]>
  );

  return queryObject;
}
