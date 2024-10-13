/* eslint-disable react/prop-types */
export const TableHeader = ({ headers, textAlign = "" }) => {
  return (
    <>
      <thead className="bg-gray-50 sticky top-0 left-0 z-1">
        <tr>
          {headers.map(({ name, label }, index) => {
            return (
              <th
                className={
                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercas whitespace-nowrap"
                }
                key={name ?? index}
              >
                <div
                  className={"flex items-center cursor-pointer".concat(
                    textAlign
                  )}
                >
                  {label}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    </>
  );
};
