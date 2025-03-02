import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12 text-center">
         <h1 className="text-8xl font-extrabold text-indigo-600 mb-6">404</h1>
         <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! We Lost This Page
         </h2>
         <p className="text-lg text-gray-600 mb-8 max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. It looks like you took a wrong turn. Don&apos;t worry, you
            can easily get back on track!
         </p>
         <Link href="/">
            <Button className="px-6 py-3 text-lg">Go Back Home</Button>
         </Link>
         <p className="mt-6 text-sm text-gray-500">
            If you believe this is an error, please contact our support team.
         </p>
      </div>
   );
}
