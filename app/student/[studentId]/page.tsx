"use client";

import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { backend } from "@/app/services/backend-helpers";
import { WalletContext } from "@/app/components/WalletProvider";
import Link from "next/link";

type StudentDetails = {
  studentId: string;
  name: string;
  graduationYear: number;
  degreeType: string;
  email: string;
  department: string;
  walletAddress?: string;
};

type Certificate = {
  certificateId: string;
  status: string;
  degree: string;
  issuedAt: string;
};

function normalizeStudent(item: any): StudentDetails | null {
  if (!item) return null;

  const studentId =
    item.student_id ||
    item.studentId ||
    item.id ||
    item.studentId?.toString?.();
  if (!studentId) return null;

  return {
    studentId,
    name: item.name || item.full_name || item.studentName || "Unknown",
    graduationYear:
      Number(item.graduation_year ?? item.graduationYear ?? item.year ?? 0) ||
      0,
    degreeType: item.degree_type || item.degreeType || item.degree || "Unknown",
    email: item.email || item.email_address || "",
    department: item.department || item.major || "",
    walletAddress:
      item.wallet_address || item.walletAddress || item.wallet || "",
  };
}

function normalizeCertificate(item: any): Certificate {
  return {
    certificateId: item.certificate_id || item.id || item.hash || "",
    status: item.status || item.certificate_status || "Unknown",
    degree: item.degree || item.degree_type || item.degree_name || "Unknown",
    issuedAt:
      item.issued_at || item.created_at || item.timestamp || item.date || "",
  };
}

export default function StudentDetailsPage() {
  const params = useParams();
  const rawStudentId = Array.isArray(params?.studentId)
    ? params.studentId[0]
    : params?.studentId;
  const studentId = rawStudentId || "";

  const { connected } = useContext(WalletContext);
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) return;
      setIsLoading(true);
      setError("");

      try {
        const [studentResponse, certResponse] = await Promise.all([
          backend.get(`students/${encodeURIComponent(studentId)}`),
          backend.get("certificates", {
            params: { student_id: studentId },
          }),
        ]);

        setStudent(normalizeStudent(studentResponse.data));

        const payload = certResponse.data;
        const certItems = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : payload.data || [];

        setCertificates(
          (certItems as any[])
            .map(normalizeCertificate)
            .filter((item) => Boolean(item.certificateId)),
        );
      } catch (err: any) {
        console.error("Failed to load student details:", err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load student details.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (!connected) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-white to-zinc-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">
              🔒
            </div>
            <h1 className="text-3xl font-semibold text-zinc-950">
              Wallet Required
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Connect your Stellar wallet to view student details.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-zinc-950">
              Student Details
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              Details for student {studentId} and their related certificates.
            </p>
          </div>
          <Link
            href="/university/total-issued"
            className="inline-flex rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
          >
            Back to Certificates
          </Link>
        </div>

        {isLoading ? (
          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 text-blue-700">
            Loading student information...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700">
            {error}
          </div>
        ) : !student ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-zinc-700">
            Student information could not be found.
          </div>
        ) : (
          <div className="space-y-8">
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-zinc-500">
                    Student ID
                  </p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900">
                    {student.studentId}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">Name</p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900">
                    {student.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">Degree</p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900">
                    {student.degreeType}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">
                    Department
                  </p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900">
                    {student.department}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">
                    Graduation Year
                  </p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900">
                    {student.graduationYear}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">
                    Wallet Address
                  </p>
                  <p className="mt-2 break-words text-lg font-semibold text-zinc-900">
                    {student.walletAddress || "Not provided"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-semibold text-zinc-500">Email</p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900">
                    {student.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-950">
                    Student Certificates
                  </h2>
                  <p className="mt-2 text-sm text-zinc-600">
                    {certificates.length} certificate(s) linked to this student.
                  </p>
                </div>
              </div>

              {certificates.length === 0 ? (
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 text-zinc-600">
                  No certificates were found for this student.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200">
                        <th className="px-4 py-3 font-semibold">
                          Certificate ID
                        </th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Degree</th>
                        <th className="px-4 py-3 font-semibold">Issued At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((certificate) => (
                        <tr
                          key={certificate.certificateId}
                          className="border-b border-zinc-100"
                        >
                          <td className="px-4 py-3 font-mono text-zinc-700">
                            {certificate.certificateId}
                          </td>
                          <td className="px-4 py-3 text-zinc-700">
                            {certificate.status}
                          </td>
                          <td className="px-4 py-3">{certificate.degree}</td>
                          <td className="px-4 py-3 text-zinc-600">
                            {certificate.issuedAt
                              ? new Date(
                                  certificate.issuedAt,
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
