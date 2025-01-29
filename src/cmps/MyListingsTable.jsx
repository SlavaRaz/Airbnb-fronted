import React from 'react'
import { useTable } from 'react-table'

export function MyListingsTable({ trips, onAccept, onReject }) {
  const data = React.useMemo(() => trips, [trips])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Guest',
        accessor: 'buyer.fullname',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={row.original.buyer.imgUrl}
              alt={row.original.stay.name}
              style={{
                width: '55px',
                height: '55px',
                borderRadius: '50px',
                marginRight: '10px',
                objectFit: 'cover',
              }}
            />
            <div>
              <div className='name-title'> {row.original.buyer.fullname}</div>
              <div>Guest</div>
            </div>
          </div>
        ),
      },
      { Header: 'Check-in', accessor: 'startDate' },
      { Header: 'Check-out', accessor: 'endDate' },
      {
        Header: 'Stay',
        accessor: 'stay.name',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={row.original.stay.imgUrl}
              alt={row.original.stay.name}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '8px',
                marginRight: '10px',
                objectFit: 'cover',
              }}
            />
            <div>
              <div className='listing-name-title'>
                {`${row.original.stay.city}, ${row.original.stay.country}`}
              </div>
              <div>{row.original.stay.name}</div>
            </div>
          </div>
        ),
      },

      {
        Header: 'Payment',
        accessor: 'totalPrice',
        Cell: ({ value }) => `${value}$`,
      },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className='actions-buttons-host'>
            {/* Accept Button */}
            <button
              style={{
                backgroundColor: '#efebeb',
                color:
                  row.original.status === 'approved' || row.original.status === 'rejected'
                    ? '#9a9a9a'
                    : '#026f10',
                border: `1px solid ${
                  row.original.status === 'approved' || row.original.status === 'rejected'
                    ? '#9a9a9a'
                    : '#026f10'
                }`,
                padding: '5px 10px',
                borderRadius: '4px',
                cursor:
                  row.original.status === 'approved' || row.original.status === 'rejected'
                    ? 'not-allowed'
                    : 'pointer',
              }}
              onClick={() => {
                if (row.original.status !== 'approved' && row.original.status !== 'rejected') {
                  onAccept(row.original._id);
                }
              }}
              disabled={row.original.status === 'approved' || row.original.status === 'rejected'}
            >
              Accept
            </button>
      
            {/* Reject Button */}
            <button
              style={{
                backgroundColor: '#efebeb',
                color:
                  row.original.status === 'approved' || row.original.status === 'rejected'
                    ? '#9a9a9a'
                    : '#f10000',
                border: `1px solid ${
                  row.original.status === 'approved' || row.original.status === 'rejected'
                    ? '#9a9a9a'
                    : '#f10000'
                }`,
                padding: '5px 10px',
                borderRadius: '4px',
                cursor:
                  row.original.status === 'approved' || row.original.status === 'rejected'
                    ? 'not-allowed'
                    : 'pointer',
              }}
              onClick={() => {
                if (row.original.status !== 'approved' && row.original.status !== 'rejected') {
                  onReject(row.original._id);
                }
              }}
              disabled={row.original.status === 'approved' || row.original.status === 'rejected'}
            >
              Reject
            </button>
          </div>
        ),
      }
      
    ],
    [onAccept]
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
                  border: '2px solid white',
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
                    border: '2px solid white',
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
