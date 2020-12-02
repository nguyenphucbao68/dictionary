import React, { useState, useCallback, useMemo } from "react";
import differenceBy from "lodash/differenceBy";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { tableData } from "../../../data/dummyTableData";
import { Card, CardHeader, CardBody } from "reactstrap";

export const DataTables = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState(tableData);

  const tableColumns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
      center: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      center: true,
    },
    {
      name: "Creat_on",
      selector: "creat_on",
      sortable: true,
      center: true,
    },
  ];

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const contextActions = useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.name,
          )}?`,
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, "name"));
        toast.success("Successfully Deleted !");
      }
    };

    return (
      <button key="delete" className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    );
  }, [data, selectedRows, toggleCleared]);

  return (
    <>
      <Card>
        {/* <CardBody> */}
        <DataTable
          title="Example sentences"
          data={data}
          columns={tableColumns}
          striped={true}
          center={true}
          selectableRows
          persistTableHead
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
        {/* </CardBody> */}
      </Card>
      <style jsx global>{`
        html.color-1 .rdt_TableHeader > div:last-child {
          background-color: #eae8ff !important;
        }
      `}</style>
    </>
  );
};
