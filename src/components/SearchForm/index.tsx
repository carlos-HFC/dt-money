import { zodResolver } from "@hookform/resolvers/zod"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useTransaction } from "../../contexts/Transactions"

import { Container } from "./style"

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useTransaction()

  const { register, handleSubmit, formState } = useForm<SearchFormInputs>({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <Container onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button
        type="submit"
        disabled={formState.isSubmitting}
      >
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </Container>
  )
}
