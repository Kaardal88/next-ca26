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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
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
    <div className="flex min-h-screen flex-col items-center  bg-black font-sans ">
      <NavBar />
      <div className="min-h-screen flex-col items-center justify-center  max-w-5xl mx-auto w-full px-4 mt-50">
        <h1 className="text-3xl font-bold text-white mb-8 text-center py-8">
          Contact Us
        </h1>
        <h3 className="text-lg text-white mb-8 text-center">
          We would love to hear from you! Please fill out the form below and we
          will get back to you as soon as possible.
        </h3>
        <div className="bg-white/20 p-8 rounded-lg shadow-md flex flex-col justify-center w-full py-14">
          {submitted && (
            <p className="text-green-500 text-lg font-semibold mt-4">
              Thank you for contacting us! We will get back to you soon.
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-black flex flex-col w-full"
          >
            <div className="mb-4">
              {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
              <label htmlFor="name" className="block font-semibold text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border bg-gray-50 rounded-md"
              />
            </div>
            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border bg-gray-50 rounded-md"
              />
            </div>
            <div className="mb-4">
              {errors.message && (
                <p className="text-red-500">{errors.message[0]}</p>
              )}
              <label
                htmlFor="message"
                className="block font-semibold text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-2 border bg-gray-50 rounded-md"
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
