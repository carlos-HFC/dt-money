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

interface TransactionContextProps {
  transactions: Transaction[]
  fetchTransactions(query?: string): Promise<void>
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
        q: query,
      },
    })

    setTransactions(response.data)
  }

  return (
    <TransactionContext.Provider value={{ transactions, fetchTransactions }}>
      {props.children}
    </TransactionContext.Provider>
  )
}
