interface _ISidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface _IPageId {
  params: {
    id: string;
 }
}

interface _IModalContextProps {
  isOpen: (key: string) => boolean;
  setOpen: (key: string, open: boolean) => void;
}

interface _ISidebarProviderProps extends Partial<_ISidebarContextProps>{
  children: React.ReactNode;
}

interface _ILinks {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
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
  placeholder?: string;
  group?: string; //
  disabled?: boolean;
  description?: string;
  renderAfter?: ReactNode;
}

interface _IActionBtn {
  id: string;
  label: string;
  action: (id: string, path: string) => Promise<_IApiResponse<void> | undefined | void>;
  path?: string;
}

interface _ITableSignature {
  [key: string]: string | string[] | number | boolean | null | undefined; // Flexible for other dynamic fields
}
interface _TableRowType extends _ITableSignature{
  _id: string; // Explicitly required
  image?: string; // Required for rendering the image
  description?: string;
}

interface _ITableBase<T= _TEntityType> {
  entityType: T;
  // deleteAction: (
  //   id: string,
  //   path: string
  // ) => Promise<_IApiResponse<void> | undefined | void>;
}

interface _ITableProps<T = _TableRowType[]> extends _ITableBase {
  query?: string;
  currentPage?: number;
  columnData: string[];
  data?: T;
  deleteAction: (
    id: string,
    path: string
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


type _TVariants =
  | "default"
  | "secondary"
  | "destructive"
  | "outline";

type _TSizes =
  | "default"
  | "lg"
  | "sm"
  | "icon";
type _TFieldType = "text" | "email" | "password" | "number";

  type _TRefDivElement = React.HTMLAttributes<HTMLDivElement>;
type _TRefPElement = React.HTMLAttributes<HTMLParagraphElement>;


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
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";

  