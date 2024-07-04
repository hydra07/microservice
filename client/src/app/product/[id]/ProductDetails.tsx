import { useReducer } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ProductType } from "CustomTypes";

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
      return { ...state, quantity: Math.max(1, Math.min(action.payload, maxQuantity)) };
    default:
      return state;
  }
}

export default function ProductDetails({ product }: { product: ProductType }) {
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => reducer(state, action, product.currentQuantity),
    initialState
  );

  const handleQuantityChange = (value: number) => {
    dispatch({
      type: "SET_QUANTITY",
      payload: Math.max(1, Math.min(value, product.currentQuantity)),
    });
  };

  return (
    <div className="grid gap-6">
     
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {product.description}
        </p>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">{
            new Intl.NumberFormat("vi", {
              style: "currency",
              currency: "VND",
            }).format(product.price)            
          }</div>
          <div className="text-gray-500 dark:text-gray-400">
            {product.quantity} in stock
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
        {/* <Button size="lg">Add to Cart</Button> */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t">
          <Button size="lg" className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
