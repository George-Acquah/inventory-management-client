'use client'
import { Button } from "@/components/ui/button";
import { useConfigurator } from "@/utils/contexts/configurator.context";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

const ConfigurationButton = () => {
  const { setOpenConfigurator } = useConfigurator();
  return (
    <div className="">
      <Button
        size="icon"
        variant="default"
        aria-label="Configuration Button"
        className="fixed bg-neutral-200 dark:bg-neutral-600 bottom-8 right-8 z-40 rounded-full shadow-inner"
        onClick={() => setOpenConfigurator(true)}
      >
        <Cog6ToothIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-200" />
      </Button>
    </div>
  );
}

export default ConfigurationButton;