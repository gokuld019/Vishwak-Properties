"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Building2 } from "lucide-react";
import NumberFlow from "@number-flow/react";

// Load Chart dynamically (included inside same file)
const EChart = dynamic(
  () =>
    Promise.resolve(function EMIChart({ loan, rate, years }) {
      const emi = calculateEMI(loan, rate, years);
      const totalMonths = years * 12;
      const totalPayment = emi * totalMonths;
      const interest = totalPayment - loan;

      const ReactECharts = require("echarts-for-react").default;

      const option = {
        tooltip: { trigger: "item" },
        series: [
          {
            type: "pie",
            radius: ["45%", "80%"],
            avoidLabelOverlap: false,
            label: { show: false },
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            data: [
              { value: loan, name: "Principal", itemStyle: { color: "#10B981" } },
              { value: interest, name: "Interest", itemStyle: { color: "#6EE7B7" } },
            ],
          },
        ],
      };

      return (
        <ReactECharts
          option={option}
          style={{ height: "280px" }}
          className="sm:!h-[320px]"
        />
      );
    }),
  { ssr: false }
);

export default function EMICalculatorPage() {
  const [loan, setLoan] = useState(5000000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);

  const emi = calculateEMI(loan, rate, years);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12 sm:py-16 px-4 sm:px-6 ">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 sm:mb-14"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl mt-30 font-extrabold bg-gradient-to-r from-emerald-600 to-green-800 bg-clip-text text-transparent">
          Smart EMI Calculator
        </h1>
        <p className="text-gray-600 mt-3 text-base sm:text-lg">
          Modern, sleek & future-ready calculator for real estate buyers
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* LEFT SECTION */}
        <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="bg-white/50 backdrop-blur-xl border-white/40 shadow-xl rounded-3xl p-3 sm:p-4">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Calculator className="text-emerald-600" />
                Calculate Monthly EMI
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 sm:space-y-8">
              <InputBlock
                label="Loan Amount (₹)"
                value={loan}
                onChange={setLoan}
                max={20000000}
                step={50000}
              />

              <InputBlock
                label="Interest Rate (%)"
                value={rate}
                onChange={setRate}
                max={15}
                step={0.1}
              />

              <InputBlock
                label="Loan Tenure (Years)"
                value={years}
                onChange={setYears}
                max={30}
                step={1}
              />

              {/* EMI OUTPUT */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white text-center shadow-xl"
              >
                <p className="text-sm sm:text-lg opacity-80">Your EMI</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 break-all">
                  ₹<NumberFlow value={emi} />
                </h2>
              </motion.div>

              <Button className="w-full py-5 sm:py-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-base sm:text-lg font-semibold shadow-lg">
                Download EMI PDF Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT SECTION */}
        <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="bg-white/50 backdrop-blur-xl border-white/40 shadow-xl p-3 sm:p-4 rounded-3xl mb-8 sm:mb-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <TrendingUp className="text-green-700" />
                EMI Breakdown Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EChart loan={loan} rate={rate} years={years} />
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-xl border-white/40 shadow-xl p-3 sm:p-4 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Building2 className="text-emerald-700" />
                Bank Interest Comparison
              </CardTitle>
            </CardHeader>

            <CardContent>
              <BankTable />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------
   COMPONENTS
------------------------------ */

function InputBlock({ label, value, onChange, max, step }) {
  return (
    <div>
      <label className="text-gray-700 font-medium text-sm sm:text-base">
        {label}
      </label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 text-sm sm:text-base"
      />
      <Slider
        defaultValue={[value]}
        max={max}
        step={step}
        onValueChange={(val) => onChange(val[0])}
        className="mt-4"
      />
    </div>
  );
}

function calculateEMI(P, R, Y) {
  let r = R / (12 * 100);
  let n = Y * 12;
  return Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

function BankTable() {
  const banks = [
    { name: "HDFC Bank", rate: 8 },
    { name: "ICICI Bank", rate: 7.4 },
    { name: "SBI Home Loan", rate: 7.55 },
    { name: "Axis Bank", rate: 7.55 },
    { name: "Kotak Bank", rate: 8.25 },
    { name: "Tata Capital", rate: 7.5 },
    { name: "PNB", rate: 7.35 },


  ];

  return (
    <table className="w-full text-left text-sm sm:text-base">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="py-3 text-gray-600">Bank</th>
          <th className="py-3 text-gray-600 text-right">Interest Rate</th>
        </tr>
      </thead>
      <tbody>
        {banks.map((b, i) => (
          <tr key={i} className="border-b border-gray-200">
            <td className="py-3 font-semibold">{b.name}</td>
            <td className="py-3 text-right">{b.rate}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
