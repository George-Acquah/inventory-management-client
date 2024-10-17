'use client'

import { CreateItemSchema } from "@/schemas";
import FormModal from "../tables/tableModal";

interface _IInventoryAction<T = _TableRowType> {
  type: 'create' | 'update' | 'delete';
  trigger?: React.ReactNode;
  id?: string;
  data?: T;
  action?: any;
}
const InventoryActions = <T extends _TableRowType>({ type, trigger, id, data , action}: _IInventoryAction<T>) => {
  return (
    <div className="flex justify-center items-center">
      <FormModal
        entityType={"item"}
        type={type}
        data={data}
        id={id}
        schema={CreateItemSchema}
        className="rounded-md w-fit h-fit "
        trigger={trigger}
        deleteAction={action}
      />
    </div>
  );
};

export default InventoryActions;