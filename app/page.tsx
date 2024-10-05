import ProductList from './components/ProductList'

export const metadata = {
  title: 'Jersey Luxe - Premium Sports Jerseys',
  description: 'Shop the latest and greatest sports jerseys from around the world.',
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Jersey Luxe</h1>
      <ProductList />
    </div>
  )
}