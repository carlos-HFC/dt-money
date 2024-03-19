import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import { api } from "../../services/api"

interface Transaction {
  id: number
  description: string
  type: "income" | "outcome"
  category: string
  price: number
  createdAt: string
}

interface CreateTransaction {
  description: string
  category: string
  price: number
  type: "income" | "outcome"
}

interface TransactionContextProps {
  transactions: Transaction[]
  fetchTransactions(query?: string): Promise<void>
  createTransaction(data: CreateTransaction): Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextProps)

export const useTransaction = () => useContext(TransactionContext)

export function TransactionProvider(props: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function fetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransaction) {
    const response = await api.post("/transactions", {
      ...data,
      createdAt: new Date(),
    })

    setTransactions(prev => [response.data, ...prev])
  }

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {props.children}
    </TransactionContext.Provider>
  )
}
