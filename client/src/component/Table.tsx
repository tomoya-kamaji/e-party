interface TableProps<T extends string> {
  /** 描画したいヘッダー一覧 */
  headers: T[];
  /** ヘッダーに対応する列をすべて持つデータ */
  data: Array<Record<T, React.ReactNode>>;
}

const CustomTable = <T extends string>({ headers, data }: TableProps<T>) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex} className="whitespace-nowrap px-6 py-4">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
