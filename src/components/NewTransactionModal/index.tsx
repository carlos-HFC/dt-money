import { ArrowCircleDown, ArrowCircleUp, X } from "@phosphor-icons/react"
import * as Dialog from "@radix-ui/react-dialog"

import {
  Close,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./style"

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <Close asChild>
          <X size={24} />
        </Close>

        <form>
          <input
            type="text"
            required
            placeholder="Descrição"
          />
          <input
            type="number"
            required
            placeholder="Preço"
          />
          <input
            type="text"
            required
            placeholder="Categoria"
          />

          <TransactionType>
            <TransactionTypeButton
              type="button"
              variant="income"
              value="income"
            >
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton
              type="button"
              variant="outcome"
              value="outcome"
            >
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
