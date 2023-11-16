import React, { useState } from 'react';
import { Table, FormControl, Button } from 'react-bootstrap';
import './ResizableReorderableTable.css';

const ResizableReorderableTable = () => {
  const [columns, setColumns] = useState([
    { name: 'ID', resizable: true, reorderable: true, sortable: true, width: 'auto', visible: true, searchQuery: '' },
    { name: 'Name', resizable: true, reorderable: true, sortable: true, width: 'auto', visible: true, searchQuery: '' },
    { name: 'Age', resizable: true, reorderable: true, sortable: true, width: 'auto', visible: true, searchQuery: '' },
    { name: 'City', resizable: true, reorderable: true, sortable: true, width: 'auto', visible: true, searchQuery: '' },
    { name: 'Country', resizable: true, reorderable: true, sortable: true, width: 'auto', visible: true, searchQuery: '' },
  ]);

  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 30, city: 'New York', country: 'USA' },
    { id: 2, name: 'Jane Doe', age: 25, city: 'London', country: 'UK' },
    { id: 3, name: 'Bob Smith', age: 35, city: 'Paris', country: 'France' },
    { id: 4, name: 'Alice Johnson', age: 28, city: 'Berlin', country: 'Germany' },
    { id: 5, name: 'Charlie Brown', age: 40, city: 'Tokyo', country: 'Japan' },
    { id: 6, name: 'Eva Martinez', age: 32, city: 'Sydney', country: 'Australia' },
    { id: 7, name: 'David Kim', age: 45, city: 'Seoul', country: 'South Korea' },
    { id: 8, name: 'Fiona Johnson', age: 28, city: 'Berlin', country: 'Germany' },
    { id: 9, name: 'George White', age: 33, city: 'Los Angeles', country: 'USA' },
    { id: 10, name: 'Helen Brown', age: 29, city: 'Tokyo', country: 'Japan' },
    { id: 11, name: 'Ivan Rodriguez', age: 37, city: 'Madrid', country: 'Spain' },
    { id: 12, name: 'Jackie Chan', age: 55, city: 'Beijing', country: 'China' },
    { id: 13, name: 'Katherine Smith', age: 31, city: 'London', country: 'UK' },
    { id: 14, name: 'Leonardo Da Vinci', age: 507, city: 'Florence', country: 'Italy' },
    { id: 15, name: 'Mary Johnson', age: 42, city: 'New York', country: 'USA' },
    { id: 16, name: 'Nathan Williams', age: 36, city: 'Sydney', country: 'Australia' },
    { id: 17, name: 'Olivia Brown', age: 27, city: 'Paris', country: 'France' },
    { id: 18, name: 'Amit Patel', age: 28, city: 'Mumbai', country: 'India' },
    { id: 19, name: 'Neha Gupta', age: 26, city: 'Lucknow', country: 'India' },
    { id: 20, name: 'Vikas Kumar', age: 35, city: 'Chennai', country: 'India' },
    { id: 21, name: 'Sandeep Reddy', age: 42, city: 'Bangalore', country: 'India' },
    { id: 22, name: 'Arun Khanna', age: 33, city: 'Ahmedabad', country: 'India' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleResize = (columnIndex, newSize) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns[columnIndex].width = newSize;
      return updatedColumns;
    });
  };

  const handleReorder = (sourceIndex, destinationIndex) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      const [movedColumn] = updatedColumns.splice(sourceIndex, 1);
      updatedColumns.splice(destinationIndex, 0, movedColumn);
      return updatedColumns;
    });
  };

  const handleIndividualSearch = (event, columnName) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery('');
    setCurrentPage(1);

    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) => {
        if (column.name.toLowerCase() === columnName.toLowerCase()) {
          return {
            ...column,
            searchQuery: value,
          };
        }
        return column;
      });

      return updatedColumns;
    });
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
    setCurrentPage(1);
  };

  const handleToggleColumn = (columnIndex) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns[columnIndex].visible = !updatedColumns[columnIndex].visible;
      return updatedColumns;
    });
  };

  // const handleGlobalSearch = (event) => {
  //   const value = event.target.value.toLowerCase();
  //   setSearchQuery(value);
  //   setCurrentPage(1);

  //   setColumns((prevColumns) => {
  //     const updatedColumns = prevColumns.map((column) => ({
  //       ...column,
  //       searchQuery: '',
  //     }));

  //     return updatedColumns;
  //   });
  // };

  const filteredData = data.filter((row) => {
    return columns.every((column) => {
      const columnValue = String(row[column.name.toLowerCase()]).toLowerCase();
      return columnValue.includes(column.searchQuery);
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const keyA = a[sortConfig.key];
    const keyB = b[sortConfig.key];

    if (keyA < keyB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (keyA > keyB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = sortedData.slice(startIndex, endIndex);

  return (
    <div className='main-container'>
      {/* <FormControl
        type="text"
        placeholder="Global Search"
        className="mb-3"
        value={searchQuery}
        onChange={handleGlobalSearch}
      /> */}
      <Table className='mytable' striped bordered style={{ border: '1px solid #dee2e6' }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  width: column.width,
                  border: '1px solid #dee2e6',
                  textAlign: 'center',
                }}
                className={`${
                  column.resizable ? 'resizable' : ''
                } ${column.reorderable ? 'reorderable' : ''}`}
                draggable={column.reorderable}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', '');
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('text', index);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const sourceIndex = parseInt(
                    e.dataTransfer.getData('text'),
                    10
                  );
                  handleReorder(sourceIndex, index);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={column.visible}
                    onChange={() => handleToggleColumn(index)}
                  />
                  <span style={{ marginLeft: '5px' }}>
                    {column.sortable ? (
                      <span style={{display: 'flex', gap: "10px" , alignItems: 'center'}}>
                        {column.name}
                        <Button
                        className='btn-1'
                          variant="link"
                          onClick={() => handleSort(column.name.toLowerCase())}
                        >
                          Sort
                          {sortConfig.key === column.name.toLowerCase() && (
                            <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                          )}
                        </Button>
                        <FormControl
                          type="text"
                          placeholder={`Search ${column.name}`}
                          className="mb-3"
                          value={column.searchQuery}
                          onChange={(event) => handleIndividualSearch(event, column.name)}
                        />
                      </span>
                    ) : (
                      column.name
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  style={{
                    border: '1px solid #dee2e6',
                    padding: '8px',
                    textAlign: column.width === 'auto' ? 'center' : '',
                    visibility: column.visible ? 'visible' : 'collapse',
                  }}
                >
                  {row[column.name.toLowerCase()]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='pagination'>
        <Button
          className="pagination-button"
          variant="secondary"
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          className="pagination-button"
          style={{marginLeft:'8px'}}
          variant="secondary"
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ResizableReorderableTable;
