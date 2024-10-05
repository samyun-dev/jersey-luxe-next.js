"use client"

import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const saveCart = (newCart) => {
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      const newCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      saveCart(newCart)
    } else {
      saveCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index)
    saveCart(newCart)
  }

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) {
      removeFromCart(index)
    } else {
      const newCart = cart.map((item, i) => i === index ? { ...item, quantity } : item)
      saveCart(newCart)
    }
  }

  const clearCart = () => {
    saveCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}