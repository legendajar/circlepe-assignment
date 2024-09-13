import orderModel from "../models/order.model";

export const addOrder = async (req, res) => {
    try {
        const { productList, firstLine, secondLine, city, state, country, pincode, user_id, total_price, payment_method, delivery_location, transactionId } = req.body
        
        const requiredDetails = { productList, firstLine, secondLine, city, state, country, pincode, user_id, total_price, payment_method, delivery_location }
        for (const [field, value] of Object.entries(requiredDetails)) {
            if (!value) {
                return res.status(400).json({
                    success: false,
                    message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
                });
            }
        }
        
        await orderModel.create({
            product: productList,
            address: {
                firstLine: firstLine,
                secondLine: secondLine,
                city: city,
                state: state,
                country: country,
                pincode: pincode
            },
            user_id: user_id,
            total_price: total_price,
            payment_method: payment_method,
            delivery_location: [delivery_location],
            transaction_id: transactionId
        })

        return res.status(200).json({
            success: true,
            message: "Order Placed Successfully"
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getOrder = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            data: order
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}