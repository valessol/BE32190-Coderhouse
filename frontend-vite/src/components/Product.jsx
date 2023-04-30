import { Link } from "react-router-dom";

const Product = ({ product }) => {
  // const {id} = useParams()
  // const {product, getProductById} = useContext(ProductsContext)

  // useEffect(() => {
  //   getProduct();
  // }, [])

  // const getProduct = async () => {
  //   await getProductById(id)
  // }
  const { _id, description, price, title, imageUrl } = product;

  return (
    <div className="grid gap-8 grid-cols-[2fr_3fr] items-center max-w-6xl my-0 mx-auto ">
      <img src={imageUrl} alt={`imagen guitarra ${title}`} />
      <div className="p-4">
        <h3 className="text-5xl uppercase text-amber-500 font-bold mb-4">
          {title}
        </h3>
        <p className="mb-4">{description}</p>
        <p className="text-6xl text-amber-500 m-0 font-black">${price}</p>

        <Link
          className="mt-8 block bg-gray-950 text-white no-underline p-4 text-center uppercase text-2xl font-bold transition-colors"
          to={`/tienda/${_id}`}
        >
          Ver producto
        </Link>
      </div>
    </div>
  );
};

export default Product;
