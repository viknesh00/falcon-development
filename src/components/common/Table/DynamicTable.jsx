import React from 'react';
import styles from './styles/DynamicTable.module.css';
import PropTypes from 'prop-types';

/**
 * DynamicTable Component
 *
 * @param {Array} columns - Array of column definitions. Each object should have:
 *   - header: String (Header text)
 *   - key: String (Key to access data in row object)
 *   - render: Function (Optional custom render function: (row) => ReactNode)
 *   - className: String (Optional custom class for the cell)
 * @param {Array} data - Array of data objects
 * @param {String} title - Table title (optional)
 * @param {String} subtitle - Table subtitle/description (optional)
 * @param {Boolean} loading - Loading state (optional)
 * @param {String} emptyMessage - Message to display no data (optional)
 * @param {Function} onRowClick - Handler for row click: (row) => void (optional)
 */
const DynamicTable = ({
  columns,
  data,
  title,
  subtitle,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
}) => {
  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.headerContainer}>
          <div>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={col.headerClassName || ''}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className={styles.loadingContainer}>
                  Loading...
                </td>
              </tr>
            ) : data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((col, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`} className={col.className || ''}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.emptyContainer}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DynamicTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      key: PropTypes.string,
      render: PropTypes.func,
      className: PropTypes.string,
      headerClassName: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  onRowClick: PropTypes.func,
};

export default DynamicTable;
