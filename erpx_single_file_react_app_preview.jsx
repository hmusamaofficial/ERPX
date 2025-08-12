// ERPX - Single-file React App (Preview)
// ---------------------------------------
// How to run (quick):
// 1. Create a new Vite + React project or CRA.
// 2. Install dependencies:
//    npm i react-router-dom framer-motion recharts lucide-react @radix-ui/react-dialog
//    (Tailwind CSS should be configured in your project.)
// 3. Drop this file as src/App.jsx and start the dev server.
//
// Notes: This is a single-file, self-contained preview of an "advanced" ERP UI.
// It demonstrates layout, dashboard widgets, inventory table, sales orders, HR roster,
// settings, lightweight state, and nice interactions using Framer Motion.
//
// BUGFIX (this version): Resolved a runtime error "Duplicate declaration \"Settings\"" by
// - renaming the Settings component to SettingsPage
// - importing the settings icon as SettingsIcon
// - wrapping the app layout in a Router so Links/Routes work correctly
// For production you should split into modules, add API calls, auth, validations, and tests.

import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Menu, Home, Box, ShoppingCart, Users, Settings as SettingsIcon, LogOut, User } from "lucide-react";

function Icon({ children }) { return <span className="inline-flex items-center justify-center w-6 h-6">{children}</span>; }

const sampleSales = [
  { month: "Jan", revenue: 12000, orders: 320 },
  { month: "Feb", revenue: 15000, orders: 410 },
  { month: "Mar", revenue: 18000, orders: 490 },
  { month: "Apr", revenue: 22000, orders: 530 },
  { month: "May", revenue: 20000, orders: 470 },
  { month: "Jun", revenue: 24000, orders: 600 }
];

const sampleInventory = new Array(12).fill(0).map((_,i)=>({
  id: `SKU-${1000+i}`,
  name: ["Plain Widget","Super Bolt","Nut Max","Gizmo Pro","Alpha Gear","Beta Plate"][i%6]+` ${i+1}`,
  qty: Math.floor(Math.random()*200),
  price: (Math.random()*120).toFixed(2),
  location: ["A1","B2","C4","D1","E5"][i%5]
}));

const sampleTeam = [
  { id:1, name:"Aisha Khan", role:"Sales Lead", email:"aisha@erpx.local" },
  { id:2, name:"Omar Rizvi", role:"Inventory Manager", email:"omar@erpx.local" },
  { id:3, name:"Sara Ali", role:"HR Specialist", email:"sara@erpx.local" },
  { id:4, name:"Bilal Ahmed", role:"Developer", email:"bilal@erpx.local" }
];

