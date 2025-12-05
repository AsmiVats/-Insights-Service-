
// {
//   "query": "query { customer(id: \"gid://shopify/Customer/8838707118259\") { firstName lastName amountSpent { amount currencyCode } numberOfOrders } }"
// }


export const topCustomersMock = [
  {
    id: "gid://shopify/Customer/8838707118259",
    firstName: "Karine",
    lastName: "Ruby",
    amountSpent: { amount: "249.50", currencyCode: "CAD" },
    numberOfOrders: "1",
  },
  {
    id: "gid://shopify/Customer/8838707118260",
    firstName: "Marcus",
    lastName: "Zhang",
    amountSpent: { amount: "1599.00", currencyCode: "USD" },
    numberOfOrders: "3",
  },
  {
    id: "gid://shopify/Customer/8838707118262",
    firstName: "Alex",
    lastName: "Thompson",
    amountSpent: { amount: "129.99", currencyCode: "GBP" },
    numberOfOrders: "7",
  },
  {
    id: "gid://shopify/Customer/8838707118263",
    firstName: "Chloe",
    lastName: "Williams",
    amountSpent: { amount: "689.74", currencyCode: "EUR" },
    numberOfOrders: "2",
  },
  {
    id: "gid://shopify/Customer/8838707118264",
    firstName: "Kenji",
    lastName: "Tanaka",
    amountSpent: { amount: "449.75", currencyCode: "USD" },
    numberOfOrders: "5",
  },
]

export default topCustomersMock
