import moment from "moment";
import Link from "next/link";
import { useQuery } from "react-query";
import Table from "../components/Table";
import { callAxios } from "../plugins/axios.plugin";

const Home = () => {
  const { isLoading, error, data } = useQuery(
    "repoData",
    async () =>
      await callAxios({
        method: "GET",
        url: "files",
      })
  );

  console.log("the data are", data);

  const columns = [
    {
      name: "File Name",
      sortable: true,
      wrap: true,
      height: "fit-content",
      selector: (row: { file: string }) => row.file,
    },
    {
      name: "Type",
      sortable: true,
      cell: (row: { type: string }) => (
        <p className="badge badge-info badge-outline">{row.type}</p>
      ),
    },
    {
      name: "Size",
      sortable: true,
      cell: (row: { property: { size: string } }) => (
        <p className="badge badge-info badge-outline">{row.property.size} KB</p>
      ),
    },
    {
      name: "Modified",
      sortable: true,
      cell: (row: any) => {
        return <p>{moment(row.property.mtime).format("MMM DD, YYYY")}</p>;
      },
    },
    {
      name: "Birth Time",
      sortable: true,
      cell: (row: any) => (
        <p>{moment(row.property.birthtime).format("MMM DD, YYYY")}</p>
      ),
    },
    {
      name: "Action",
      sortable: true,
      cell: (row: { type: string; file: string }) => (
        <div>
          {row.type === "directory" ? (
            <Link href={`/dir/${row.file}`} passHref>
              <button className="btn btn-sm btn-info">View Details</button>
            </Link>
          ) : null}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
      <div>
        <p className="text-2xl font-bold leading-10 tracking-widest">
          File system from your computer
        </p>
      </div>
      <Table columns={columns} data={data.files || []} />
    </div>
  );
};
export default Home;