function Sidebar({ collapsed, onLogout }){
  return (
    <div className={`flex flex-col ${collapsed? 'w-20':'w-64'} bg-white/5 backdrop-blur-sm border-r border-white/5 h-screen p-3 transition-all duration-300` }>
      <div className="flex items-center gap-2 p-2">
        <div className="rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 w-10 h-10 flex items-center justify-center text-white font-bold">EX</div>
        {!collapsed && <div className="font-bold text-lg">ERPX</div>}
      </div>

      <nav className="mt-6 flex-1">
        <NavItem to="/" label="Dashboard" icon={<Home size={16}/>} collapsed={collapsed} />
        <NavItem to="/inventory" label="Inventory" icon={<Box size={16}/>} collapsed={collapsed} />
        <NavItem to="/sales" label="Sales" icon={<ShoppingCart size={16}/>} collapsed={collapsed} />
        <NavItem to="/hr" label="HR" icon={<Users size={16}/>} collapsed={collapsed} />
        <NavItem to="/settings" label="Settings" icon={<SettingsIcon size={16}/>} collapsed={collapsed} />
      </nav>

      <div className="mt-auto">
        <button onClick={onLogout} className="w-full flex items-center gap-3 p-2 rounded hover:bg-white/3">
          <LogOut size={16}/>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

function NavItem({to,label,icon,collapsed}){
  return (
    <Link to={to} className="block">
      <div className="p-2 my-1 rounded hover:bg-white/3 flex items-center gap-3">
        <span className="text-slate-200">{icon}</span>
        {!collapsed && <span className="text-sm">{label}</span>}
      </div>
    </Link>
  );
}

function Topbar({ onToggle, collapsed, user, onOpenQuick }){
  return (
    <div className="flex items-center justify-between p-3 border-b border-white/5 bg-white/3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button onClick={onToggle} className="p-2 rounded hover:bg-white/5"><Menu size={18}/></button>
        <div className="text-lg font-semibold">Welcome back, {user.name.split(' ')[0]} 👋</div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onOpenQuick} className="px-3 py-1 rounded bg-white/5">Quick Actions</button>
        <div className="flex items-center gap-2 p-1 rounded hover:bg-white/5">
          <User size={16}/>
          <div className="text-sm">{user.name}</div>
        </div>
      </div>
    </div>
  );
}

function Dashboard(){
  const revenue = sampleSales.reduce((s,o)=>s+o.revenue,0);
  const orders = sampleSales.reduce((s,o)=>s+o.orders,0);
  const avgOrder = (revenue / orders).toFixed(2);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Revenue" value={`$${revenue.toLocaleString()}`} subtitle={`Avg order $${avgOrder}`} />
        <Card title="Orders" value={orders} subtitle="Last 6 months" />
        <Card title="Inventory Value" value={`$${Math.floor(sampleInventory.reduce((s,i)=>s + (i.qty * parseFloat(i.price)),0)).toLocaleString()}`} subtitle="Estimated" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Sales (6 months)">
          <div style={{height:260}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleSales}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} dot={{ r:3 }} />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} dot={{ r:2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Top Products">
          <ul className="space-y-2">
            {sampleInventory.slice(0,6).map(p=> (
              <li key={p.id} className="flex justify-between p-2 rounded hover:bg-white/3">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-slate-300">{p.id} • {p.location}</div>
                </div>
                <div className="text-right">
                  <div>${p.price}</div>
                  <div className="text-xs">Stock: {p.qty}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Card({title,value,subtitle}){
  return (
    <div className="rounded-lg p-4 bg-gradient-to-br from-white/3 to-white/5 border border-white/5">
      <div className="text-xs text-slate-300">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {subtitle && <div className="text-sm text-slate-400 mt-1">{subtitle}</div>}
    </div>
  );
}

function Panel({title, children}){
  return (
    <div className="rounded-lg p-4 bg-white/3 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-slate-400">Realtime</div>
      </div>
      {children}
    </div>
  );
}

function Inventory(){
  const [items, setItems] = useState(sampleInventory);
  const [query, setQuery] = useState("");
  const filtered = useMemo(()=> items.filter(i=> i.name.toLowerCase().includes(query.toLowerCase()) || i.id.toLowerCase().includes(query.toLowerCase())),[items,query]);

  function adjustQty(id, delta){
    setItems(prev=> prev.map(it=> it.id===id ? {...it, qty: Math.max(0, it.qty + delta)}: it));
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Inventory</h2>
        <div className="flex items-center gap-2">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search SKU or name..." className="p-2 rounded bg-white/5" />
          <button className="px-3 py-1 rounded bg-white/5">New Item</button>
        </div>
      </div>

      <div className="overflow-auto rounded bg-white/5 p-2">
        <table className="min-w-full text-left">
          <thead className="text-xs text-slate-300">
            <tr>
              <th className="p-2">SKU</th>
              <th className="p-2">Product</th>
              <th className="p-2">Loc</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(it=> (
              <tr key={it.id} className="border-t border-white/3 hover:bg-white/3">
                <td className="p-2 font-mono text-sm">{it.id}</td>
                <td className="p-2">{it.name}</td>
                <td className="p-2">{it.location}</td>
                <td className="p-2">{it.qty}</td>
                <td className="p-2">${it.price}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button onClick={()=>adjustQty(it.id,-1)} className="px-2 py-1 rounded bg-white/5">-</button>
                    <button onClick={()=>adjustQty(it.id,1)} className="px-2 py-1 rounded bg-white/5">+</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Sales(){
  const [orders, setOrders] = useState([{
    id: 'SO-1001', customer:'Fatima Enterprises', total: 1200, status:'Paid'
  },{ id:'SO-1002', customer:'Zain Traders', total: 450, status:'Pending' }]);

  function addTestOrder(){
    setOrders(prev=> [{ id:`SO-${1000+prev.length+1}`, customer:'New Co', total: Math.floor(Math.random()*2000), status:'Pending' }, ...prev]);
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sales Orders</h2>
        <div>
          <button onClick={addTestOrder} className="px-3 py-1 rounded bg-white/5">Create Order</button>
        </div>
      </div>

      <Panel title="Recent Orders">
        <div className="space-y-2">
          {orders.map(o=> (
            <div key={o.id} className="flex items-center justify-between p-2 rounded hover:bg-white/3">
              <div>
                <div className="font-medium">{o.id} — {o.customer}</div>
                <div className="text-xs text-slate-300">Status: {o.status}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${o.total}</div>
                <div className="text-xs">View</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function HR(){
  const [team, setTeam] = useState(sampleTeam);
  const [q, setQ] = useState("");
  const filtered = team.filter(t=> t.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Team</h2>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search team..." className="p-2 rounded bg-white/5" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(m=> (
          <div key={m.id} className="p-3 rounded bg-white/4">
            <div className="font-semibold">{m.name}</div>
            <div className="text-xs text-slate-300">{m.role}</div>
            <div className="text-xs mt-2">{m.email}</div>
            <div className="mt-3 flex gap-2">
              <button className="px-2 py-1 rounded bg-white/5">Message</button>
              <button className="px-2 py-1 rounded bg-white/5">Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Renamed from `Settings` to `SettingsPage` to avoid name collision with imported icon
function SettingsPage(){
  const [company, setCompany] = useState({name:'ERPX Ltd', currency: 'USD'});
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold">Settings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded bg-white/4">
          <div className="text-sm text-slate-300">Company Name</div>
          <input value={company.name} onChange={e=>setCompany({...company, name:e.target.value})} className="mt-2 p-2 rounded bg-white/5 w-full" />
        </div>
        <div className="p-4 rounded bg-white/4">
          <div className="text-sm text-slate-300">Currency</div>
          <select value={company.currency} onChange={e=>setCompany({...company, currency:e.target.value})} className="mt-2 p-2 rounded bg-white/5 w-full">
            <option>USD</option>
            <option>EUR</option>
            <option>PKR</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const [collapsed, setCollapsed] = useState(false);
  const [user] = useState({ name: 'Muhammad Usama', email: 'usama@erpx.local' });
  const [showQuick, setShowQuick] = useState(false);

  function handleLogout(){
    // placeholder: integrate with auth
    alert('Logged out (demo)');
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 font-sans">
        <div className="flex">
          <Sidebar collapsed={collapsed} onLogout={handleLogout} />

          <div className="flex-1 flex flex-col">
            <Topbar onToggle={()=>setCollapsed(c=>!c)} collapsed={collapsed} user={user} onOpenQuick={()=>setShowQuick(true)} />

            <main className="flex-1 overflow-auto">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<motion.div key="dash" initial={{opacity:0, y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}><Dashboard/></motion.div>} />
                  <Route path="/inventory" element={<motion.div key="inv" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Inventory/></motion.div>} />
                  <Route path="/sales" element={<motion.div key="sales" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Sales/></motion.div>} />
                  <Route path="/hr" element={<motion.div key="hr" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><HR/></motion.div>} />
                  <Route path="/settings" element={<motion.div key="set" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><SettingsPage/></motion.div>} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>

        {/* Quick Actions modal */}
        <AnimatePresence>{showQuick && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 flex items-end sm:items-center justify-center p-4">
            <div className="bg-slate-900/80 backdrop-blur p-4 rounded w-full sm:w-3/4 md:w-1/2">
              <div className="flex justify-between items-center">
                <div className="font-semibold">Quick Actions</div>
                <button onClick={()=>setShowQuick(false)} className="px-2 py-1 rounded bg-white/5">Close</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <button className="p-3 rounded bg-white/5">Create Invoice</button>
                <button className="p-3 rounded bg-white/5">New Purchase</button>
                <button className="p-3 rounded bg-white/5">Add Employee</button>
              </div>
            </div>
          </motion.div>
        )}</AnimatePresence>
      </div>
    </Router>
  );
}
