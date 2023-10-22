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

     const getOrder = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            items:  {
                include : {
                    Chapter: true
                }
            }
        }
    });

    const orderItems = getOrder?.items;
    if(!orderItems) {return cancelOrder(orderId);}

    await orderItems.forEach(async (item: any) => {
        let link ;

        if(item.productId){
            link = await prisma.links.findUnique({
                where: {
                    productId: item.productId,
                },
            
            })
        }else {
            link = await prisma.links.findUnique({
                where: {
                    chapterNumber: item.Chapter.number,
                },
            })
        }
        if(!link) {return cancelOrder(orderId);}
        const currentTime = new Date();
        // Add 30 minutes to the current time
        const futureTime = new Date(currentTime.getTime() + 20 * 60000); // 30 minutes = 30 * 60,000 milliseconds
        await prisma.OrderItem.update({
            where: {
                id: item.id
            },
            data: {
                 link : link.link,
                 activedate: futureTime
            }
         })
    }
    )

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


 