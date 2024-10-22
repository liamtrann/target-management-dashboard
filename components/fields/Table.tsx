import React from "react";

interface TableProps<T> {
  headers: { key: keyof T; label: string }[];
  rows: T[];
  renderCell: (row: T, key: keyof T) => React.ReactNode;
}

const Table = <T,>({ headers, rows, renderCell }: TableProps<T>) => {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          {headers.map(({ key, label }) => (
            <th key={key.toString()} className="border p-2">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {headers.map(({ key }) => (
              <td key={key.toString()} className="border p-2">
                {renderCell(row, key)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
