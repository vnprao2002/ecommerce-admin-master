// pages/orders.js
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";


export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`/api/orders?id=${orderId}`);
      fetchOrders(); // Refresh the order list after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Đơn hàng</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Ngày</th>
            <th className="py-2 px-4">Đã thanh toán</th>
            <th className="py-2 px-4">Người nhận</th>
            <th className="py-2 px-4">Sản phẩm</th>
            <th className="py-2 px-4">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="py-2 px-4">{new Date(order.createdAt).toLocaleString()}</td>
              <td className={`py-2 px-4 ${order.paid ? 'text-green-600' : 'text-red-600'}`}>
                {order.paid ? 'CÓ' : 'KHÔNG'}
              </td>
              <td className="py-2 px-4">
                {order.name} {order.email}
                <br />
                {order.city} {order.postalCode} {order.country}
                <br />
                {order.streetAddress}
              </td>
              <td className="py-2 px-4">
                {order.line_items.map((item) => (
                  <div key={item._id}>
                    {item.price_data?.product_data.name} x{item.quantity}
                    <br />
                  </div>
                ))}
              </td>
              <td className="py-2 px-4">
                <button
                  className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors`}
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Xóa
                </button>
                {/* Thêm nút hoặc liên kết cho việc xem một đơn hàng cụ thể */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
