import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      try {
        const deletedOrder = await Order.findByIdAndDelete(req.query.id);

        if (deletedOrder) {
          res.json({ success: true, message: 'Order deleted successfully.' });
        } else {
          res.status(404).json({ success: false, message: 'Order not found.' });
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Missing order ID in the request.' });
    }
  }


}
