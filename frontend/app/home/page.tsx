"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";

interface chartDataPoint {
  date: string;
  amount: number;
}

interface Transaction {
  id: number;
  title: string;
  amount: number;
  date: string;
}

const HomePage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    title: "",
    amount: "",
    date: "",
  });
  const [chartData, setChartData] = useState<chartDataPoint[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getalltransaction`);
        setTransactions(response.data);
        const formattedData = response.data.map((transaction: Transaction) => ({
          date: format(parseISO(transaction.date), "MMM d"),
          amount: Number(transaction.amount),
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  const handleAdd = () => setIsModalOpen(true);
  const handleEdit = (id: number) => console.log("Edit transaction", id);
  const handleDelete = (id: number) => console.log("Delete transaction", id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addtransaction`, newTransaction);
      setTransactions((prev) => [...prev, response.data.transaction]);
      setChartData((prev) => [
        ...prev,
        {
          date: format(parseISO(response.data.transaction.date), "MMM d"),
          amount: Number(response.data.transaction.amount),
        },
      ]);
      setIsModalOpen(false);
      setNewTransaction({ title: "", amount: "", date: "" });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add
        </Button>
      </div>

      {/* Recharts Bar Graph */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Spending Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction Cards with Animations */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="relative group hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{transaction.title}</h2>
                    <p className="text-gray-600">${transaction.amount}</p>
                    <p className="text-gray-500 text-sm">{format(parseISO(transaction.date), "eeee, MMMM d, yyyy")}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 hidden group-hover:flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(transaction.id)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(transaction.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Transaction Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter transaction title"
                value={newTransaction.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter amount"
                value={newTransaction.amount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={newTransaction.date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Add Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
