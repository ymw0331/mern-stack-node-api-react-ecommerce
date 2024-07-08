import Product from "../../server/models/product.js"
import fs from 'fs'
import slugify from "slugify"

export const create = async (req, res) => {

    try {
        // send form data instead of json format
        // console.log(req.fields)
        // console.log(req.files)

        // destructure
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        // validation
        switch (true) {
            case !name.trim():
                res.json({ error: "Name is required" })
            case !description.trim():
                res.json({ error: "Description is required" })
            case !price.trim():
                res.json({ error: "Price is required" })
            case !category.trim():
                res.json({ error: "Category is required" })
            case !quantity.trim():
                res.json({ error: "Quantity is required" })
            case !shipping.trim():
                res.json({ error: "Shipping is required" })
            case photo && photo.size > 10000000:
                res.json({ error: "Image should be less than 1MB in size" })

        }

        // create product
        const product = new Product({ ...req.fields, slug: slugify(name) })

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()
        res.json(product)


    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
}


// <img src={'https://isjfaksldjflj} />

export const list = async (req, res) => {
    try {
        // for listing purpose, without photo
        const products = await Product.find({})
            .populate("category")
            .select('-photo') //deselect photo
            .limit(12)
            .sort({ createdAt: -1 })
        res.json(products)
    } catch (error) {
        console.log(error)
    }
}

export const read = async (req, res) => {
    try {
        const product =
            await Product.findOne({ slug: req.params.slug })
                .select("-photo")
                .populate('category')

        res.json(product)
        console.log("Product Retrieved: ", product)
    } catch (error) {
        console.log(error)
    }
}

export const photo = async (req, res) => {

    try {
        const product = await Product.findById(req.params.productId)
            .select("photo")

        if (product.photo.data) {
            res.set("Content-Type", product.photo.contentType)
            return res.send(product.photo.data)
        }

    } catch (error) {
        console.log(error)
    }
}

export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId)
            .select("-photo")
        res.json(product)
    } catch (error) {
        console.log(error)
    }
}

export const update = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;

        const { photo } = req.files;

        //validations
        switch (true) {
            case !name.trim():
                res.json({ error: "Name is required" });
            case !description.trim():
                res.json({ error: "Description is required" });
            case !price.trim():
                res.json({ error: "Price is required" });
            case !category.trim():
                res.json({ error: "Category is required" });
            case !quantity.trim():
                res.json({ error: "Quantity is required" });
            case !shipping.trim():
                res.json({ error: "Shipping is required" });
            case photo && photo.size > 1000000:
                res.json({ error: "Image should be less than 1mb in size" });
        }

        //update product 
        const product = await Product.findByIdAndUpdate(req.params.productId, {
            ...req.fields,
            slug: slugify(name)
        }, {
            new: true
        });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};