import { useState } from 'react';
import './index.css';

function App() {
  const [form, setForm] = useState({ qty: 0, price: 0, discountPct: 0, discount: 0, taxPct: 0, tax: 0, total: 0 });
  const [invoices, setInvoices] = useState([]);

  const calculate = (field, value, current) => {
    const f = { ...current, [field]: parseFloat(value) || 0 };
    
    if (field === 'qty' || field === 'price') {
      const subtotal = f.qty * f.price;
      f.discount = (subtotal * f.discountPct) / 100;
      const afterDiscount = subtotal - f.discount;
      f.tax = (afterDiscount * f.taxPct) / 100;
      f.total = afterDiscount + f.tax;
    } else if (field === 'discountPct') {
      const subtotal = f.qty * f.price;
      f.discount = (subtotal * f.discountPct) / 100;
      const afterDiscount = subtotal - f.discount;
      f.tax = (afterDiscount * f.taxPct) / 100;
      f.total = afterDiscount + f.tax;
    } else if (field === 'discount') {
      const subtotal = f.qty * f.price;
      f.discountPct = subtotal ? (f.discount / subtotal) * 100 : 0;
      const afterDiscount = subtotal - f.discount;
      f.tax = (afterDiscount * f.taxPct) / 100;
      f.total = afterDiscount + f.tax;
    } else if (field === 'taxPct') {
      const subtotal = f.qty * f.price;
      f.discount = (subtotal * f.discountPct) / 100;
      const afterDiscount = subtotal - f.discount;
      f.tax = (afterDiscount * f.taxPct) / 100;
      f.total = afterDiscount + f.tax;
    } else if (field === 'tax') {
      const subtotal = f.qty * f.price;
      f.discount = (subtotal * f.discountPct) / 100;
      const afterDiscount = subtotal - f.discount;
      f.taxPct = afterDiscount ? (f.tax / afterDiscount) * 100 : 0;
      f.total = afterDiscount + f.tax;
    } else if (field === 'total') {
      const subtotal = f.qty * f.price;
      f.discount = (subtotal * f.discountPct) / 100;
      const afterDiscount = subtotal - f.discount;
      f.tax = f.total - afterDiscount;
      f.taxPct = afterDiscount ? (f.tax / afterDiscount) * 100 : 0;
    }
    
    return f;
  };

  const handleChange = (field, value) => {
    setForm(calculate(field, value, form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvoices([...invoices, { ...form, id: Date.now() }]);
    setForm({ qty: 0, price: 0, discountPct: 0, discount: 0, taxPct: 0, tax: 0, total: 0 });
  };

  const handleEdit = (id, field, value) => {
    setInvoices(invoices.map(inv => inv.id === id ? calculate(field, value, inv) : inv));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-4/5 max-w-6xl mx-auto pb-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoice Manager</h1>
              <p className="text-gray-500 text-xs mt-1">Manage your invoices efficiently</p>
            </div>
            <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-semibold text-sm">
              {invoices.length} Invoice{invoices.length !== 1 ? 's' : ''}
            </div>
          </div>
        
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12">
              <div className="w-full space-y-2">
                <label className="text-base font-bold text-blue-700">Quantity</label>
                <input 
                  type="number" 
                  value={form.qty} 
                  onChange={(e) => handleChange('qty', e.target.value)} 
                  className="w-full bg-blue-50 border-2 border-blue-300 rounded-lg px-3 py-2 text-xl text-blue-700 font-semibold h-14 focus:outline-none focus:border-blue-500 focus:bg-white transition-all" 
                  placeholder="0"
                />
              </div>
              <div className="w-full space-y-2">
                <label className="text-base font-bold text-blue-700">Price ($)</label>
                <input 
                  type="number" 
                  value={form.price} 
                  onChange={(e) => handleChange('price', e.target.value)} 
                  className="w-full bg-blue-50 border-2 border-blue-300 rounded-lg px-3 py-2 text-xl text-blue-700 font-semibold h-14 focus:outline-none focus:border-blue-500 focus:bg-white transition-all" 
                  placeholder="0.00"
                />
              </div>
              <div className="w-full space-y-2">
                <label className="text-base font-bold text-blue-700">Discount (%)</label>
                <input 
                  type="number" 
                  value={form.discountPct.toFixed(2)} 
                  onChange={(e) => handleChange('discountPct', e.target.value)} 
                  className="w-full bg-emerald-50 border-2 border-emerald-300 rounded-lg px-3 py-2 text-xl text-blue-700 font-semibold h-14 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all" 
                  placeholder="0.00"
                />
              </div>
              <div className="w-full space-y-2">
                <label className="text-base font-bold text-blue-700">Discount ($)</label>
                <input 
                  type="number" 
                  value={form.discount.toFixed(2)} 
                  onChange={(e) => handleChange('discount', e.target.value)} 
                  className="w-full bg-emerald-50 border-2 border-emerald-300 rounded-lg px-3 py-2 text-xl text-blue-700 font-semibold h-14 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all" 
                  placeholder="0.00"
                />
              </div>
              <div className="w-full space-y-2">
                <label className="text-base font-bold text-blue-700">Tax (%)</label>
                <input 
                  type="number" 
                  value={form.taxPct.toFixed(2)} 
                  onChange={(e) => handleChange('taxPct', e.target.value)} 
                  className="w-full bg-amber-50 border-2 border-amber-300 rounded-lg px-3 py-2 text-xl text-blue-700 font-semibold h-14 focus:outline-none focus:border-amber-500 focus:bg-white transition-all" 
                  placeholder="0.00"
                />
              </div>
              <div className="w-full space-y-2">
                <label className="text-base font-bold text-blue-700">Tax ($)</label>
                <input 
                  type="number" 
                  value={form.tax.toFixed(2)} 
                  onChange={(e) => handleChange('tax', e.target.value)} 
                  className="w-full bg-amber-50 border-2 border-amber-300 rounded-lg px-3 py-2 text-xl text-blue-700 font-semibold h-14 focus:outline-none focus:border-amber-500 focus:bg-white transition-all" 
                  placeholder="0.00"
                />
              </div>
              <div className="md:col-span-2 w-full space-y-2">
                <label className="text-base font-bold text-blue-700">Total Price ($)</label>
                <input 
                  type="number" 
                  value={form.total.toFixed(2)} 
                  onChange={(e) => handleChange('total', e.target.value)} 
                  className="w-full bg-violet-50 border-2 border-violet-400 rounded-lg px-3 py-2 text-xl text-blue-700 font-bold h-14 focus:outline-none focus:border-violet-500 focus:bg-white transition-all" 
                  placeholder="0.00"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
            >
              Add Invoice
            </button>
          </form>
        </div>

        {invoices.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Qty</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Disc %</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Disc $</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Tax %</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Tax $</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoices.map((inv, idx) => (
                    <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <input 
                          type="number" 
                          value={inv.qty} 
                          onChange={(e) => handleEdit(inv.id, 'qty', e.target.value)} 
                          className="w-3/4 md:w-2/3 mx-auto bg-blue-50 border-2 border-blue-300 rounded-lg px-3 py-2 text-xl text-blue-900 font-semibold h-14 focus:outline-none focus:border-blue-500 focus:bg-white transition-all" 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="number" 
                          value={inv.price} 
                          onChange={(e) => handleEdit(inv.id, 'price', e.target.value)} 
                          className="w-3/4 md:w-2/3 mx-auto bg-blue-50 border-2 border-blue-300 rounded-lg px-3 py-2 text-xl text-blue-900 font-semibold h-14 focus:outline-none focus:border-blue-500 focus:bg-white transition-all" 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="number" 
                          value={inv.discountPct.toFixed(2)} 
                          onChange={(e) => handleEdit(inv.id, 'discountPct', e.target.value)} 
                          className="w-3/4 md:w-2/3 mx-auto bg-emerald-50 border-2 border-emerald-300 rounded-lg px-3 py-2 text-xl text-emerald-900 font-semibold h-14 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all" 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="number" 
                          value={inv.discount.toFixed(2)} 
                          onChange={(e) => handleEdit(inv.id, 'discount', e.target.value)} 
                          className="w-3/4 md:w-2/3 mx-auto bg-emerald-50 border-2 border-emerald-300 rounded-lg px-3 py-2 text-xl text-emerald-900 font-semibold h-14 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all" 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="number" 
                          value={inv.taxPct.toFixed(2)} 
                          onChange={(e) => handleEdit(inv.id, 'taxPct', e.target.value)} 
                          className="w-3/4 md:w-2/3 mx-auto bg-amber-50 border-2 border-amber-300 rounded-lg px-3 py-2 text-xl text-amber-900 font-semibold h-14 focus:outline-none focus:border-amber-500 focus:bg-white transition-all" 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="number" 
                          value={inv.tax.toFixed(2)} 
                          onChange={(e) => handleEdit(inv.id, 'tax', e.target.value)} 
                          className="w-3/4 md:w-2/3 mx-auto bg-amber-50 border-2 border-amber-300 rounded-lg px-3 py-2 text-xl text-amber-900 font-semibold h-14 focus:outline-none focus:border-amber-500 focus:bg-white transition-all" 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="number" 
                          value={inv.total.toFixed(2)} 
                          onChange={(e) => handleEdit(inv.id, 'total', e.target.value)} 
                          className="w-3/4 md:w-2/3 mx-auto bg-violet-50 border-2 border-violet-400 rounded-lg px-3 py-2 text-xl text-violet-900 font-bold h-14 focus:outline-none focus:border-violet-500 focus:bg-white transition-all" 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
