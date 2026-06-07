"use client";

import { useState } from "react";
import FileUploadDropZone from "@/app/components/FileUploadDropZone";
import { backend } from "@/app/services/backend-helpers";

export default function Register() {
  const [formValues, setFormValues] = useState({
    student_id: "",
    student_name: "",
    degree_name: "",
    graduation_year: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    if (!selectedFile) {
      setErrorMessage("Please upload a certificate file before registering.");
      return;
    }

    const formData = new FormData();
    formData.append("student_id", formValues.student_id);
    formData.append("student_name", formValues.student_name);
    formData.append("degree_name", formValues.degree_name);
    formData.append("graduation_year", formValues.graduation_year);
    formData.append("certificate_file", selectedFile);

    try {
      setIsSubmitting(true);
      const response = await backend.post("/certificates/process/", formData);
      console.log("Registration response:", response.data);
      setStatusMessage(
        response.data?.message || "Registration submitted successfully.",
      );
      setFormValues({
        student_id: "",
        student_name: "",
        degree_name: "",
        graduation_year: "",
      });
      setSelectedFile(null);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to submit registration.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Register</h1>
      <form
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-8"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="student_id"
          >
            Student ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="student_id"
            name="student_id"
            type="text"
            value={formValues.student_id}
            onChange={handleChange}
            placeholder="Student ID"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="student_name"
          >
            Student Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="student_name"
            name="student_name"
            type="text"
            value={formValues.student_name}
            onChange={handleChange}
            placeholder="Student Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="degree_name"
          >
            Degree Program
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="degree_name"
            name="degree_name"
            type="text"
            value={formValues.degree_name}
            onChange={handleChange}
            placeholder="Degree Program"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="graduation_year"
          >
            Graduation Year
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="graduation_year"
            name="graduation_year"
            type="text"
            value={formValues.graduation_year}
            onChange={handleChange}
            placeholder="Graduation Year"
          />
        </div>
        <div className="mb-4">
          <FileUploadDropZone
            onFileSelect={(file) => setSelectedFile(file)}
            accepts=".pdf,.doc,.docx"
            label="Upload Certificate File"
          />
          {selectedFile ? (
            <p className="mt-2 text-sm text-zinc-600">
              Selected file: {selectedFile.name}
            </p>
          ) : (
            <p className="mt-2 text-sm text-zinc-500">No file selected yet.</p>
          )}
        </div>
        {/* <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div> */}
        <div className="flex items-center justify-between">
          <button
            className="bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>

        {(statusMessage || errorMessage) && (
          <div className="mt-4 rounded-md border px-4 py-3 text-sm">
            {statusMessage ? (
              <p className="text-green-700">{statusMessage}</p>
            ) : (
              <p className="text-red-700">{errorMessage}</p>
            )}
          </div>
        )}

        <isSecureContext>
          <p className="text-gray-600 text-xs italic mt-4">
            Your information is secure with us.
          </p>
        </isSecureContext>
      </form>
    </div>
  );
}
