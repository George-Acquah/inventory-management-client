import React, {
  useReducer,
  useMemo,
  useContext,
  useCallback,
  // useEffect,
  // useState,
} from "react";
// import useLocalStorage from "../hooks/useStorage";
import { useToast } from "./toasts.contexts";

// Define the types for the state
interface State {
  items: _IBasketItem[];
  loading: boolean;
  message: string | null;
  totalPrice: number;
}

// Define the action types
type Action =
  | { type: "ADD_TO_BASKET"; value: _IItem }
  | { type: "REMOVE_FROM_BASKET"; value: string }
  | { type: "GET_ITEMS_BASKET" }
  | { type: "GET_TOTAL_PRICE" }
  | { type: "GET_A_BASKET_ITEM"; value: string }
  | { type: "CLEAR_BASKET"; value: [] }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_BASKET_MESSAGE"; value: string | null };

// Define the initial state
const initialState: State = {
  items: [],
  loading: false,
  message: null,
  totalPrice: 0,
};

// Create the reducer function with typed state and actions
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        items: [
          ...state.items,
          {
            itemId: action.value._id,
            itemName: action.value.itemName,
            itemImage: action.value.itemImage ? action.value.itemImage[0] : "",
            soldPrice: action.value.price, // Now this uses the selected price
            quantity: action.value.stock,
          },
        ],
        loading: false,
      };

    case "SET_LOADING":
      return { ...state, loading: action.value };

    case "SET_BASKET_MESSAGE":
      return { ...state, message: action.value };

    case "GET_ITEMS_BASKET":
      return { ...state };

    case "GET_A_BASKET_ITEM":
      return {
        ...state,
        items:
          state.items?.filter((item) => item.itemId === action.value) || [],
      };

    case "GET_TOTAL_PRICE":
      return {
        ...state,
        totalPrice: state.items.reduce(
          (total, item) => total + item.quantity * item.soldPrice,
          0
        ),
      };

    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        items:
          state.items?.filter((item) => item.itemId !== action.value) || [],
      };

    case "CLEAR_BASKET":
      return { ...state, items: [] };

    default:
      throw new Error(`Unhandled action type: ${(action as Action).type}`);
  }
}

interface _IBasketContextType {
  state: State;
  addToBasket: (value: _IItem) => void;
  clearBasket: () => void;
  getItemsBasket: () => void;
  getABasketItem: (value: string) => void;
  removeFromBasket: (value: string) => void;
}

const BasketContext = React.createContext<_IBasketContextType | null>(null);
BasketContext.displayName = "BasketContext";

const BasketProvider: React.FC<_IChildren> = ({ children }) => {
  // const [storedItems, setStoredItems, removeStoredItems] =
  //   useLocalStorage<State>("basketItems", initialState);

  const [state, dispatch] = useReducer(reducer, initialState);
  // const [isHydrating, setIsHydrating] = useState(true);

  // useEffect(() => {
  //   setIsHydrating(false);
  // }, [])

  // useEffect(() => {
  //   if (state.items.length > 0) {
  //     setStoredItems(state);
  //   } else {
  //     removeStoredItems();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.items, setStoredItems, removeStoredItems]);

  const { showToast } = useToast();

  const addToBasket = useCallback(
    (value: _IItem) => {
      dispatch({ type: "SET_LOADING", value: true }); // Start loading
      // Check for duplicates before adding
      if (!state.items.find((item) => item.itemId === value._id)) {
        dispatch({ type: "ADD_TO_BASKET", value });
      } else {
        dispatch({
          type: "SET_BASKET_MESSAGE",
          value: "This item is already in your basket.",
        });
        showToast(state.message ?? "Bad", 5000, "error");
      }
      dispatch({ type: "SET_LOADING", value: false });
      dispatch({ type: "GET_TOTAL_PRICE" });
    },
    [showToast, state.items, state.message]
  );

  const clearBasket = useCallback(() => {
    dispatch({ type: "CLEAR_BASKET", value: [] });
  }, []);

  const getItemsBasket = useCallback(() => {
    dispatch({ type: "GET_ITEMS_BASKET" });
    dispatch({ type: "GET_TOTAL_PRICE" });
  }, []);

  const getABasketItem = useCallback((value: string) => {
    dispatch({ type: "GET_A_BASKET_ITEM", value });
    dispatch({ type: "GET_TOTAL_PRICE" });
  }, []);

  const removeFromBasket = useCallback((value: string) => {
    dispatch({ type: "REMOVE_FROM_BASKET", value });
    dispatch({ type: "GET_TOTAL_PRICE" });
  }, []);

  const value = useMemo(
    () => ({
      state,
      addToBasket,
      clearBasket,
      getItemsBasket,
      getABasketItem,
      removeFromBasket,
    }),
    [
      state,
      addToBasket,
      clearBasket,
      getItemsBasket,
      getABasketItem,
      removeFromBasket,
    ]
  );

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};

export const useBasket = (): _IBasketContextType => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};

export default BasketProvider;
