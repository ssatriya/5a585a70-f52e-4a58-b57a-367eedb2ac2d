"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AuthHeader from "@/components/auth/auth-header";

type AuthCardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
};
const AuthCardWrapper = ({ children, headerLabel }: AuthCardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
export default AuthCardWrapper;
