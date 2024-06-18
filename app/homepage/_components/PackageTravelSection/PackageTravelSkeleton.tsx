import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const PackageTravelSkeleton = () => {
  return (
    <Card className="w-full p-4 flex flex-col gap-4" radius="md">
      <div>
        <Skeleton className="rounded-lg">
          <div className="h-40 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="ounded-lg">
          <div className="h-4 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-20 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-6 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};

export default PackageTravelSkeleton;
