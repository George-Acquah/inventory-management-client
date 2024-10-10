'use client'
import React, { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { setAnimateSidenav, setOpenConfigurator, setOpenSidenav, setSidenavColor, setSidenavType, useConfigurator } from "@/utils/contexts/configurator.context";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { AnimatedTooltip } from "./ui/tooltip";
import { themesTypeData } from "@/data/themetype.data";
import { Switch } from "./ui/switch";
import { GitHubIcon } from "./ui/icons";
import { useOutsideClick } from "@/utils/hooks/useOutsideClick";
import { formatNumber } from "@/utils/root.utils";

interface _Indexer {
  [key: string]: string;
}

function Configurator() {
  const { dispatch, state } = useConfigurator();
  const { openConfigurator, sidenavColor, sidenavType, animateSidenav, openSidenav } =
    state;
  const [stars, setStars] = React.useState('0');
  const configuratorRef = useRef(null);
  useOutsideClick(configuratorRef, () => setOpenConfigurator(dispatch, false));

  const sidenavColors: _Indexer = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  React.useEffect(() => {
    setStars(formatNumber(200, 1));
  }, []);

  return (
    <div className="">
      <aside
        ref={configuratorRef}
        className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white dark:bg-neutral-800 px-2.5 shadow-lg transition-transform duration-300 ${
          openConfigurator ? "translate-x-0" : "translate-x-96"
        }`}
      >
        <div className="flex items-start justify-between px-6 pt-8 pb-6">
          <div>
            <Typography variant="h3">Dashboard Configurator</Typography>
            <Typography variant="p" className="font-normal">
              See our dashboard options.
            </Typography>
          </div>
          <Button
            variant="default"
            size="icon"
            aria-label="Close Configurator"
            className="bg-transparent dark:bg-transparent shadow-none hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full"
            onClick={() => setOpenConfigurator(dispatch, false)}
          >
            <XMarkIcon
              strokeWidth={2.5}
              className="h-5 w-5 text-primary dark:text-primary-dark "
            />
          </Button>
        </div>
        <div className="py-4 px-6">
          <div className="mb-12">
            <Typography variant="h4">Sidenav Colors</Typography>
            <div className="mt-3 flex items-center gap-2">
              {Object.keys(sidenavColors).map((color) => (
                <Typography
                  variant="span"
                  key={color}
                  className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                    sidenavColors[color]
                  } ${
                    sidenavColor === color
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  onClick={() => setSidenavColor(dispatch, color)}
                />
              ))}
            </div>
          </div>
          <div className="mb-12">
            <Typography variant="h4">Sidenav Types</Typography>
            <Typography variant="p" color="secondary">
              Choose between 3 different sidenav types.
            </Typography>
            <div className="mt-3 flex items-center gap-2">
              <Button
                variant={sidenavType === "dark" ? "default" : "outline"}
                aria-label="Dark Navbar"
                onClick={() => setSidenavType(dispatch, "dark")}
                size="default"
              >
                Dark
              </Button>
              <Button
                variant={sidenavType === "transparent" ? "default" : "outline"}
                onClick={() => setSidenavType(dispatch, "transparent")}
                size="default"
                aria-label="Transparent Navbar"
              >
                Transparent
              </Button>
              <Button
                variant={sidenavType === "white" ? "default" : "outline"}
                onClick={() => setSidenavType(dispatch, "white")}
                size="default"
                aria-label="White Navbar"
              >
                White
              </Button>
            </div>
          </div>
          <div className="mb-12">
            <div className="h-[1px] bg-neutral-200 dark:bg-neutral-600" />
            <Typography variant="h4" className="mt-4">
              Sidenav Layout
            </Typography>
            <Typography variant="p" color="secondary">
              Choose between 3 different sidenav layouts.
            </Typography>
            <div className="flex items-center justify-between py-3">
              <Typography variant="h5">Open Sidebar Fixed</Typography>
              <Switch
                aria-label="Open Sidebar Fixed"
                id="sidenav-open-fixed"
                className={`${
                  !animateSidenav && openSidenav
                    ? ""
                    : "hover:bg-secondary hover:bg-opacity-20"
                }`}
                checked={!animateSidenav && openSidenav}
                onSwitchToggle={() => {
                  setAnimateSidenav(dispatch, false);
                  setOpenSidenav(dispatch, true);
                }}
              />
            </div>
            <div className="flex items-center justify-between py-3">
              <Typography variant="h5">Close Sidebar Fixed</Typography>
              <Switch
                aria-label="Close Sidebar Fixed"
                id="sidenav-closed-fixed"
                className={`${
                  !animateSidenav && !openSidenav
                    ? ""
                    : "hover:bg-secondary hover:bg-opacity-20"
                }`}
                checked={!animateSidenav && !openSidenav}
                onSwitchToggle={() => {
                  setAnimateSidenav(dispatch, false);
                  setOpenSidenav(dispatch, false);
                }}
              />
            </div>
            <div className="flex items-center justify-between py-3">
              <Typography variant="h5">Default</Typography>
              <Switch
                aria-label="Default Sidebar"
                id="default-sidebar"
                checked={animateSidenav}
                className={`${
                  animateSidenav ? "" : "hover:bg-secondary hover:bg-opacity-20"
                }`}
                onSwitchToggle={() => {
                  setAnimateSidenav(dispatch, true);
                  setOpenSidenav(dispatch, false);
                }}
              />
            </div>
            <div className="h-[1px] bg-neutral-200 dark:bg-neutral-600" />
            <div className="my-8 flex flex-col gap-4">
              <a
                href="https://www.creative-tim.com/product/material-tailwind-dashboard-react?rel=mtdr"
                aria-label="Free Download"
                target="_black"
              >
                <Button variant="default" size="default" className="w-full">
                  Free Download
                </Button>
              </a>
              {/* <a
              href="https://www.material-tailwind.com/docs/react/installation?rel=mtdr"
              target="_black"
              aria-label="View Documentation"
            >
              <Button variant="default" size="default" className="w-full">
                View Documentation
              </Button>
            </a> */}
              {/* <a
              href="https://www.material-tailwind.com/blocks/react?rel=mtdr"
              target="_black"
              aria-label="Go Pro"
            >
              <Button variant="outline" size="default" className="w-full">
                Material Tailwind PRO
              </Button>
            </a> */}
            </div>
            <a
              className="mx-auto flex items-center justify-center gap-2"
              href="https://github.com/creativetimofficial/material-tailwind-dashboard-react"
              target="_blank"
              aria-label="Open Githhub in new Tab"
              rel="noreferrer"
            >
              <Button
                aria-label="Github Repo Stars"
                variant="default"
                size="default"
                className="px-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mt-px ml-1.5 h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
                <Typography
                  variant="span"
                  className="text-primary-foreground dark:text-primary-darkForeground"
                >{`${stars} - Stars`}</Typography>
              </Button>
              <GitHubIcon className="text-neutral-600 dark:text-neutral-200 h-8 w-8" />
            </a>
          </div>
          <div className="flex justify-center items-center gap-8">
            <AnimatedTooltip
              items={themesTypeData}
              className="-top-12 -left-1/2 -translate-x-[15%] "
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Configurator;
