import { useInfiniteQuery } from "react-query";

export function useInfinitePokemonQuery({fetchOption, queryKey}){
  return useInfiniteQuery([queryKey], fetchOption, {
      refetchOnMount: true,
      getNextPageParam: (lastPage,pages) => {
        if(pages.length < 1118){
          return pages.length * 20
        }else{
          return undefined
        }
      },
    })
}