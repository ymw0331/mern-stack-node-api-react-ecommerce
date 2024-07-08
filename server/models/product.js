import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema;


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 160,
        },
        slug: {
            type: String,
            lowercase: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
        price: {
            type: Number,
            trim: true,
            required: true
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        quantity: {
            type: Number,
        },
        sold: {
            type: Boolean,
            default: 0,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        shipping: {
            type: Boolean,
            required: false,
        },
    },
    { timestamps: true }
)


export default mongoose.model("Product", productSchema)