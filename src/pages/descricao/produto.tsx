import { Text } from '@chakra-ui/react';
import { Header } from '~components/Header';
import { ProductDetails } from '~components/ProductDetails';
import { ProductsGrid } from '~components/ProductsGrid';
export default function Descricao() {
  interface Product {
    name: string;
    price: string;
    quantity: string;
  }
  const producers = Array(20).fill({ name: 'Produtor' });
const products: Product[] = Array(16).fill({
  name: 'Cebola roxa - Faz o L',
  price: 'R$ 20,00',
});

  return (
    <>
      <Header />
      <ProductDetails backgroundImg="/images/cebola.png" alt="Imagem de cebola e alho">
          <Text fontSize="40" fontWeight="bold">
            CEBOLA & ALHO
          </Text>
          <Text fontSize={'15'}> • Lúcia Santana Silva</Text>
          <Text fontSize={'15'} fontWeight="400">
            Com sua tonalidade vibrante e sabor adocicado, ela é perfeita para
            realçar o sabor de diversas receitas. Além disso, a Cebola Roxa
            possui propriedades antioxidantes, que ajudam a combater os radicais
            livres e fortalecer o sistema imunológico.
          </Text>
      </ProductDetails>

      <Text fontSize={40} fontWeight="600"padding={8} >Relacionados</Text>   
       {/* <ProductsGrid products={products}/> */}
    </>
  )
}
