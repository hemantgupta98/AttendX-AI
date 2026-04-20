"use client";

import { Download, Calendar, Info, ArrowUpRight } from "lucide-react";

export default function SalaryOverviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Salary Overview</h1>
            <p className="text-gray-500 text-sm">
              Review your compensation details and download historical payslips.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm bg-white">
              <Calendar size={16} />
              October 2024
            </button>
            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
              <Download size={16} />
              Download Payslip
            </button>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-3 gap-6">
          {/* Salary Card */}
          <div className="col-span-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl p-6 flex justify-between">
            <div>
              <p className="text-sm opacity-80">Net Pay Payable</p>
              <h2 className="text-4xl font-bold mt-2">$4,920.00</h2>
              <p className="text-sm mt-2 opacity-80">
                Credited on Oct 31, 2024
              </p>
            </div>

            <div className="bg-white text-gray-700 rounded-xl p-4 w-60">
              <p className="text-sm flex justify-between">
                Gross Pay <span>$6,050.00</span>
              </p>
              <p className="text-sm flex justify-between text-red-500 mt-2">
                Deductions <span>-$1,130.00</span>
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                  Paid
                </span>
                <button className="text-xs text-purple-600">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">YTD Earnings</p>
              <h3 className="text-xl font-semibold text-purple-600 mt-2">
                $54,200.00
              </h3>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="mt-2 text-sm">JPMorgan Chase</p>
              <p className="text-xs text-gray-400">**** 8842</p>
              <button className="text-purple-600 text-xs mt-2">
                Change Bank Details
              </button>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-semibold">Detailed Breakdown</h2>
              <p className="text-sm text-gray-500">
                Calculation for Oct 1 - Oct 31, 2024
              </p>
            </div>
            <button className="text-sm border px-3 py-1 rounded-lg">
              Understanding My Payslip
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Earnings */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Earnings</h3>

              {[
                ["Base Salary", "$4,500.00"],
                ["House Rent Allowance", "$800.00"],
                ["Conveyance Allowance", "$250.00"],
                ["Performance Bonus", "$500.00"],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="flex justify-between py-2 border-b text-sm"
                >
                  <span className="flex items-center gap-1">
                    {label} <Info size={12} />
                  </span>
                  <span className="font-medium">+{value}</span>
                </div>
              ))}

              <div className="flex justify-between mt-4 font-semibold">
                <span>Total Earnings</span>
                <span>$6,050.00</span>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <h3 className="text-sm font-semibold mb-4 text-red-500">
                Deductions
              </h3>

              {[
                ["Provident Fund", "$540.00"],
                ["Professional Tax", "$20.00"],
                ["Health Insurance", "$120.00"],
                ["Income Tax (TDS)", "$450.00"],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="flex justify-between py-2 border-b text-sm"
                >
                  <span className="flex items-center gap-1">
                    {label} <Info size={12} />
                  </span>
                  <span className="text-red-500 font-medium">-{value}</span>
                </div>
              ))}

              <div className="flex justify-between mt-4 font-semibold text-red-500">
                <span>Total Deductions</span>
                <span>-$1,130.00</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Notice a discrepancy? Submit within 5 business days.
            </p>
            <button className="border border-red-300 text-red-500 px-4 py-2 rounded-lg text-sm">
              Request Correction
            </button>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border-4 border-purple-200 text-purple-600 font-semibold">
              98%
            </div>
            <div>
              <h3 className="font-medium">Attendance Impact</h3>
              <p className="text-sm text-gray-500">
                No loss of pay applied this month.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-medium">Tax Declaration</h3>
              <p className="text-sm text-gray-500">
                Update your declarations to optimize TDS.
              </p>
              <button className="text-purple-600 text-sm mt-1">
                Update Declarations
              </button>
            </div>
            <ArrowUpRight className="text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
