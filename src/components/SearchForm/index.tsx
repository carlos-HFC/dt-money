import { MagnifyingGlass } from "@phosphor-icons/react"

import { Container } from "./style"

export function SearchForm() {
  return (
    <Container>
      <input
        type="text"
        placeholder="Busque por transações"
      />

      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </Container>
  )
}
