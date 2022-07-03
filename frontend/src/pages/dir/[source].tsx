import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import Table from "../../components/Table";
import { callAxios } from "../../plugins/axios.plugin";

interface DirectoryProps {
  directories: any;
}

const Directory = (props: DirectoryProps) => {
  const { query } = useRouter();
  const { directories } = props;

  const router = useRouter();

  const columns = [
    {
      name: "File Name",
      sortable: true,
      wrap: true,
      height: "fit-content",
      selector: (row: { name: string }) => row.name,
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
        <p className="badge badge-info badge-outline">{row.property.size}</p>
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
  ];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
      <div className="flex gap-8 items-center">
        <button onClick={() => router.back()} className="btn btn-info">
          Back
        </button>
        <p className="text-2xl font-bold leading-10 tracking-widest">
          Folders & files inside{" "}
          <span className="underline">{query.source}</span>
        </p>
      </div>
      <Table columns={columns} data={directories || []} />
    </div>
  );
};

export const getServerSideProps = async (req: any) => {
  const { source } = req.query;
  const res: any = await callAxios({
    method: "GET",
    url: `files/directories/${source}`,
  });

  return {
    props: {
      directories: res?.directories || [],
    },
  };
};

export default Directory;
