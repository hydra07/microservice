export const fetchOrders = async (status: any) => {
    // Simulate a fetch request
    const allOrders = [
      {
        id: "ORD001",
        createAt: "2023-05-15",
        total: 99.99,
        status: "pending",
        items: [
          {
            name: "Product A",
            quantity: 1,
            price: 49.99,
            image: "/placeholder.svg",
          },
          {
            name: "Product B",
            quantity: 1,
            price: 49.99,
            image: "/placeholder.svg",
          },
        ],
      },
      {
        id: "ORD002",
        createAt: "2023-04-20",
        total: 149.99,
        status: "shipping",
        items: [
          {
            name: "Product C",
            quantity: 1,
            price: 149.99,
            image: "/placeholder.svg",
          },
        ],
      },
      {
        id: "ORD003",
        createAt: "2023-03-01",
        total: 79.98,
        status: "complete",
        items: [
          {
            name: "Product D",
            quantity: 2,
            price: 39.99,
            image: "/placeholder.svg",
          },
        ],
      },
      {
        id: "ORD004",
        createAt: "2023-02-10",
        total: 199.98,
        status: "pending",
        items: [
          {
            name: "Product E",
            quantity: 2,
            price: 99.99,
            image: "/placeholder.svg",
          },
          {
            name: "Product F",
            quantity: 1,
            price: 49.99,
            image: "/placeholder.svg",
          },
        ],
      },
      {
        id: "ORD005",
        createAt: "2023-01-01",
        total: 299.97,
        status: "shipping",
        items: [
          {
            name: "Product G",
            quantity: 3,
            price: 99.99,
            image: "/placeholder.svg",
          },
        ],
      },
    ];
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(allOrders.filter(order => order.status === status));
      }, 500);
    });
  };
  