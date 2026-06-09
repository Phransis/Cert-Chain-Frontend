"use client";

import { useState, useMemo, useEffect } from "react";
import FileUploadDropZone from "./FileUploadDropZone";
import { backend } from "@/app/services/backend-helpers";

type Student = {
  student_id: string;
  student_name: string;
  graduation_year: number;
  degree_name: string;
  status: string;
  created_at: string;
  walletAddress?: string;
};

type IssueCertificateProps = {
  onFileSelect?: (file: File) => void;
};

const mockStudents: Student[] = [
  {
    student_id: "STU-2024-001234",
    student_name: "Alice Johnson",
    graduation_year: 2024,
    degree_name: "Bachelor of Science",
    status: "Active",
    created_at: "2023-10-01T00:00:00Z",
    walletAddress: "0x1234567890123456789012345678901234567890",
  },
  {
    student_id: "STU-2024-001235",
    student_name: "Bob Smith",
    graduation_year: 2024,
    degree_name: "Master of Arts",
    status: "Active",
    created_at: "2023-10-01T00:00:00Z",
    walletAddress: "0x0987654321098765432109876543210987654321",
  },
  {
    student_id: "STU-2024-001235",
    student_name: "Bob Smith",
    graduation_year: 2024,
    degree_name: "Master of Arts",
    status: "Active",
    created_at: "2023-10-01T00:00:00Z",
    walletAddress: "0x0987654321098765432109876543210987654321",
  },
  {
    student_id: "STU-2024-001236",
    student_name: "Carol Davis",
    graduation_year: 2023,
    degree_name: "Bachelor of Arts",
    status: "Active",
    created_at: "2023-10-01T00:00:00Z",
    walletAddress: "0x111111111111111111111111111111111111111１",
  },
  {
    student_id: "STU-2024-001237",
    student_name: "David Wilson",
    graduation_year: 2024,
    degree_name: "Master of Science",
    status: "Active",
    created_at: "2023-10-01T00:00:00Z",
    walletAddress: "0x22222222222222222222222222222222222222２",
  },
  {
    student_id: "STU-2024-001238",
    student_name: "Emma Martinez",
    graduation_year: 2024,
    degree_name: "PhD in Computer Science",
    status: "Active",
    created_at: "2023-10-01T00:00:00Z",
    walletAddress: "0x333333333333333333333333333333333333333３",
  },
  {
    student_id: "STU-2024-001239",
    student_name: "Frank Brown",
    graduation_year: 2025,
    degree_name: "Bachelor of Engineering",
    status: "Active",
    created_at: "2023-10-01T00:00:00Z",
    walletAddress: "0x444444444444444444444444444444444444444４",
  },
  {
    student_id: "STU-2024-001240",
    student_name: "Grace Lee",
    graduation_year: 2024,
    degree_name: "Master of Business Administration",
    status: "Active",
    created_at: "2023-10-01T00:00:00Z",
    walletAddress: "0x555555555555555555555555555555555555555５",
  },
  {
    student_id: "STU-2024-001241",
    student_name: "Henry Taylor",
    graduation_year: 2023,
    degree_name: "Bachelor of Science",
    status: "Active",
    created_at: "2023-10-01T00:00:00Z",
    walletAddress: "0x666666666666666666666666666666666666666６",
  },
];

function normalizeStudent(item: any): Student | null {
  if (!item) return null;

  const studentId =
    item.student_id ||
    item.studentId ||
    item.id ||
    item.studentId?.toString?.() ||
    "";
  if (!studentId) return null;

  return {
    student_id: studentId,
    student_name:
      item.student_name ||
      item.name ||
      item.full_name ||
      item.studentName ||
      "Unknown Student",
    graduation_year:
      Number(item.graduation_year ?? item.graduationYear ?? item.year ?? 0) ||
      0,
    degree_name:
      item.degree_name ||
      item.degree ||
      item.degreeName ||
      item.degreeType ||
      "Unknown Degree",
    status: item.status || "",
    created_at:
      item.created_at ||
      item.created ||
      item.timestamp ||
      new Date().toISOString() ||
      "",
    walletAddress:
      item.wallet_address || item.walletAddress || item.wallet || "",
  };
}

