import React from 'react'
import { useTable } from 'react-table'

export function TripsTable({ trips, onCancel }) {
  const data = React.useMemo(() => trips, [trips])

  const columns = React.useMemo(
    () => [
      { Header: 'Stay', accessor: 'stay.name',  Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={row.original.stay.imgUrl}
            alt={row.original.stay.name}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '4px',
              marginRight: '10px',
              objectFit: 'cover',
            }}
          />
          {row.original.stay.name}
        </div>
      ) },
      { Header: 'Host', accessor: 'hostName' },
      { Header: 'Check-in', accessor: 'startDate' },
      { Header: 'Check-out', accessor: 'endDate' },
      { Header: 'Total Price', accessor: 'totalPrice', Cell: ({ value }) => `${value}$` },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Actions', Cell: ({ row }) => (
        <button
          style={{
           backgroundColor: row.original.status === 'canceled' ? '#ccc' : '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor:  row.original.status === 'canceled' ? 'not-allowed' : 'pointer',
          }}
          onClick={() => {
            if (row.original.status !== 'canceled') {
              onCancel(row.original._id);
            }
          }}
          disabled={row.original.status === 'canceled'}
        >
          {row.original.status === 'canceled' ? 'Canceled' : 'Cancel'}
        </button>
      ), },

    ],
    [onCancel]
  )

  const tableInstance = useTable({ columns, data })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <table
      {...getTableProps()}
      style={{
        width: '100%',
        borderCollapse: 'collapse',
      }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  padding: '15px',
                  textAlign: 'left',
                  backgroundColor: '#f2f1f1',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    height: '80px',
                    padding: '10px',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
