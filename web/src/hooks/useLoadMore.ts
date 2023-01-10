import { computed, ComputedRef, reactive } from "vue";

interface IPaginationOptions {
  page: number;
  per_page: number;
  count: number;
  q?: string | ComputedRef<string>;
  date?: number;
}

type IUseLoadMore = (
  paginationOptions: IPaginationOptions,
  callback: () => Promise<void>
) => {
  pagination: IPaginationOptions;
  isLastPage: ComputedRef<boolean>;
  loadMore: () => Promise<void>;
};

const useLoadMore: IUseLoadMore = (paginationOptions, callback) => {
  const pagination = reactive(paginationOptions);

  const isLastPage = computed(() => {
    return pagination.page >= Math.ceil(pagination.count / pagination.per_page);
  });

  const loadMore = async () => {
    await callback();
    pagination.page++;
  };

  return {
    pagination,
    isLastPage,
    loadMore,
  };
};

export default useLoadMore;
