import Image from "next/image";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex flex-col gap-5 items-center justify-center">
        <Image
          src="/logo-pajm.jpg"
          alt="Logo PAJM"
          width={150}
          height={150}
          className="rounded-full mt-4"
        />
        <h1 className="text-xl font-bold">PAJM Work Management System</h1>

        <div className="w-full border-t border-black"></div>
      </div>

      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
