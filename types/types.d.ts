interface _ISidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface _IPageId {
  params: {
    id: string;
  };
}

interface _IModalContextProps {
  isOpen: (key: string) => boolean;
  setOpen: (key: string, open: boolean) => void;
}

interface _ISidebarProviderProps extends Partial<_ISidebarContextProps> {
  children: React.ReactNode;
}

interface _ILinks {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  parent?: string;
}

interface _IEntityData {
  count: number;
  type: string;
}

interface _IPostApiResponse {
  statusCode: number;
  message: string;
}

interface _IApiResponse<T> extends _IPostApiResponse {
  data: T;
}

interface _ITableHeaderRowContents {
  columns: _ITableProps[];
  renderRow: (items: any) => React.ReactNode;
  data: any[];
}

interface _IVerificationBtn {
  id: string;
  status: boolean;
}

interface _ICommonFieldProps {
  name: string;
  label: string;
  type: _TFieldType;
  options?: {
    value: string | number;
    label: string;
  }[];
  placeholder?: string;
  group?: string; //
  disabled?: boolean;
  description?: string;
  renderAfter?: ReactNode;
}

interface _IActionBtn {
  id: string;
  label: string;
  action: (
    id: string
  ) => Promise<_IApiResponse<void> | undefined | void>;
  path?: string;
}

interface _ITableSignature {
  [key: string]: string | string[] | number | boolean |ITEM_SEX_TYPE | ITEM_ZONE | null | undefined; // Flexible for other dynamic fields
}
interface _TableRowType extends _ITableSignature {
  _id: string; // Explicitly required
  image?: string; // Required for rendering the image
  description?: string;
}

interface _ITableBase<T = _TEntityType> {
  entityType: T;
}

interface _ITableProps<T = _TableRowType[]> extends _ITableBase {
  query?: string;
  currentPage?: number;
  columnData: string[];
  data?: T;
  deleteAction: (
    id: string
  ) => Promise<_IApiResponse<void> | undefined | void>;
}

interface _ISpecificTableProps {
  query: string;
  currentPage: number;
  pageSize: number;
}

interface _ITooltipItem {
  id: number;
  name: string;
  designation?: string;
  image?: string;
  icon?: any;
  theme: string;
}

interface _IChildren {
  children: React.ReactNode;
}

interface _INotification {
  id: number;
  subject: string;
  message: string;
}

interface _ISearchParams {
  SESSION: string;
  ERROR: string;
  ERR_MSG: string;
  ERR_DESC: string;
  BTN_LABEL: string;
  ENTITY_TYPE: string;
  QUERY: string;
  FORM_STEP: string;
}

interface _ISearchQuery {
  searchParams?: {
    q?: string;
    page?: string;
    size?: string;
  };
}

interface _IItem {
  [key: string]:
    | string
    | string[]
    | number
    | ITEM_SEX_TYPE
    | ITEM_ZONE
    | undefined;
  _id: string;
  itemName: string;
  itemImage?: string[];
  price: number;
  lastPrice: number;
  addedByName: string;
  zone: ITEM_ZONE;
  sexType: ITEM_SEX_TYPE;
  stock: number;
  addedById: string;
  createdAt: string;
  updatedAt: string;
}

interface _IBasketContextType {
  state: State;
  addToBasket: (value: _IItem) => void;
  clearBasket: () => void;
  getItemsBasket: () => void;
  getABasketItem: (value: string) => void;
  removeFromBasket: (value: string) => void;
}

interface State {
  items: _IBasketItem[];
  loading: boolean;
  message: string | null;
  totalPrice: number;
}

interface _ISellItem {
  itemId: string;
  itemName: string;
  soldPrice: number;
  quantity: number;
}

interface _ISellPayload {
  items: _ISellItem[];
  totalPrice: number;
}

interface _IBasketItem extends _ISellItem {
  itemImage: string;
}

type _TVariants = "default" | "secondary" | "destructive" | "outline";

type _TSizes = "default" | "lg" | "sm" | "icon";
type _TFieldType = "text" | "email" | "password" | "number" | "radio" | "select";

type _TRefDivElement = React.HTMLAttributes<HTMLDivElement>;
type _TRefImageElement = React.HTMLAttributes<HTMLImageElement>;
type _TRefPElement = React.HTMLAttributes<HTMLParagraphElement>;

type _TRequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type _TActionResult<T = unknown> =
  | {
      type: "success";
      message: string;
      data?: T; // Allow action-specific data in the result
    }
  | {
      type: "error";
      errors: Record<string, string[] | undefined>;
    }
  | { type: undefined; message: null };

type _TEntityType =
  | "teacher"
  | "student"
  | "project"
  | "task"
  | "team"
  | "item";

  type Action =
    | { type: "ADD_TO_BASKET"; value: _IItem }
    | { type: "REMOVE_FROM_BASKET"; value: string }
    | { type: "GET_ITEMS_BASKET" }
    | { type: "GET_TOTAL_PRICE" }
    | { type: "GET_A_BASKET_ITEM"; value: string }
    | { type: "CLEAR_BASKET";}
    | { type: "SET_LOADING"; value: boolean }
    | { type: "SET_BASKET_MESSAGE"; value: string | null };

enum ITEM_ZONE {
  ZONE_1 = "zone 1",
  ZONE_2 = "zone 2",
  ZONE_3 = "zone 3",
}

enum ITEM_SEX_TYPE {
  UNISEX = "unisex",
  BISEX = "bisex",
}

