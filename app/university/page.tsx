"use client";

import { useState } from "react";
import Card from "../components/Card";
import FileUploadDropZone from "../components/FileUploadDropZone";

export default function UniversityPortal() {
  const [activeTab, setActiveTab] = useState<"issue" | "batch" | "dashboard">(
    "dashboard",
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-2 text-4xl font-bold text-zinc-950">
            University Portal
          </h1>
          <p className="text-lg text-zinc-600">
            Issue and manage certificate hashes on the Stellar blockchain
          </p>
        </div>

        {/* Authentication Section */}
        <div className="mb-12 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">
              🔐
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">
                Wallet Connection Required
              </h3>
              <p className="mt-1 text-sm text-blue-800">
                Connect your Stellar wallet to authenticate as an authorized
                university issuer.
              </p>
              <button className="mt-3 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-zinc-200">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "dashboard"
                ? "border-b-2 border-orange-600 text-orange-600"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("issue")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "issue"
                ? "border-b-2 border-orange-600 text-orange-600"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Issue Certificate
          </button>
          <button
            onClick={() => setActiveTab("batch")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "batch"
                ? "border-b-2 border-orange-600 text-orange-600"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Batch Upload
          </button>
        </div>

        {/* Issue Single Certificate */}
        {activeTab === "issue" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., STU-2024-001234"
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2 placeholder-zinc-400 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-2">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 2024"
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2 placeholder-zinc-400 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-2">
                    Degree Type
                  </label>
                  <select className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-orange-500 focus:outline-none">
                    <option>Bachelor of Science</option>
                    <option>Bachelor of Arts</option>
                    <option>Master of Science</option>
                    <option>Master of Arts</option>
                    <option>PhD</option>
                  </select>
                </div>

                <button className="w-full rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700">
                  Generate & Sign Transaction
                </button>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-zinc-900">
                  Upload Certificate (PDF)
                </label>
                <FileUploadDropZone
                  onFileSelect={(file) => setUploadedFile(file)}
                  accepts=".pdf"
                  label="Upload Certificate"
                />
                {uploadedFile && (
                  <div className="rounded-lg bg-green-50 p-4 text-sm">
                    <p className="font-medium text-green-900">✓ File ready</p>
                    <p className="text-green-700">{uploadedFile.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Batch Upload */}
        {activeTab === "batch" && (
          <div className="space-y-6">
            <div className="rounded-lg border border-zinc-200 bg-white p-6">
              <h3 className="mb-4 font-semibold text-zinc-900">
                CSV Format Requirements
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="px-4 py-2 font-semibold">Column</th>
                      <th className="px-4 py-2 font-semibold">Example</th>
                      <th className="px-4 py-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100">
                      <td className="px-4 py-2 font-mono text-orange-600">
                        student_id
                      </td>
                      <td className="px-4 py-2">STU-2024-001234</td>
                      <td className="px-4 py-2 text-zinc-600">
                        Unique student identifier
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="px-4 py-2 font-mono text-orange-600">
                        graduation_year
                      </td>
                      <td className="px-4 py-2">2024</td>
                      <td className="px-4 py-2 text-zinc-600">
                        Year of graduation
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-orange-600">
                        degree_type
                      </td>
                      <td className="px-4 py-2">Bachelor of Science</td>
                      <td className="px-4 py-2 text-zinc-600">
                        Type of degree awarded
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-zinc-900">
                Upload CSV File
              </label>
              <FileUploadDropZone
                onFileSelect={(file) => setUploadedFile(file)}
                accepts=".csv"
                label="Upload CSV"
              />
              {uploadedFile && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-green-50 p-4 text-sm">
                    <p className="font-medium text-green-900">✓ File ready</p>
                    <p className="text-green-700">{uploadedFile.name}</p>
                  </div>
                  <button className="w-full rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700">
                    Process Batch Upload
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card
                title="Total Issued"
                description="156 "
                tags={["Issued"]}
              />
              <Card
                title="Pending"
                description="3 "
                tags={["Pending"]}
              />
              <Card
                title="Revoked"
                description="2 "
                tags={["Revoked"]}
              />
              <Card
                title="Active"
                description="151 "
                tags={["Active"]}
              />
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-6">
              <h3 className="mb-4 font-semibold text-zinc-900">
                Recent Transactions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="px-4 py-3 font-semibold">Student ID</th>
                      <th className="px-4 py-3 font-semibold">Degree</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100">
                      <td className="px-4 py-3 font-mono text-zinc-700">
                        STU-2024-001234
                      </td>
                      <td className="px-4 py-3">Bachelor of Science</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">2024-06-01</td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="px-4 py-3 font-mono text-zinc-700">
                        STU-2024-001235
                      </td>
                      <td className="px-4 py-3">Master of Arts</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Pending
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">2024-06-02</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-zinc-700">
                        STU-2024-001236
                      </td>
                      <td className="px-4 py-3">Bachelor of Arts</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Revoked
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">2024-05-15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
