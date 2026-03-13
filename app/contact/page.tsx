"use client";
import { NavBar } from "@/components/NavBar";
import { formValidation } from "@/lib/schema/formValidation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string[];
    email?: string[];
    message?: string[];
  }>({});

  useEffect(() => {
    if (submitted) {
      toast.success("Message sent successfully!");
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    const validationResult = formValidation.safeParse(data);

    if (!validationResult.success) {
      setErrors(validationResult.error.flatten().fieldErrors);
      toast.error("Please fill out the form correctly");
      return;
    }

    setErrors({});
    e.currentTarget.reset();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-black font-sans">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-black">Contact Us</h2>

          {submitted && (
            <p className="text-green-500 text-lg font-semibold mt-4">
              Thank you for contacting us! We will get back to you soon.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div className="mb-4">
              {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
              <label htmlFor="name" className="block font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded-md"
              />
            </div>
            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              {errors.message && (
                <p className="text-red-500">{errors.message[0]}</p>
              )}
              <label htmlFor="message" className="block font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>
            <button
              id="submit"
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
