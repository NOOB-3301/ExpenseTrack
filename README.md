# Expense Tracker

A **Personal Finance Visualizer** web application built with **Next.js**, **React**, **shadcn/ui**, **Recharts**, and **MongoDB**. This app helps users manage their expenses by adding, editing, and deleting transactions. It also provides a visual overview of monthly spending trends through interactive charts.

## 🚀 Features

- 📊 **Monthly Spending Chart**: Visual representation of spending trends.
- ➕ **Add Transactions**: Record expenses with details like title, amount, and date.
- ✏️ **Edit Transactions**: Modify existing transactions with ease.
- ❌ **Delete Transactions**: Remove unwanted records.
- 📅 **Date Validation**: Ensures valid past or current dates for transactions.
- 💻 **Responsive Design**: Optimized for all screen sizes.

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, shadcn/ui, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Visualization**: Recharts
- **Date Handling**: date-fns
- **API Communication**: Axios

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/NOOB-3301/ExpenseTrack
cd Expansetrack
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file and add your backend URL:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

4. **Run the development server:**

```bash
npm run dev
```

## 📋 API Endpoints

### Transactions
- `GET /api/getalltransaction` - Fetch all transactions.
- `POST /api/addtransaction` - Add a new transaction.
- `PUT /api/edittransaction/:id` - Edit a transaction.
- `DELETE /api/deletetransaction/:id` - Delete a transaction.

## ✅ Usage

- **Add Transaction**: Click on the `Add` button, fill in the form, and submit.
- **Edit Transaction**: Click the pencil icon on any transaction card to modify it.
- **Delete Transaction**: Click the trash icon to remove a transaction.

## 🎨 UI Preview

- **Dashboard**: Displays an overview of all transactions and a monthly spending chart.
- **Interactive Cards**: Hover to reveal edit and delete options.

## 🔒 Security Features

- Input validation for amount and date fields.
- Error handling for API failures.

## 📂 Folder Structure

```
├── components
│   ├── ui
│   └── TransactionCard.tsx
├── pages
│   └── index.tsx
├── public
├── styles
├── .env.local
├── package.json
└── README.md
```

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [date-fns](https://date-fns.org/)

---

**Built with 💙 using Next.js and MongoDB**

