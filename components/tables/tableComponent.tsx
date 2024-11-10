"use client";
import * as React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableImageCell,
  TableHeader,
  TableCheckbox,
} from "@/components/ui/table";
import { usePathname } from "next/navigation";
import { EditBtn } from "./buttons";
import StatusBadge from "./status";
import NoContent from "../ui/noContent";
import { Typography } from "../ui/typography";
import { getDropdownStyles, getTableBooleanFields } from "@/utils/root.utils";
import { cn } from "@/utils/classes.utils";
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import FormModal from "./tableModal";
import {
  CreateItemSchema,
  ProjectsFormInputSchema,
  TeamsSchema,
} from "@/schemas";
import { ZodSchema } from "zod";
import { API } from "@/lib/dataFetching";
import useIsMobile from "@/utils/hooks/useMobileView";
import AppFilters from "../appFilters";
type SpecialFieldProps = {
  specialColumns: [string, string] | [string, string, string];
  specialFieldHeader: string;
  customRoute?: string;
};

// Define schema mapping
const schemaMap: { [key: string]: ZodSchema<any> } = {
  team: TeamsSchema,
  project: ProjectsFormInputSchema,
  item: CreateItemSchema,
};

const TableImage = React.memo(
  ({
    src,
    desc,
    className,
  }: {
    src: string;
    desc: string;
    className?: string;
  }) => (
    <TableImageCell
      src={src}
      alt={desc || "user's avatar"}
      className={cn("", className)}
    />
  )
);
TableImage.displayName = "TableImage";

const renderSpecialFields = (item: _TableRowType, specialColumns: string[]) => {
  const imageColumns = specialColumns.filter((col) =>
    col.toLowerCase().includes("image")
  );

  return (
    <>
      {imageColumns.length > 0 &&
        (() => {
          const value = item[imageColumns[0]]; // Get the value for the first image column
          let imageSrc: string | undefined;

          if (Array.isArray(value)) {
            imageSrc = value.length > 0 ? value[0] : undefined;
          } else if (typeof value === "string") {
            imageSrc = value;
          }

          return (
            <TableImage
              key={imageColumns[0]} // Use the column name as a key
              src={imageSrc ? `${API}/image/${imageSrc}` : "/No+Image.png"}
              desc={item.description ?? ""}
            />
          );
        })() // Immediately invoke the function to return the JSX
      }
      <div className="flex flex-col">
        {specialColumns
          .filter((col) => !imageColumns.includes(col)) // Exclude image columns
          .map((field, index) => (
            <Typography
              key={index}
              variant="span"
              className={`${
                index === 0
                  ? "font-semibold text-base"
                  : "text-sm dark:text-neutral-300"
              }`}
            >
              {item[field] ?? `Unknown ${field}`}
            </Typography>
          ))}
      </div>
    </>
  );
};

const renderCell = (column: string, item: _TableRowType) => {
  const value = item[column];
  const hasImage = column.toLowerCase().includes("image");

  if (hasImage) {
    let imageSrc: string | undefined;

    if (Array.isArray(value)) {
      imageSrc = value.length > 0 ? value[0] : undefined;
    } else if (typeof value === "string") {
      imageSrc = value;
    } else {
      imageSrc = undefined;
    }
    return (
      <TableImage
        src={imageSrc ? `${API}/image/${imageSrc}` : "/No+Image.png"}
        desc={item.description ?? ""}
      />
    );
  } else if (
    Array.isArray(value) &&
    value.every((v) => typeof v === "string")
  ) {
    return (
      <Typography variant="span" className="text-base font-mono">
        {value.join(", ")}
      </Typography>
    );
  } else {
    return (
      <Typography variant="span" className="text-base font-mono">
        {value ?? "N/A"}
      </Typography>
    );
  }
};

const TableButtonHelper = React.memo(
  ({
    id,
    entityType,
    deleteAction,
    customRoute,
    data,
    schema,
  }: {
    id: string;
    entityType: string;
    customRoute?: string;
    data?: any;
    schema?: any;
    deleteAction?: (
      id: string
    ) => Promise<_IApiResponse<void> | undefined | void>;
    }) => {
    const difPathname = usePathname();
    const pathname = customRoute ? `/${customRoute}` : difPathname;
    return (
      <div className="flex items-center gap-2">
        <EditBtn href={`${pathname}/${id}`} />
        <FormModal
          entityType={entityType}
          type={"update"}
          data={data}
          id={id}
          schema={schema}
        />
        {deleteAction && (
          <FormModal
            entityType={entityType}
            type={"delete"}
            deleteAction={deleteAction}
            data={undefined}
            id={id}
            schema={undefined}
          />
        )}
      </div>
    );
  }
);
TableButtonHelper.displayName = "TableButtonHelper";

