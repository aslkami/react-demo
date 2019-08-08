import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (rowData, col) => {
    if (col.content) {
      return col.content(rowData);
    }

    return _.get(rowData, col.path);
  };

  createKey = (row, col) => {
    return row._id + (col.path || col.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(row => (
          <tr key={row._id}>
            {columns.map(col => (
              <td key={this.createKey(row, col)}>
                {this.renderCell(row, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
