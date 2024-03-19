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
}

export const TransactionContext = createContext({} as TransactionContextProps)

export const useTransaction = () => useContext(TransactionContext)

export function TransactionProvider(props: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    loadTransactions()
  }, [])

  async function loadTransactions() {
    const response = await api.get("/transactions")

    setTransactions(response.data)
  }

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {props.children}
    </TransactionContext.Provider>
  )
}