const TableComponent = ({
  data,
  columnData,
  entityType,
  deleteAction,
  specialColumns,
  specialFieldHeader = "Info",
  customRoute,
}: _ITableProps & Partial<SpecialFieldProps>) => {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set()
  );
  const isMobile = useIsMobile();
  const renderSpecialFieldsHeader =
    specialColumns &&
    specialColumns?.length >= 2 &&
    specialColumns?.length <= 3;

  if (!data || data.length === 0) {
    return (
      <NoContent
        message="No data available"
        subMessage="Try adding new items or refreshing the page."
        onActionClick={() => console.log("Add New Item")}
        actionLabel="Add New Item"
      />
    );
  }

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set()); // Unselect all
    } else {
      const allIds = new Set(data.map((item) => item._id));
      setSelectedRows(allIds); // Select all
    }
  };

  const resolvedClassName = (extraClass?: string) =>
    cn(
      `px-6 ${renderSpecialFieldsHeader && specialColumns ? "py-2" : " py-4"}`,
      extraClass
    );
  const formSchema = schemaMap[entityType];

  
    const filterStyles = getDropdownStyles(
      "-10rem",
      "100%",
      "-8rem",
      "1.5rem",
      isMobile
    );

  return (
    <>
      <TableHeader className="flex items-center justify-between mt-8 ">
        <Typography
          variant="h3"
          className="capitalize"
        >{`${entityType}s Table`}</Typography>
        <div className="flex items-center gap-2 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-primary-foreground bg-neutral-400 dark:bg-zinc-500">
            <AppFilters filterStyles={filterStyles} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-primary-foreground bg-neutral-400 dark:bg-zinc-500">
            <ChevronUpDownIcon className="w-6 h-6" />
          </button>
          <FormModal
            entityType={entityType}
            type={"create"}
            data={undefined}
            id={undefined}
            schema={formSchema}
          />
        </div>
      </TableHeader>
      <div className="w-full overflow-x-auto hide-horizontal-scrollbar">
        <Table className="mt-8">
          <TableHead>
            <TableRow isHeader>
              <TableCell isHeader className="px-6">
                <input
                  type="checkbox"
                  id="check-all"
                  aria-label="check-all"
                  className="form-checkbox h-4 w-4"
                  checked={selectedRows.size === data.length}
                  onChange={toggleSelectAll}
                />
              </TableCell>

              {/* Conditionally render header for special fields */}
              {renderSpecialFieldsHeader && (
                <TableCell isHeader className="px-6 flex items-center gap-4">
                  {specialFieldHeader}
                </TableCell>
              )}

              {columnData.map((column, index) => (
                <TableCell key={`header-${index}`} isHeader className="px-6">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              const booleanFields = getTableBooleanFields(item);
              const isSelected = selectedRows.has(item._id);

              return (
                <TableRow
                  key={`row-${item._id}`}
                  className="px-6 align-middle border-none text-xs whitespace-nowrap"
                >
                  <TableCell className={resolvedClassName()}>
                    <TableCheckbox
                      checked={isSelected}
                      id={item._id}
                      onChange={() => toggleRowSelection(item._id)}
                    />
                  </TableCell>

                  {renderSpecialFieldsHeader && (
                    <TableCell
                      className={resolvedClassName("flex items-center gap-4")}
                    >
                      {renderSpecialFields(item, specialColumns)}
                    </TableCell>
                  )}

                  {columnData.map((column, columnIndex) => (
                    <TableCell
                      key={`cell-${columnIndex}`}
                      className={resolvedClassName()}
                    >
                      {booleanFields.includes(column) ? (
                        <StatusBadge status={item[column] as boolean} />
                      ) : (
                        renderCell(column, item)
                      )}
                    </TableCell>
                  ))}

                  <TableCell
                    className={resolvedClassName(
                      "flex justify-center items-center"
                    )}
                  >
                    <TableButtonHelper
                      id={item._id}
                      entityType={entityType}
                      deleteAction={deleteAction}
                      customRoute={customRoute}
                      schema={formSchema}
                      data={item}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default React.memo(TableComponent);
