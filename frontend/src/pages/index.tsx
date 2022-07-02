import moment from "moment";
import Link from "next/link";
import Table from "../components/Table";
import { callAxios } from "../plugins/axios.plugin";

interface HomeProps {
  files: any;
}
const Home = (props: HomeProps) => {
  const { files } = props;
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

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
      <div>
        <p className="text-2xl font-bold leading-10 tracking-widest">
          File system from your computer
        </p>
      </div>
      <Table columns={columns} data={files || []} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const res: any = await callAxios({
    method: "GET",
    url: "files",
  });

  return {
    props: {
      files: res?.data?.files || [],
    },
  };
};

export default Home;
