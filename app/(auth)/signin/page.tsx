"use client";

import {
  useState,
  useTransition,
} from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<
    string | null
  >(null);
  const [isPending, startTransition] =
    useTransition();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(
      e.currentTarget,
    );
    const email = formData.get(
      "email",
    ) as string;
    const password = formData.get(
      "password",
    ) as string;

    startTransition(async () => {
      // Trigger NextAuth Sign In directly
      const result = await signIn(
        "credentials",
        {
          email,
          password,
          redirect: false,
        },
      );

      if (result?.error) {
        setError(
          "Invalid email or password.",
        );
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-2xl font-medium tracking-tight text-zinc-900">
          Sign in to Polypath
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          New here?{" "}
          <Link
            href="/signup"
            className="font-medium text-zinc-900 underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-zinc-200/60 sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                disabled={isPending}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                disabled={isPending}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm transition-colors disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-colors disabled:opacity-70"
            >
              {isPending
                ? "Signing in..."
                : "Sign in"}
            </button>
          </form>
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl:
                  "/dashboard",
              })
            }
            className="w-full flex justify-center py-2.5 px-4 border border-zinc-300 rounded-md bg-white text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
