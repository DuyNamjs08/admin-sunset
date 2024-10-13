/* eslint-disable react/prop-types */
export const Table = ({
  tableHeader,
  tableBody,
  className = "",
  isEmpty = false,
}) => {
  const _className =
    "max-h-[480px] overflow-auto border rounded-lg divide-y divide-gray-700 border-gray-700 ".concat(
      className
    );
  return (
    <>
      <div className={_className}>
        <table className="min-w-full divide-y divide-gray-200">
          {tableHeader}
          {isEmpty ? (
            <tbody className="divide-y divide-gray-200 ">
              <tr key={1}>
                <td colSpan={100} className="text-center py-3">
                  Không có dữ liệu
                </td>
              </tr>
            </tbody>
          ) : (
            tableBody
          )}
        </table>
      </div>
    </>
  );
};
