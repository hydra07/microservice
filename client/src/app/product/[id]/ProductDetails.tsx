import { useReducer } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ProductType } from "CustomTypes";
import { useAddToCart } from "@/hooks/useAddToCart";

type State = {
  quantity: number;
};

type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_QUANTITY"; payload: number };

const initialState: State = {
  quantity: 1,
};

function reducer(state: State, action: Action, maxQuantity: number): State {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, quantity: Math.min(state.quantity + 1, maxQuantity) };
    case "DECREMENT":
      return { ...state, quantity: Math.max(1, state.quantity - 1) };
    case "SET_QUANTITY":
      return {
        ...state,
        quantity: Math.max(1, Math.min(action.payload, maxQuantity)),
      };
    default:
      return state;
  }
}

export default function ProductDetails({ product }: { product: ProductType }) {
  const [state, dispatch] = useReducer(
    (state: State, action: Action) =>
      reducer(state, action, product.currentQuantity),
    initialState
  );

  const { handleAddToCart, isAdding } = useAddToCart();

  const handleQuantityChange = (value: number) => {
    dispatch({
      type: "SET_QUANTITY",
      payload: Math.max(1, Math.min(value, product.currentQuantity)),
    });
  };

  const handleClick = () => {
    handleAddToCart(state.quantity, product);
  };

  return (
    <div className="grid gap-">
      <div className="grid gap-4">
        <h1 className="text-3xl font-sans">{product.name}</h1>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-serif text-orange-500">
              {new Intl.NumberFormat("vi", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </span>
            {/* <span className="text-3xl">
            /{" "}
            </span> */}
          </div>
          <div className="text-green-500 dark:text-green-400">
            {product.currentQuantity} in stock
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="quantity" className="text-base">
            Quantity
          </Label>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => dispatch({ type: "DECREMENT" })}
              aria-label="Decrease quantity"
            >
              <MinusIcon className="w-4 h-4" />
            </Button>
            <Input
              id="quantity"
              type="number"
              value={state.quantity}
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value, 10))
              }
              className="w-16 text-center"
              aria-label="Quantity"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={() => dispatch({ type: "INCREMENT" })}
              aria-label="Increase quantity"
              disabled={state.quantity >= product.currentQuantity}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button
          size="lg"
          className="w-1/3 bg-green-600 hover:bg-green-400"
          onClick={handleClick}
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
        <div>
          <h2 className="text-sm font-semibold">Quantitative</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {product.amountToSell} {product.measurement.unit}
          </p>
        </div>
        <div className="bg-slate-200 rounded-md p-2 dark:bg-slate-500">
          <h2 className="text-sm font-semibold">Description</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
