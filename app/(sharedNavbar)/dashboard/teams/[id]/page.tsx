"use client";

import Announcements from "@/components/announcements";
import FormModal from "@/components/tables/tableModal";
import { Typography } from "@/components/ui/typography";
import { TeamsSchema } from "@/schemas";
import { THEME } from "@/utils/constants";
import {
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const DynamicTeamsPage = ({ params: { id } }: _IPageId) => {
  console.log(id);
  const role = "admin";

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* TEAM INFO CARD */}
          <div
            className={`bg-blue-200 dark:bg-green-600 py-6 px-4 rounded-md flex-1 flex gap-4`}
          >
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Team Image"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <Typography variant="h1" className="text-2xl">
                  The Innovators Team
                </Typography>
                {role === "admin" && (
                  <FormModal
                    entityType="team"
                    type="update"
                    data={{
                      _id: "1",
                      teamName: "Innovators",
                      teamLead: "John Doe",
                      email: "innovators@gmail.com",
                      established: "2015-04-10",
                      teamPhone: "+1 234 567 89",
                      location: "1234 Innovation St, Tech City",
                      description: "We are pioneers in tech innovation.",
                    }}
                    schema={TeamsSchema}
                  />
                )}
              </div>
              <Typography variant="span" className=" text-gray-500 dark:text-gray-300">
                A leading team in innovation, bringing cutting-edge technology
                to the forefront.
              </Typography>

              {/* Team Details with better handling of long text */}
              <div className="grid gap-4 grid-cols-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <Typography className="font-semibold" variant={"span"}>
                    Established 2015
                  </Typography>
                </div>
                <div className="flex items-center gap-2 overflow-hidden">
                  <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
                  <Typography
                    className="font-semibold truncate"
                    variant={"span"}
                  >
                    innovators@gmail.com
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" />
                  <Typography className="font-semibold" variant={"span"}>
                    +1 234 567 89
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* PROJECTS CARD */}
            <div
              className={`${THEME.secBg} p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]`}
            >
              <ClipboardDocumentCheckIcon className="w-7 h-7 text-blue-500" />
              <div className="">
                <Typography variant="h1" className="text-2xl">
                  12
                </Typography>
                <span className="text-sm text-gray-400">Ongoing Projects</span>
              </div>
            </div>
            {/* MEMBERS CARD */}
            <div
              className={`${THEME.secBg} p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]`}
            >
              <UserGroupIcon className="w-7 h-7 text-blue-500" />
              <div className="">
                <Typography variant="h1" className="text-2xl">
                  25
                </Typography>
                <span className="text-sm text-gray-400">Team Members</span>
              </div>
            </div>

            <div
              className={`${THEME.secBg} p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]`}
            >
              <ClipboardDocumentCheckIcon className="w-7 h-7 text-blue-500" />
              <div className="">
                <Typography variant="h1" className="text-2xl">
                  125
                </Typography>
                <span className="text-sm text-gray-400">
                  Completed Projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className={`mt-4 ${THEME.secBg} rounded-md p-4 h-[800px]`}>
          <h1>Team&apos;s Schedule</h1>
          {/* <BigCalendar /> */}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className={`${THEME.secBg} p-4 rounded-md`}>
          <Typography variant="h1" className="text-2xl">
            Shortcuts
          </Typography>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Team Projects
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href="/">
              Team Members
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href="/">
              Team Resources
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/">
              Team Achievements
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Team Meetings
            </Link>
          </div>
        </div>
        <Announcements />
      </div>
    </div>
  );
};

export default DynamicTeamsPage;
