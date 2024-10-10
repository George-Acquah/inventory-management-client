import { cn } from "@/utils/classes.utils";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge";
import { Typography } from "../ui/typography";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

interface _InformationCard {
  entity: _IEntityData;
  className?: string;
}

const InformationCards = ({ className, entity: { count, type } }:_InformationCard ) => {
  return (
    <Card
      className={cn(
        "rounded-2xl odd:bg-primary even:bg-secondary p-4 flex-1 min-w-[130px] space-y-0 border-none",
        className
      )}
    >
      <CardHeader className="flex flex-row justify-between items-center p-1 space-y-0">
        <Badge
          variant={"default"}
          className="bg-white rounded-full hover:bg-neutral-100"
        >
          <Typography
            variant="span"
            className="text-primary-darkForeground dark:text-primary-darkForeground"
          >
            2024/25
          </Typography>
        </Badge>
        <EllipsisHorizontalIcon className="w-8 h-8 text-white cursor-pointer" />
      </CardHeader>

      <CardTitle className="p-1">
        <Typography variant="h2" className="text-white dark:text-white">
          {count}
        </Typography>
      </CardTitle>

      <CardFooter className="p-1">
        <Typography
          variant="p"
          className="text-white dark:text-white capitalize"
        >
          {`${type}`}
        </Typography>
      </CardFooter>
    </Card>
  );
}

export default InformationCards;