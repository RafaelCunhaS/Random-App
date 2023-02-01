import { Route, Routes } from 'react-router-dom';
import { Cats } from '../pages/Cats';
import { CustomerInspect } from '../pages/CustomerInspect';
import { Customers } from '../pages/Customers';
import { Dogs } from '../pages/Dogs';
import { Home } from '../pages/Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/cats" element={<Cats />} />
      <Route path="/dogs" element={<Dogs />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/:id" element={<CustomerInspect />} />
    </Routes>
  );
}
