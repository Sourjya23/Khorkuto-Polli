import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from './types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (skuOrId: string) => void;
  updateQuantity: (skuOrId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const itemIdentifier = variant ? variant.sku : product._id;
          const existingItemIndex = state.items.findIndex(
            (item) => (item.variant ? item.variant.sku : item.product._id) === itemIdentifier
          );

          if (existingItemIndex >= 0) {
            // Update quantity of existing item
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          } else {
            // Add new item
            return { items: [...state.items, { product, variant, quantity }] };
          }
        });
      },
      
      removeItem: (skuOrId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => (item.variant ? item.variant.sku : item.product._id) !== skuOrId
          )
        }));
      },
      
      updateQuantity: (skuOrId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            const currentId = item.variant ? item.variant.sku : item.product._id;
            if (currentId === skuOrId) {
              return { ...item, quantity: Math.max(1, quantity) }; // Ensure at least 1
            }
            return item;
          })
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          const price = item.variant?.priceOverride || item.product.price;
          return total + price * item.quantity;
        }, 0);
      },
      
      getCartCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'lumina-cart-storage',
    }
  )
);
