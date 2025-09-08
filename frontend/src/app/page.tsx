import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      Welcome!
      <Link
        href={"/users"}
        className="bg-black border rounded-md  text-white py-1 px-4 hover:bg-gray-600"
      >
        Fetch Users
      </Link>
    </div>
  );
}
