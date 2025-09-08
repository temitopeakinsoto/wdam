import Link from "next/link";
import { Button } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md w-full space-y-8">
          <div className="space-y-4">
            <p className="text-lg text-gray-600 leading-relaxed">
              User and Post Management System
            </p>
            <p className="text-sm text-gray-500">
              Manage users and their posts with ease
            </p>
          </div>

          <div className="pt-6">
            <Link href="/users" className="inline-block">
              <Button size="lg" className="w-full sm:w-auto">
                View Users
              </Button>
            </Link>
          </div>

          <div className="pt-4 text-xs text-gray-400">
            Built with Next.js, React Query, and Tailwind CSS
          </div>
        </div>
      </div>
    </div>
  );
}
