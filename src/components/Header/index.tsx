import * as Dialog from "@radix-ui/react-dialog"

import { NewTransactionModal } from "../NewTransactionModal"

import logo from "../../assets/logo.svg"

import { Container, Content, TransactionButton } from "./style"

export function Header() {
  return (
    <Container>
      <Content>
        <img
          src={logo}
          alt=""
        />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <TransactionButton>Nova transação</TransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </Content>
    </Container>
  )
}
