import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { Product } from "@/models/products";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Home({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "66cf4211fc4a0d3c8fa7fed1";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 12 });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
