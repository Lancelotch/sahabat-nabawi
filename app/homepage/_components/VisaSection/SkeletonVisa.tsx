import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const SkeletonVisa = () => {
  return (
    <Card className="w-full p-2 flex flex-col gap-2" radius="md">
      <Skeleton className="rounded-lg">
        <div className="h-10 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-20 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-10 rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
};

export default SkeletonVisa;
