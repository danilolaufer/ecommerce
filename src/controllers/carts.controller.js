const { cartService } = require("../services/carts.service.js");
const ProductService = require("../services/products.service.js");
const { TicketService } = require("../services/tickets.service.js");
const ticketService = new TicketService();
const productService = new ProductService();

class CartController {
    async getAll(req, res) {
        try {
            let carts = await cartService.getAll()
            res.status(200).json({
                status: "success",
                message: 'Carts list',
                payload: carts
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })
        }
    }

    async newCart(req, res) {
        try {
            let newCart = await cartService.addCart()
            res.status(201).json({
                status: "success",
                message: 'Cart created successfuly',
                payload: newCart
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })
        }
    }
    async getCartById(req, res) {
        try {
            const id = req.params.id;
            const cart = await cartService.getCartById(id);
            res.status(200).json({
                status: "success",
                message: `Cart with id:${id}`,
                payload: cart
            })

        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })
        }
    }
    async addPorductToCart(req, res) {
        try {
            const pid = req.params.pid;
            const cid = req.params.cid;
            await cartService.addProductToCart(pid, cid)
            const cart = await cartService.getCartById(cid);
            res.status(201).json({
                status: "success",
                message: `Product with id:${pid} was added successfully to cart with id ${cid}`,
                payload: cart
            })

        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })

        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id;
            const cart = await cartService.deleteCart(id);
            res.status(200).json({
                status: "success",
                message: `The cart with id: ${id} was deleted succesfully!`,
                payload: cart
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })

        }
    }
    async deleteProductFromCart(req, res) {
        try {
            const pid = req.params.pid;
            const cid = req.params.cid;
            await cartService.deleteProductFromCart(pid, cid)
            const cart = await cartService.getCartById(cid);
            console.log(cart)
            res.status(201).json({
                status: "success",
                message: `Product with id:${pid} was deleted successfully from cart with id ${cid}`,
                payload: cart
            })

        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })

        }
    }
    async updateQuantity(req, res) {
        try {
            const pid = req.params.pid;
            const cid = req.params.cid;
            await cartService.updateCart(cid, pid, req.body);
            const cart = await cartService.getCartById(cid);
            res.status(201).json({
                status: "success",
                message: `Cart with id ${cid} was uploaded successfuly`,
                payload: cart
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })
        }
    }
    async updateCart(req, res) {
        try {
            const cid = req.params.cid;
            await cartService.updateCart(cid, null, req.body);
            const cart = await cartService.getCartById(cid);
            res.status(201).json({
                status: "success",
                message: `Cart with id ${cid} was uploaded successfuly`,
                payload: cart
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })
        }
    }
    async purchase(req, res) {
        try {
            const cid = req.params.cid
          const user= req.session.user.email
            // const user = req.body.email
            const newTicket = await cartService.purchase(cid, user)
            await cartService.updateProductsCart(cid, newTicket.prodOutStock )
          await  ticketService.updateStock(newTicket.prodStock)
            const newTk={
                id: newTicket.ticket._id,
                amount: newTicket.ticket.amount,
                purchaser:newTicket.ticket.purchaser
            }
            return res.status(200).render('purchased', { newTk })

        } catch (error) {
            return res.status(500).render('error', { error: error.message })
        }
    }
    async getPurchase(req, res) {
        try {

            const ticket = await cartService.getPurchase()

            return res.status(200).json(ticket)
        } catch (error) {
            return res.status(500).render('error', { error: error.message })
        }
    }
    async deletePurchase(req, res) {
        try {

            const ticket = await cartService.deletePurchase()

            return res.status(200).json(ticket)
        } catch (error) {
            return res.status(500).render('error', { error: error.message })
        }
    }
}

module.exports = { cartController };
