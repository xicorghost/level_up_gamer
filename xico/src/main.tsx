import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Importar los contextos nuevos
import { ProductProvider } from './context/ProductContext'
import { UserProvider } from './context/UserContext'
import { OrderProvider } from './context/OrderContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductProvider>
      <UserProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </UserProvider>
    </ProductProvider>
  </StrictMode>,
)
