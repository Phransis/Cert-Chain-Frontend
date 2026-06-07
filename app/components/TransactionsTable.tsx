"use client";

import { useState } from "react";

type Transaction = {
  studentId: string;
  degree: string;
  status: "Active" | "Pending" | "Revoked";
  date: string;
};

type TransactionsTableProps = {
  itemsPerPage?: number;
  title?: string;
};

const mockTransactions: Transaction[] = [
  {
    studentId: "STU-2024-001234",
    degree: "Bachelor of Science",
    status: "Active",
    date: "2024-06-01",
  },
  {
    studentId: "STU-2024-001235",
    degree: "Master of Arts",
    status: "Pending",
    date: "2024-06-02",
  },
  {
    studentId: "STU-2024-001236",
    degree: "Bachelor of Arts",
    status: "Revoked",
    date: "2024-05-15",
  },
  {
    studentId: "STU-2024-001237",
    degree: "Master of Science",
    status: "Active",
    date: "2024-06-03",
  },
  {
    studentId: "STU-2024-001238",
    degree: "PhD in Computer Science",
    status: "Active",
    date: "2024-06-04",
  },
  {
    studentId: "STU-2024-001239",
    degree: "Bachelor of Engineering",
    status: "Pending",
    date: "2024-06-05",
  },
  {
    studentId: "STU-2024-001240",
    degree: "Master of Business Administration",
    status: "Active",
    date: "2024-06-06",
  },
  {
    studentId: "STU-2024-001241",
    degree: "Bachelor of Science",
    status: "Revoked",
    date: "2024-05-20",
  },
  {
    studentId: "STU-2024-001242",
    degree: "Bachelor of Arts",
    status: "Active",
    date: "2024-06-07",
  },
  {
    studentId: "STU-2024-001243",
    degree: "Master of Arts",
    status: "Pending",
    date: "2024-06-08",
  },
];

const getStatusStyles = (status: Transaction["status"]) => {
  const styles = {
    Active:
      "inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700",
    Pending:
      "inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700",
    Revoked:
      "inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700",
  };
  return styles[status];
};

export default function TransactionsTable({
  itemsPerPage: initialItemsPerPage = 5,
  title = "Recent Transactions",
}: TransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(mockTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = mockTransactions.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      1,
      Math.min(mockTransactions.length, Number(e.target.value) || 1),
    );
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900">{title}</h3>
        <div className="flex items-center gap-2">
          <label htmlFor="items-per-page" className="text-sm text-zinc-600">
            Items per page:
          </label>
          <input
            id="items-per-page"
            type="number"
            min="1"
            max={mockTransactions.length}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="w-16 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
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
            {currentTransactions.map((transaction, index) => (
              <tr
                key={`${transaction.studentId}-${index}`}
                className="border-b border-zinc-100"
              >
                <td className="px-4 py-3 font-mono text-zinc-700">
                  {transaction.studentId}
                </td>
                <td className="px-4 py-3">{transaction.degree}</td>
                <td className="px-4 py-3">
                  <span className={getStatusStyles(transaction.status)}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-600">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-zinc-600">
          Page {currentPage} of {totalPages} ({mockTransactions.length} total
          records)
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