export default function IssueCertificate({
  onFileSelect,
}: IssueCertificateProps) {
  const [studentIdInput, setStudentIdInput] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [studentFetchError, setStudentFetchError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      if (!studentIdInput.trim()) {
        setStudents([]);
        return;
      }
      setIsLoadingStudents(true);
      setStudentFetchError("");

      try {
        const response = await backend.get(
          `students/${studentIdInput}/certificates`,
        );
        const payload = response.data;
        console.log("Fetched students:", payload);
        const studentList: any[] = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.students)
            ? payload.students
            : [];

        const normalizedStudents = studentList
          .map(normalizeStudent)
          .filter((item): item is Student => item !== null);

        if (normalizedStudents.length > 0) {
          setStudents(normalizedStudents);
        }
      } catch (error: any) {
        console.error("Failed fetching students:", error);
        setStudentFetchError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to load student data.",
        );
      } finally {
        setIsLoadingStudents(false);
      }
    };

    fetchStudents();
  }, [studentIdInput]);

  const filteredStudents = useMemo(() => {
    if (!studentIdInput.trim()) return [];
    return students.filter((student) =>
      student.student_id.toLowerCase().includes(studentIdInput.toLowerCase()),
    );
  }, [studentIdInput, students]);

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setStudentIdInput(student.student_id);
    setShowSuggestions(false);
  };

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    onFileSelect?.(file);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="space-y-6">
          {/* Student ID Search with Autocomplete */}
          <div className="relative">
            <label className="block text-sm font-semibold text-zinc-900 mb-2">
              Student ID
            </label>
            <input
              type="text"
              placeholder="Enter Student ID (e.g., STU-2024-001234)"
              value={studentIdInput}
              onChange={(e) => {
                setStudentIdInput(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 placeholder-zinc-400 focus:border-orange-500 focus:outline-none"
            />

            {isLoadingStudents ? (
              <p className="mt-2 text-sm text-zinc-500">
                Loading student data…
              </p>
            ) : studentFetchError ? (
              <p className="mt-2 text-sm text-red-600">{studentFetchError}</p>
            ) : null}

            {/* Autocomplete Dropdown */}
            {showSuggestions && filteredStudents.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-64 overflow-y-auto rounded-lg border border-zinc-200 bg-white shadow-lg">
                {filteredStudents.map((student) => (
                  <button
                    key={student.student_id}
                    onClick={() => handleSelectStudent(student)}
                    className="w-full border-b border-zinc-100 px-4 py-3 text-left transition hover:bg-zinc-50 last:border-0"
                  >
                    <div className="font-semibold text-zinc-900">
                      {student.student_id}
                    </div>
                    <div className="text-sm text-zinc-600">
                      {student.student_name}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Graduation Year */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-2">
              Graduation Year
            </label>
            <input
              type="number"
              placeholder="e.g., 2024"
              value={selectedStudent?.graduation_year || ""}
              readOnly
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 bg-zinc-50 placeholder-zinc-400 focus:outline-none cursor-not-allowed"
            />
          </div>

          {/* Degree Type */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-2">
              Degree Type
            </label>
            <input
              type="text"
              placeholder="Select a student first"
              value={selectedStudent?.degree_name || ""}
              readOnly
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 bg-zinc-50 placeholder-zinc-400 focus:outline-none cursor-not-allowed"
            />
          </div>

          {/* Department */}
          {selectedStudent && (
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-2">
                Status
              </label>
              <input
                type="text"
                value={selectedStudent.status || "N/A"}
                readOnly
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 bg-zinc-50 placeholder-zinc-400 focus:outline-none cursor-not-allowed"
              />
            </div>
          )}

          {/* Student Email */}
          {selectedStudent && (
            <>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Degree Name
                </label>
                <input
                  type="text"
                  value={selectedStudent.degree_name}
                  readOnly
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2 bg-zinc-50 placeholder-zinc-400 focus:outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={selectedStudent.walletAddress || "No wallet address"}
                  readOnly
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2 bg-zinc-50 placeholder-zinc-400 focus:outline-none cursor-not-allowed"
                />
              </div>
            </>
          )}

          <button
            disabled={!selectedStudent || !uploadedFile}
            className="w-full rounded-lg bg-[var(--button-bg)] px-4 py-3 font-semibold text-white transition hover:bg-[var(--button-bg-hover)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate & Sign Transaction
          </button>
        </div>

        {/* File Upload */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-zinc-900">
            Upload Certificate (PDF)
          </label>
          <FileUploadDropZone
            onFileSelect={handleFileSelect}
            accepts=".pdf"
            label="Upload Certificate"
          />
          {uploadedFile && (
            <div className="rounded-lg bg-green-50 p-4 text-sm">
              <p className="font-medium text-green-900">✓ File ready</p>
              <p className="text-green-700">{uploadedFile.name}</p>
            </div>
          )}

          {/* Student Summary */}
          {selectedStudent && (
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                Selected Student
              </h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {selectedStudent.student_name}
                </p>
                <p>
                  <span className="font-medium">ID:</span>{" "}
                  {selectedStudent.student_id}
                </p>
                <p>
                  <span className="font-medium">Degree:</span>{" "}
                  {selectedStudent.degree_name}
                </p>
                <p>
                  <span className="font-medium">Graduation:</span>{" "}
                  {selectedStudent.graduation_year}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {selectedStudent.walletAddress || "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
