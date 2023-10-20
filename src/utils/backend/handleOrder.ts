import prisma from "@/libs/prisma";
async function createOrder(cart: any , total: any) : Promise<number | null>{
   // console.log(cart);

    const order =  await prisma.order.create({
        data: {
            customerId: cart.userId,
            status: "CREATED",
            total: total/100,
            orderNumber: "ORDER-" + Math.floor(Math.random() * 1000000000),
            items: {
                create: cart.CartItems.map((item: any) => {
                    return {
                        quantity: item.quantity,
                        price: item.price,
                        productId: item.productId,
                        chapterId: item.chapterId
                    }
                })
            }
        }
    })
    //console.log(order);


    return order.id; 
} // returns order ID;

async function proccessOrder(orderId: number){
    // update order status to fullfilled
    const order = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status: "PROCESSING"
        }
    });

}
async function completeOrder(orderId: number){
    // update order status to fullfilled
    const order = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status: "COMPLETED"
        }
    });
}
async function cancelOrder(orderId: number){
    // update order status to fullfilled
    const order = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status: "CANCELLED"
        }
    });
}

export { createOrder , proccessOrder, completeOrder, cancelOrder} ;



// model Order {
//     id          Int         @id @unique @default(autoincrement())
//     orderNumber String      @unique
//     createdAt   DateTime    @default(now())
//     updatedAt   DateTime    @updatedAt
//     status      OrderStatus
//     total       Float
//     customerId  Int
//     customer    User        @relation(fields: [customerId], references: [id])
//     items       OrderItem[]
  
//     @@index([customerId], map: "Order_customerId_fkey")
//   }
  
//   model OrderItem {
//     id        Int     @id @default(autoincrement())
//     quantity  Int
//     price     Float
//     productId Int
//     orderId   Int
//     order     Order   @relation(fields: [orderId], references: [id])
//     Product   Product @relation(fields: [productId], references: [id])
  
//     @@index([orderId], map: "OrderItem_orderId_fkey")
//     @@index([productId], map: "OrderItem_productId_fkey")
//   }
  