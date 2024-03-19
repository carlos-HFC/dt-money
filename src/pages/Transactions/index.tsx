import { Header } from "../../components/Header"
import { SearchForm } from "../../components/SearchForm"
import { Summary } from "../../components/Summary"

import { useTransaction } from "../../contexts/Transactions"
import { dateFormatter, priceFormatter } from "../../utils/formatter"

import { Container, PriceHighlight, Table } from "./style"

export function Transactions() {
  const { transactions } = useTransaction()

  return (
    <div>
      <Header />

      <Summary />

      <Container>
        <SearchForm />

        <Table>
          <tbody>
            {transactions.map(item => (
              <tr key={item.id}>
                <td width="50%">{item.description}</td>
                <td>
                  <PriceHighlight variant={item.type}>
                    {item.type === "outcome" && "- "}
                    {priceFormatter.format(item.price)}
                  </PriceHighlight>
                </td>
                <td>{item.category}</td>
                <td>{dateFormatter.format(new Date(item.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}
