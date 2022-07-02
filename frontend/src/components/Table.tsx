import DataTable from "react-data-table-component";

interface TableProps {
  columns: any;
  data: any;
}
const Table = (props: TableProps) => {
  const { columns, data } = props;
  const customStyle = {
    headCell: {
      height: "1rem",
    },
    headRow: {
      style: {
        fontSize: "1rem",
        fontWeight: "bold",
        height: ".5rem",
        backgroud: "#f5f5f5",
        color: "#000",
      },
    },
    table: {
      style: {
        borderWidth: "1px",
        borderColor: "#f5f5f5",
        borderRadius: "5px",
      },
    },
  };
  return (
    <div className="card shadow-xl">
      <div className="overflow-x-auto">
        <div className="table w-full">
          <DataTable
            columns={columns}
            data={data}
            striped
            highlightOnHover
            persistTableHead
            fixedHeader
            fixedHeaderScrollHeight="600px"
            responsive
            pagination
            customStyles={customStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
