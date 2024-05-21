
export type Payment = {
    id: string
    amount:number
    type:"card"|"paypal"
    last4Digits:string
    createdAt:Date
}