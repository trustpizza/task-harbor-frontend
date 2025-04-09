import { useState, useEffect } from "react";

const ColumnManager = ({ objects, objectLocalStorageKey, children }) => {
  const defaultColumns = [
    {
      id: "overdue",
      name: "Overdue",
      filter: {
        attribute: "dueDate",
        operator: "<",
        value: new Date().toISOString(),
      },
    },
    {
      id: "on-track",
      name: "On Track",
      filter: {
        attribute: "dueDate",
        operator: ">=",
        value: new Date().toISOString(),
      },
    },
    {
      id: "upcoming",
      name: "Upcoming",
      filter: {
        attribute: "dueDate",
        operator: ">",
        value: new Date().toISOString(),
      },
    },
    {
      id: "uncategorized",
      name: "Uncategorized",
      filter: { attribute: null, operator: null, value: null },
    },
  ];

  const [columns, setColumns] = useState(() => {
    const stored = localStorage.getItem(objectLocalStorageKey);
    return stored ? JSON.parse(stored) : defaultColumns;
  });

  // 🔄 Sync with localStorage whenever `columns` changes
  useEffect(() => {
    localStorage.setItem(objectLocalStorageKey, JSON.stringify(columns));
  }, [columns, objectLocalStorageKey]);

  const addColumn = (newColumn) => {
    setColumns((prev) => [
      ...prev,
      {
        id: newColumn.name.toLowerCase().replace(/\s+/g, "-"),
        ...newColumn,
      },
    ]);
  };

  const deleteColumn = (columnId) => {
    if (columnId === "uncategorized") return;

    setColumns((prev) => prev.filter((column) => column.id !== columnId));
  };

  const filteredObjects = objects.map((object) => {
    const column = columns.find((col) => {
      if (!col.filter.attribute) return true;
      const objectValue = new Date(object[col.filter.attribute]);
      const filterValue = new Date(col.filter.value);

      switch (col.filter.operator) {
        case "=":
          return objectValue.getTime() === filterValue.getTime();
        case "<":
          return objectValue < filterValue;
        case ">":
          return objectValue > filterValue;
        case ">=":
          return objectValue >= filterValue;
        case "<=":
          return objectValue <= filterValue;
        default:
          return false;
      }
    });

    return {
      id: object.id,
      value: object.name,
      field_definition_id: column ? column.id : "uncategorized",
    };
  });

  return children({
    columns,
    values: filteredObjects,
    addColumn,
    deleteColumn,
  });
};

export default ColumnManager;
