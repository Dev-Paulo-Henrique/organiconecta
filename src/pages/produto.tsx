import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Text, Box, Flex } from "@chakra-ui/react";
import { Header } from "~components/Header";
import { ProductDetails } from "~components/ProductDetails";
import { api } from "~services/api";
import ErrorPage from "./404";
import { Loading } from "~components/Loading";
import { useAuth } from "~hooks/useAuth";
import { FaStar } from "react-icons/fa";
import { useColorModeValue } from "~components/ui/color-mode";
import { Title } from "~components/Title";
import { ProductsGrid } from "~components/ProductsGrid";
import { Footer } from "~components/Footer";

interface Product {
  produtoNome: string;
  produtoPreco: string;
  quantity: string;
  produtoDescricao: string;
  produtoImagens: string[];
  produtoCategoria: string;
  produtoQuantidade: string;
  id: string;
}

export default function Produto() {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const bg = useColorModeValue("gray.100", "gray.800");

  const router = useRouter();
  const { id } = router.query;
  const { token } = useAuth();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/produto/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status !== 200) {
            throw new Error("Produto não encontrado");
          }

          setProduct(response.data);
          fetchRelatedProducts(response.data.produtoCategoria, response.data.id); // Buscar relacionados
          setLoading(false);
        } catch (error) {
          setError("Erro ao carregar o produto");
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  // Buscar produtos relacionados (mesma categoria)
  const fetchRelatedProducts = async (categoria: string, produtoId: string) => {
    try {
      const response = await api.get("/produto", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const filteredProducts = response.data.filter(
        (item: Product) => item.produtoCategoria === categoria && item.id !== produtoId
      ).sort(() => Math.random() - 0.5) // Embaralha os produtos
      .slice(0, 5);
  
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error("Erro ao buscar produtos relacionados:", error);
    }
  };
  

  if (loading) {
    return <Loading />;
  }

  if (error || !product) {
    return <ErrorPage />;
  }

  return (
    <>
      <Header />
      <Title name={product.produtoNome} />
      <Box px={60} py={"auto"} h={"100%"} bg={"gray.100"}>
        <ProductDetails
          img={product.produtoImagens[0]}
          alt={`Imagem de ${product.produtoNome}`}
          price={product.produtoPreco}
          id={product.id}
          quantity={product.produtoQuantidade}
        >
          <Text fontSize={60} fontWeight="bold" textTransform={"uppercase"}>
            {product.produtoNome}
          </Text>
          <Flex alignItems={"center"} mt={1} mb={3}>
            <FaStar color="gold" size={22} />
            <FaStar color="gold" size={22} />
            <FaStar color="gold" size={22} />
            <FaStar color="gold" size={22} />
            <FaStar color="gold" size={22} />
            <Text mx={3}>•</Text>
            <Text fontSize="18" color={"gray.600"}>
              {product.produtoCategoria}
            </Text>
          </Flex>
          <Text fontSize={24} fontWeight="thin">
            {product.produtoDescricao}
          </Text>
        </ProductDetails>

        {/* Seção de Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <>
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="row"
              w="full"
              mt={8}
            >
              <Text
                fontSize={55}
                fontWeight="bold"
                textTransform="uppercase"
                mr={4}
              >
                Relacionados
              </Text>
              <Box flex="1" height="5px" bg="black" />
            </Flex>

            <ProductsGrid products={relatedProducts} />
          </>
        )}
      <Footer/>
      </Box>
    </>
  );
}
