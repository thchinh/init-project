const checkAge = (age) => {
  return age >= 18 ? 'Đủ tuổi' : 'Chưa đủ tuổi';
};

const eq = (value1, value2) => {
  return value1 === value2;
};

const generatePagination = (
  totalPage,
  pageIndex,
  pageSize,
  searchText,
  sortBy,
  sortOrder
) => {
  const params = new URLSearchParams({
    pageSize: pageSize,
  });
  const hrefBase = '/courses/manage';

  if (searchText) {
    params.set('searchText', searchText);
  }

  if (sortBy && sortOrder) {
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
  }

  const queryParams = params.toString();
  const isRenderPreviousLink = pageIndex > 1;
  const isRenderNextLink = pageIndex < totalPage;
  const previousLink = isRenderPreviousLink
    ? `${hrefBase}?pageIndex=${pageIndex - 1}&${queryParams}`
    : '#';
  const nextLink = isRenderNextLink
    ? `${hrefBase}?pageIndex=${pageIndex + 1}&${queryParams}`
    : '#';

  let pagination = `<li class="page-item ${!isRenderPreviousLink ? 'disabled' : ''}">
                        <a class="page-link" href="${previousLink}" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`;

  for (let i = 1; i <= totalPage; i++) {
    pagination += `
    <li class="page-item ${i === pageIndex ? 'active' : ''}">
        <a class="page-link" href="${hrefBase}?pageIndex=${i}&${queryParams}">
            ${i}
        </a>
    </li>`;
  }

  pagination += `<li class="page-item ${pageIndex === totalPage ? 'disabled' : ''}">
                    <a class="page-link" href="${nextLink}" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>`;
  return pagination;
};

const handlebarsHelpers = {
  checkAge,
  eq,
  generatePagination,
};

export default handlebarsHelpers;
