import transactionModel from "../models/transaction.model";

export const createTransaction = async (req, res) => {
    try {
        const { order_id, amount, status, payment_id, payment_signature, payment_status } = req.body

        const requiredDetails = { order_id, amount, status, payment_id, payment_signature, payment_status }
        for (const [field, value] of Object.entries(requiredDetails)) {
            if (!value) {
                return res.status(400).json({
                    success: false,
                    message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
                });
            }
        }
        const newTransaction = new transactionModel({
            order_id: order_id,
            amount: amount,
            status: status,
            payment_id: payment_id,
            payment_signature: payment_signature,
            payment_status: payment_status
        })
        const savedTransaction = await newTransaction.save();
        return res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            data: savedTransaction
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const viewTransaction = async (req, res) => {
    try {
        const transactions = await transactionModel.find()
        return res.status(200).json({
            success: true,
            data: transactions
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const viewTransactionById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid ID"
            })
        }

        const transaction = await transactionModel.findById(id)
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Invalid Transaction ID"
            })
        }
        return res.status(200).json({
            success: true,
            data: transaction
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}