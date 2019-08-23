import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const sortColumn = { ...this.props.sortColumn };
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return "fa fa-sort-asc";
    return "fa fa-sort-desc";
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} <i className={this.renderSortIcon(column)} />
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;