// {
//   "query": "query { orders(first: 50, query: \"created_at:>='2025-12-01' AND created_at:<='2025-12-31'\") { nodes { id name createdAt totalPriceSet { shopMoney { amount currencyCode } } customer { firstName lastName } } } }"
// }

// mockData.ts - Fake order data matching your GraphQL query structure
 interface Order {
  id: string
  name: string
  createdAt: string
  totalPriceSet: {
    shopMoney: {
      amount: string
      currencyCode: string
    }
  }
  customer: {
    firstName: string
    lastName: string
  }
}

export const mockOrders: Order[] = [
  {
    id: "gid://shopify/Order/6348845547699",
    name: "#1001",
    createdAt: "2025-12-01T09:15:22Z",
    totalPriceSet: {
      shopMoney: { amount: "79.99", currencyCode: "USD" }
    },
    customer: { firstName: "Amit", lastName: "Kumar" }
  },
  {
    id: "gid://shopify/Order/6348845547700",
    name: "#1002",
    createdAt: "2025-12-01T11:30:45Z",
    totalPriceSet: {
      shopMoney: { amount: "129.50", currencyCode: "USD" }
    },
    customer: { firstName: "Maria", lastName: "Garcia" }
  },
  {
    id: "gid://shopify/Order/6348845547701",
    name: "#1003",
    createdAt: "2025-12-02T14:22:18Z",
    totalPriceSet: {
      shopMoney: { amount: "45.00", currencyCode: "USD" }
    },
    customer: { firstName: "James", lastName: "Wilson" }
  },
  {
    id: "gid://shopify/Order/6348845547702",
    name: "#1004",
    createdAt: "2025-12-03T10:05:33Z",
    totalPriceSet: {
      shopMoney: { amount: "199.99", currencyCode: "USD" }
    },
    customer: { firstName: "Sarah", lastName: "Chen" }
  },
  {
    id: "gid://shopify/Order/6348845547703",
    name: "#1005",
    createdAt: "2025-12-03T16:48:12Z",
    totalPriceSet: {
      shopMoney: { amount: "65.75", currencyCode: "USD" }
    },
    customer: { firstName: "David", lastName: "Miller" }
  },
  {
    id: "gid://shopify/Order/6348845547704",
    name: "#1006",
    createdAt: "2025-12-04T13:15:27Z",
    totalPriceSet: {
      shopMoney: { amount: "320.00", currencyCode: "USD" }
    },
    customer: { firstName: "Lisa", lastName: "Thompson" }
  },
  {
    id: "gid://shopify/Order/6348845547705",
    name: "#1007",
    createdAt: "2025-12-05T08:45:19Z",
    totalPriceSet: {
      shopMoney: { amount: "89.95", currencyCode: "USD" }
    },
    customer: { firstName: "Robert", lastName: "Brown" }
  },
  {
    id: "gid://shopify/Order/6348845547706",
    name: "#1008",
    createdAt: "2025-12-05T15:30:44Z",
    totalPriceSet: {
      shopMoney: { amount: "155.25", currencyCode: "USD" }
    },
    customer: { firstName: "Emma", lastName: "Davis" }
  },
  {
    id: "gid://shopify/Order/6348845547707",
    name: "#1009",
    createdAt: "2025-12-06T11:20:15Z",
    totalPriceSet: {
      shopMoney: { amount: "42.50", currencyCode: "USD" }
    },
    customer: { firstName: "Michael", lastName: "Johnson" }
  },
  {
    id: "gid://shopify/Order/6348845547708",
    name: "#1010",
    createdAt: "2025-12-07T14:55:38Z",
    totalPriceSet: {
      shopMoney: { amount: "275.00", currencyCode: "USD" }
    },
    customer: { firstName: "Olivia", lastName: "Martinez" }
  },
  {
    id: "gid://shopify/Order/6348845547709",
    name: "#1011",
    createdAt: "2025-12-08T10:10:10Z",
    totalPriceSet: {
      shopMoney: { amount: "99.99", currencyCode: "USD" }
    },
    customer: { firstName: "Daniel", lastName: "Lee" }
  },
  {
    id: "gid://shopify/Order/6348845547710",
    name: "#1012",
    createdAt: "2025-12-09T16:25:42Z",
    totalPriceSet: {
      shopMoney: { amount: "180.50", currencyCode: "USD" }
    },
    customer: { firstName: "Sophia", lastName: "Taylor" }
  },
  {
    id: "gid://shopify/Order/6348845547711",
    name: "#1013",
    createdAt: "2025-12-10T12:30:15Z",
    totalPriceSet: {
      shopMoney: { amount: "210.00", currencyCode: "USD" }
    },
    customer: { firstName: "William", lastName: "Anderson" }
  },
  {
    id: "gid://shopify/Order/6348845547712",
    name: "#1014",
    createdAt: "2025-12-11T09:45:28Z",
    totalPriceSet: {
      shopMoney: { amount: "75.25", currencyCode: "USD" }
    },
    customer: { firstName: "Chloe", lastName: "White" }
  },
  {
    id: "gid://shopify/Order/6348845547713",
    name: "#1015",
    createdAt: "2025-12-12T14:15:33Z",
    totalPriceSet: {
      shopMoney: { amount: "145.99", currencyCode: "USD" }
    },
    customer: { firstName: "Ethan", lastName: "Harris" }
  }
]