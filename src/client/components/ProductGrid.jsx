import ProductCard from "./ProductCard";
import { MainContext } from "../../context/MainContex";
import { useContext, useMemo } from "react";

export default function ProductGrid({ productsOverride, limit = 8 }) {
    const { products: contextProducts } = useContext(MainContext);
    const products = productsOverride ?? contextProducts ?? [];

    const visibleProducts = useMemo(() => products.slice(0, limit), [products, limit]);

    return (
        <div className="product-grid">
            {visibleProducts.map((product, index) => (
                <div key={product?._id ?? product?.id ?? index}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    )
}