import React from 'react'
import { useTable } from 'react-table'
import redDot from '../assets/img/various/red-dot.svg'
import greenDot from '../assets/img/various/green-dot.svg'
import yellowDot from '../assets/img/various/yellow-dot.svg'

export function MyListingsTable({ trips, onAccept, onReject }) {
  const data = React.useMemo(() => trips.slice().reverse(), [trips]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Guest',
        accessor: 'user.fullname',
        Cell: ({ row }) => (
          <div className='guest-name' >
            <img
              src={row.original.user.imgUrl}
              alt={row.original.user.fullname}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50px',
                marginRight: '10px',
                objectFit: 'cover',
              }}
            />
            <div className='name-container'>
              <div className='name-title'> {row.original.user.fullname}</div>
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
          <div className= 'stay-name-container' style={{ display: 'flex', alignItems: 'center',
           }}>
            <img
              src={row.original.stay.imgUrl}
              alt={row.original.stay.name}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                marginRight: '10px',
                objectFit: 'cover',
              }}
            />
            <div className='listing-stay-name'>
              <div className='listing-name-title'>
                {`${row.original.stay.city}, ${row.original.stay.country}`}
              </div>
              <div className='stay-text'>{row.original.stay.name}</div>
            </div>
          </div>
        ),
      },
      {
        Header: 'Guests',
        Cell: ({ row }) => {
          const totalGuests = `${row.original.guests.adults + row.original.guests.children+row.original.guests.infants}`
      
      
          return (
            <div className='number-of-guests'>{`${totalGuests}`}</div>
          )
        }
      },

      {
        Header: 'Payment',
        accessor: 'totalPrice',
        Cell: ({ value }) => `${value}$`,
      },
      { 
        Header: 'Status', 
        accessor: 'status',  
        Cell: ({ row }) => {
          const status = row.original.status.toLowerCase()
      
          const statusDot = {
            approved: greenDot,
            pending: yellowDot,
            canceled: redDot,
            rejected: redDot
          };
      
          return (
            <div className='status-container'>
              <img
                src={statusDot[status] || yellowDot} 
                alt={`${status} status`}
                className='status-dot'
              />
              <span className={`status-text ${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
          )
        }
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className='actions-buttons-host'>
            {/* Accept Button */}
            <button
            className={`accept-button ${row.original.status === 'approved' || row.original.status === 'rejected' ? 'disabled' : ''}`}
            onClick={() => {
              if (row.original.status !== 'approved' && row.original.status !== 'rejected') {
                onAccept(row.original._id);
              }
            }}
            disabled={row.original.status === 'approved' || row.original.status === 'rejected'|| row.original.status === 'canceled'}
          >
            Accept
          </button>
          
      
            {/* Reject Button */}
            <button
            className={`reject-button ${row.original.status === 'approved' || row.original.status === 'rejected' ? 'disabled' : ''}`}
            onClick={() => {
              if (row.original.status !== 'approved' && row.original.status !== 'rejected') {
                onReject(row.original._id);
              }
            }}
            disabled={row.original.status === 'approved' || row.original.status === 'rejected' || row.original.status === 'canceled'}
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
